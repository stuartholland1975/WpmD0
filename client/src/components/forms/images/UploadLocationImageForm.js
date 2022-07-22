/** @format */

import {useFieldArray, useForm} from 'react-hook-form';
import {Box, Button, DialogActions, DialogContent, Divider, Grid, TextField,} from '@mui/material';
import SelectImageType from '../components/SelectImageType';
import React from 'react';
import {DateTime} from 'luxon';
import AddIcon from '@mui/icons-material/Add';
import exifr from 'exifr';
import {gridSelectionsVar} from '../../../cache';
import {useMutation} from '@apollo/client';
import {ADD_BULK_IMAGES_TO_LOCATION} from '../../../api-calls/mutations/project-mutations';
import MultipleImagePreview from '../components/MultipleImagePreview';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {useCounter, useToggle} from 'react-use';
import {useConfirm} from 'material-ui-confirm';

const defaultDate = DateTime.now().toISODate();
const imageMimeType = /image\/(png|jpg|jpeg)/i;

const UploadLocationImageForm = ({hideModal}) => {
    const addImageButtonRef = React.useRef();
    const submitButtonRef = React.useRef();
    const [imageFiles, setImageFiles] = React.useState([]);
    const [images, setImages] = React.useState([]);
    const [disabled, setDisabled] = React.useState(false);
    const [preview, togglePreview] = useToggle(true);
    const [min] = useCounter(1);
    const [max] = useCounter(4);
    const [counter, {inc, dec, set, reset: resetCounter}] = useCounter(
        1,
        max,
        min,
    );
    const confirm = useConfirm();

    const {register, handleSubmit, control, reset, setFocus, getValues} =
        useForm({
            defaultValues: {
                image: [
                    {
                        notes: '',
                        headerImageFile: '',
                    },
                ],
            },
        });

    const {fields, append, remove} = useFieldArray({
        control,
        name: 'image',
    });


    const [uploadImage] = useMutation(ADD_BULK_IMAGES_TO_LOCATION);

    const removeEntry = (index) => {
        setImageFiles((prevState) =>
            prevState.filter((_obj, idx) => idx !== index),
        );
        remove(index);
        dec();
    };

    const getExifData = async (data) => {
        const exif = exifr.parse(data.headerImageFile[0]);
        const gps = exifr.gps(data.headerImageFile[0]);
        const exifDate = exifr.parse(data.headerImageFile[0], ['DateTimeOriginal']);
        const orientation = exifr.orientation(data.headerImageFile[0]);
        return await Promise.all([exif, gps, exifDate, orientation]);
    };

    const prepareApiData = async (data) => {
        const exifData = await getExifData(data)
        const [exif, exifGps, exifDate, orientation] = exifData
        const {dateTakenManual, headerImageFile, imageTypeId, notes} = data
        return {
            createdAt: defaultDate,
            dateTakenManual,
            headerImageFile: headerImageFile[0],
            imageTypeId: Number(imageTypeId.id),
            sitelocationId: gridSelectionsVar().selectedLocation[0].id,
            exif,
            exifGps,
            notes,
            exifDate: exifDate?.DateTimeOriginal,
            orientation,
        }
    }

    const onSubmit = (data) => {
        const {image} = data;
        confirm({
            title: 'Confirm Data Submission',
            titleProps: {color: 'red', fontWeight: 'bold'},
            content: `Submission Contains ${image.length} Item(s)`,
            confirmationText: 'Confirm',
            cancellationButtonProps: {color: 'secondary'},
            allowClose: false,
            contentProps: {fontWeight: 'bold'},
        })
            .then(() => Promise.all(image.map(item => prepareApiData(item)))).then(result => {

            uploadImage({
                variables: {input: result}
            }).then(console.log, console.error).then(() => hideModal())
        })
    };

    const prepareImagePreview = async (data, index) => {
        const imageFile = data.target.files[0];
        const {image} = getValues();
        const imageInfo = image[index];
        const imageData = {
            image: imageFile,
            title: imageInfo.imageTypeId.longName,
            date: imageInfo.dateTakenManual,
            id: index,
            orientation: await exifr.orientation(imageFile),
        };
        if (!imageData.image.type.match(imageMimeType)) {
            alert('Image mime type is not valid');
            return;
        }
        const imageList = imageFiles.filter((_obj, idx) => idx !== index);
        const updatedImageList = [...imageList, imageData];
        const sortedImageList = updatedImageList.sort((a, b) => a.id - b.id);
        setImageFiles(sortedImageList);
    };

    const handleResetForm = () => {
        reset();
        setImageFiles([]);
        setImages([]);
        resetCounter();
    };

    React.useEffect(() => {
        setFocus('image[0].dateTakenManual');
    }, [setFocus]);

    React.useEffect(() => {
        if (counter > 3) {
            setDisabled(true);
        } else setDisabled(false);
    }, [counter]);

    return (
        <>
            <DialogContent>
                <form>
                    <Grid container columnSpacing={2} rowSpacing={3} columns={7}>
                        {fields.map((field, index) => (
                            <React.Fragment key={field.id}>
                                <Grid item={true} xs={1}>
                                    <TextField
                                        label={'Date Taken'}
                                        {...register(`image.${index}.dateTakenManual`)}
                                        type={'date'}
                                        variant={'filled'}
                                        fullWidth={true}
                                        defaultValue={defaultDate}
                                    />
                                </Grid>
                                <Grid item xs={1}>
                                    <SelectImageType control={control} index={index}/>
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        fullWidth
                                        variant='filled'
                                        accept='image/*'
                                        type='file'
                                        sx={{height: '100%'}}
                                        {...register(`image.${index}.headerImageFile`)}
                                        onChange={(data) => prepareImagePreview(data, index)}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        variant={'filled'}
                                        fullWidth={true}
                                        multiline={true}
                                        label={'notes'}
                                        {...register(`image.${index}.notes`)}
                                        onBlur={() => addImageButtonRef.current.focus()}
                                    />
                                </Grid>
                                <Grid item xs={1}>
                                    <Button
                                        fullWidth
                                        color='delete'
                                        onClick={() => removeEntry(index)}
                                        sx={{borderRadius: 0, border: 1, height: '100%'}}>
                                        remove
                                    </Button>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </form>

                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 250,

                        border: 0,
                        borderStyle: 'solid',
                        m: 4,
                        pl: 2,
                        pr: 2,
                        borderRadius: 0,
                    }}>
                    <Divider/>
                    <MultipleImagePreview
                        imageFiles={imageFiles}
                        setImages={setImages}
                        images={images}
                        preview={preview}
                    />
                </Box>
            </DialogContent>
            <Divider/>
            <DialogActions>
                <Grid container p={2} spacing={2} columns={5}>
                    <Grid item xs={1}>
                        <Button
                            fullWidth
                            onClick={hideModal}
                            color='secondary'
                            sx={{borderRadius: 0, border: 1, height: '100%'}}>
                            close
                        </Button>
                    </Grid>
                    <Grid item xs={1}>
                        <Button
                            fullWidth
                            color='cancel'
                            onClick={handleResetForm}
                            sx={{borderRadius: 0, border: 1, height: '100%'}}>
                            reset
                        </Button>
                    </Grid>
                    <Grid item xs={1}>
                        <Button
                            ref={addImageButtonRef}
                            disabled={disabled}
                            sx={{height: '100%', borderRadius: 0, border: 1}}
                            color='create'
                            fullWidth
                            startIcon={<AddIcon/>}
                            onClick={() => {
                                append();
                                inc();
                            }}>
                            add another
                        </Button>
                    </Grid>
                    <Grid item xs={1}>
                        <Button
                            color='action'
                            startIcon={<PhotoCamera/>}
                            fullWidth
                            sx={{height: '100%', borderRadius: 0, border: 1}}
                            onClick={togglePreview}>
                            {preview ? 'Hide Images' : 'Preview Images'}
                        </Button>
                    </Grid>
                    <Grid item xs={1}>
                        <Button
                            ref={submitButtonRef}
                            fullWidth
                            color='submit'
                            onClick={handleSubmit(onSubmit)}
                            sx={{borderRadius: 0, border: 1, height: '100%'}}>
                            submit
                        </Button>
                    </Grid>
                </Grid>
            </DialogActions>
        </>
    );
};

export default UploadLocationImageForm;
