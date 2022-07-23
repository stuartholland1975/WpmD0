import React from 'react';
import {Button, Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";

const ProjectWorkbookButtons = () => {
    const navigate = useNavigate()
    return (
        <Grid container columnSpacing={2} mb={2} mt={2} columns={4}>
            <Grid item xs={1}>
                <Button
                    onClick={() => navigate('project-workbook')}
                    color='info'>
                    print project workbook
                </Button>
            </Grid>
            <Grid item xs={1}>
                <Button
                    color='info'>
                    button
                </Button>
            </Grid>
            <Grid item xs={1}>
                <Button
                    color='info'>
                    button
                </Button>
            </Grid>
            <Grid item xs={1}>
                <Button
                    color='info'>
                    button
                </Button>
            </Grid>
        </Grid>
    );
};

export default ProjectWorkbookButtons;