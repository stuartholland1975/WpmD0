import React from 'react';
import { Button, Grid } from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import UpdateGlobalDocuments from "./UpdateGlobalDocuments";

const ProjectDocumentButtons = ({ rowData }) => {
    return (
        <Grid container columnSpacing={2} mb={2} mt={2} columns={4}>
            <Grid item xs={true}>
                <UpdateGlobalDocuments rowData={rowData} />
            </Grid>
            <Grid item xs={true}>
                <Button
                    disabled
                    startIcon={<EditIcon />}
                    color='update'>
                    button
                </Button>
            </Grid>
            <Grid item xs={true}>
                <Button
                    disabled
                    startIcon={<EditIcon />}
                    color='update'>
                    button
                </Button>
            </Grid>
            <Grid item xs={true}>
                <Button
                    disabled
                    startIcon={<EditIcon />}
                    color='update'>
                    button
                </Button>
            </Grid>
        </Grid>
    );
};

export default ProjectDocumentButtons;