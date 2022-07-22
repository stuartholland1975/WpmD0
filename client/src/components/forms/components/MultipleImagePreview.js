/** @format */

import {useEffect} from 'react';
import {ImageList, ImageListItem, ImageListItemBar} from '@mui/material';

const MultipleImagePreview = ({imageFiles, setImages, images, preview}) => {
    useEffect(() => {
        if (imageFiles.length > 0) {
            const fileReaders = [];
            let isCancel = false;

            const promises = imageFiles.map((file) => {
                return new Promise((resolve, reject) => {
                    const fileReader = new FileReader();
                    fileReaders.push(fileReader);
                    fileReader.onload = (e) => {
                        const {result} = e.target;
                        if (result) {
                            resolve(result);
                        }
                    };
                    fileReader.onabort = () => {
                        reject(new Error('File reading aborted'));
                    };
                    fileReader.onerror = () => {
                        reject(new Error('Failed to read file'));
                    };
                    fileReader.readAsDataURL(file.image);
                });
            });
            Promise.all(promises)
                .then((images) => {

                    if (!isCancel) {
                        setImages(images);
                    }
                })
                .catch((reason) => {
                    console.log(reason);
                });

            return () => {
                isCancel = true;
                fileReaders.forEach((fileReader) => {
                    if (fileReader.readyState === 1) {
                        fileReader.abort();
                    }
                });
            };
        }
    }, [imageFiles, setImages]);
    return (
        <>
            {preview && images.length ? (
                <ImageList cols={4} gap={15} variant='standard'>
                    {images.map((image, idx) => {
                        return (
                            <ImageListItem key={idx}>
                                {/* <img src={image} srcSet={image} alt={'title'} loading='lazy' /> */}
                                <img
                                    src={image}
                                    srcSet={image}
                                    alt={'not loaded'}
                                    loading='lazy'
                                    style={{maxHeight: '500px'}}
                                />
                                <ImageListItemBar
                                    title={imageFiles[idx]?.title}
                                    subtitle={
                                        <span>
											Date Taken: {imageFiles[idx]?.date}
                                            <br/> Row Number: {idx + 1}
										</span>
                                    }
                                    position='bottom'
                                />
                            </ImageListItem>
                        );
                    })}
                </ImageList>
            ) : null}
        </>
    );
};

export default MultipleImagePreview;
