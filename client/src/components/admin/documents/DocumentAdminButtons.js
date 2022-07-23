import React from 'react';
import {Button, Grid} from "@mui/material";
import UploadGlobalDocument from "./UploadGlobalDocument";

const DocumentAdminButtons = () => {
    return (
        <Grid container spacing={2} mb={2}>
            <Grid item xs={3}>
                <UploadGlobalDocument/>
            </Grid>
            <Grid item xs={3}>
                <Button>button</Button>
            </Grid>
            <Grid item xs={3}>
                <Button>button</Button>
            </Grid>
            <Grid item xs={3}>
                <Button>button</Button>
            </Grid>
        </Grid>
    );
};

export default DocumentAdminButtons;