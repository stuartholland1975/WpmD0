import React from 'react';
import { useModal } from 'react-modal-hook';
import { Box, Button, Dialog, DialogTitle, Divider, IconButton, } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import UploadIcon from '@mui/icons-material/Upload'
import UploadGlobalDocumentForm from "../../forms/documents/UploadGlobalDocumentForm";

const UploadGlobalDocument = () => {
    const [showModal, hideModal] = useModal(
        () => (
            <Dialog
                onClose={(event, reason) => {
                    if (reason === "backdropClick") {
                        console.log(reason);
                    } else {
                        hideModal();
                    }
                }}
                fullWidth={true}
                maxWidth={'xl'}
                open={true}>
                <DialogTitle id='id'>
                    <Box
                        display='flex'
                        alignItems='center'
                        justifyContent='space-between'>
                        <Box
                            flexGrow={1}
                            sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}>
                            UPLOAD GLOBAL DOCUMENT
                        </Box>
                        <Box>
                            <IconButton onClick={hideModal}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </DialogTitle>
                <Divider />
                <UploadGlobalDocumentForm hideModal={hideModal} />
            </Dialog>
        ),
        [],
    );
    return (
        <Button
            onClick={showModal}
            color='create'
            startIcon={<UploadIcon />}
        >
            upload global document(s)
        </Button>
    );
};

export default UploadGlobalDocument;