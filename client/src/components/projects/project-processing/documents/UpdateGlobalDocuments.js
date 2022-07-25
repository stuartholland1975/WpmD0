import React from 'react';
import { useParams } from "react-router-dom";
import { PhotoCamera } from "@mui/icons-material";
import { Box, Button, Dialog, DialogTitle, Divider, IconButton } from "@mui/material";
import { useModal } from "react-modal-hook";
import CloseIcon from "@mui/icons-material/Close";
import { gridSelectionsVar } from "../../../../cache";
import UpdateProjectGlobalDocuments from "../../../forms/documents/UpdateProjectGlobalDocuments";

const UpdateGlobalDocuments = ({ rowData }) => {
    const current = rowData.filter(obj => obj.global)
    const { id } = useParams()
    const [showModal, hideModal] = useModal(() => {
        return (
            <Dialog
                onClose={hideModal}
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
                            UPDATE GLOBAL DOCUMENTS FOR PROJECT : {gridSelectionsVar().selectedOrder.projectTitle}
                        </Box>
                        <Box>
                            <IconButton onClick={hideModal}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </DialogTitle>
                <Divider />
                <UpdateProjectGlobalDocuments hideModal={hideModal} rowData={rowData} current={current} id={id} />
            </Dialog>
        )
    }, [rowData, current, id])

    return (
        <Button
            onClick={showModal}
            startIcon={<PhotoCamera />}
            color='info'>
            update global documents
        </Button>
    );
};

export default UpdateGlobalDocuments;