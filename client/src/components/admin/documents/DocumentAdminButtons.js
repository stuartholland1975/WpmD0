import React from 'react';
import { Button, Grid } from "@mui/material";
import UploadGlobalDocument from "./UploadGlobalDocument";
import DeleteGlobalDocuments from './DeleteGlobalDocuments';

const DocumentAdminButtons = () => {
    return (
        <Grid container spacing={2} mb={2}>
            <Grid item xs={3}>
                <UploadGlobalDocument />
            </Grid>
            <Grid item xs={3}>
                <Button disabled>button</Button>
            </Grid>
            <Grid item xs={3}>
                <DeleteGlobalDocuments />
            </Grid>
            <Grid item xs={3}>
                <Button disabled>button</Button>
            </Grid>
        </Grid>
    );
};

export default DocumentAdminButtons;