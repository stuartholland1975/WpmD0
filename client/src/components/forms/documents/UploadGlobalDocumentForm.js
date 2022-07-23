import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Button, DialogActions, DialogContent, Divider, Grid, TextField, } from '@mui/material';
import { useConfirm } from 'material-ui-confirm';
import AddIcon from "@mui/icons-material/Add";
import { useMutation } from "@apollo/client";
import { UPLOAD_DOCUMENTS } from "../../../api-calls/mutations/project-mutations";
import { GET_GLOBAL_DOCUMENTS } from '../../../api-calls/queries/misc';

const UploadGlobalDocumentForm = ({ hideModal }) => {

    const confirm = useConfirm();

    const { register, handleSubmit, control, reset, setFocus, getValues } =
        useForm({
            defaultValues: {
                document: [
                    {
                        title: '',
                        headerDocumentFile: '',
                    },
                ],
            },
        });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'document',
    });

    const [uploadDocuments] = useMutation(UPLOAD_DOCUMENTS, {
        refetchQueries: [
            { query: GET_GLOBAL_DOCUMENTS },
        ],
        awaitRefetchQueries: true,
        onCompleted: () => hideModal()
    })

    const prepareApiData = data => {
        return data.map(item => ({
            title: item.title,
            global: true,
            headerDocumentFile: item.headerDocumentFile[0]
        }))
    }

    const onSubmit = data => {

        const { document } = data
        console.log(data, document)

        confirm({
            title: 'Confirm Data Submission',
            titleProps: { color: 'red', fontWeight: 'bold' },
            content: `Submission Contains ${document.length} Item(s)`,
            confirmationText: 'Confirm',
            cancellationButtonProps: { color: 'secondary' },
            allowClose: false,
            contentProps: { fontWeight: 'bold' },
        }).then(() => prepareApiData(document)).then(r => uploadDocuments({
            variables: { input: r }
        }))
    }

    React.useEffect(() => {
        setFocus('document[0].title');
    }, [setFocus]);
    return (
        <>
            <DialogContent>
                <form>
                    <Grid container columnSpacing={2} rowSpacing={3} columns={4}>
                        {fields.map((field, index) => (
                            <React.Fragment key={field.id}>
                                <Grid item={true} xs={1}>
                                    <TextField
                                        label={'Document Title'}
                                        {...register(`document.${index}.title`)}
                                        variant={'filled'}
                                        fullWidth={true}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        fullWidth
                                        variant='filled'
                                        accept='pdf/*'
                                        type='file'
                                        sx={{ height: '100%' }}
                                        {...register(`document.${index}.headerDocumentFile`)}
                                    // onChange={(data) => prepareImagePreview(data, index)}
                                    />
                                </Grid>
                                <Grid item xs={1}>
                                    <Button
                                        fullWidth
                                        color='delete'
                                        onClick={() => remove(index)}
                                        sx={{ borderRadius: 0, border: 1, height: '100%' }}>
                                        remove
                                    </Button>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </form>
            </DialogContent>
            <Divider />
            <DialogActions>
                <Grid container p={2} spacing={2} columns={4}>
                    <Grid item xs={1}>
                        <Button
                            fullWidth
                            onClick={hideModal}
                            color='secondary'
                            sx={{ borderRadius: 0, border: 1, height: '100%' }}>
                            close
                        </Button>
                    </Grid>
                    <Grid item xs={1}>
                        <Button
                            fullWidth
                            color='info'
                            onClick={() => reset()}
                            sx={{ borderRadius: 0, border: 1, height: '100%' }}>
                            reset
                        </Button>
                    </Grid>
                    <Grid item xs={1}>
                        <Button
                            // ref={addImageButtonRef}
                            // disabled={disabled}
                            sx={{ height: '100%', borderRadius: 0, border: 1 }}
                            color='create'
                            fullWidth
                            startIcon={<AddIcon />}
                            onClick={() => append(undefined, undefined)}>
                            add another
                        </Button>
                    </Grid>
                    <Grid item xs={1}>
                        <Button
                            // ref={submitButtonRef}
                            fullWidth
                            color='submit'
                            onClick={handleSubmit(onSubmit)}
                            sx={{ borderRadius: 0, border: 1, height: '100%' }}>
                            submit
                        </Button>
                    </Grid>
                </Grid>
            </DialogActions>
        </>
    );
};

export default UploadGlobalDocumentForm;