/** @format */

import React from 'react';
import {Autocomplete, TextField} from '@mui/material';
import {useQuery} from '@apollo/client';
import {GET_ALL_AREAS} from '../../../api-calls/queries/misc';
import {dashboardSelectionsVar} from '../../../cache';

const SelectArea = ({areaFilter}) => {
    const [areas, setAreas] = React.useState([{id: 999, description: 'All'}]);
    const [open, setOpen] = React.useState(false);
    const {loading} = useQuery(GET_ALL_AREAS, {
        onCompleted: (data) =>
            setAreas(prevState => [...data.areas.nodes, ...prevState]),
    });

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (data) => {
        dashboardSelectionsVar({...dashboardSelectionsVar(), selectedArea: data});
        areaFilter.updateFilter("area", data)
    };

    return (
        <Autocomplete
            options={areas}
            getOptionLabel={(option) => option.description}
            onOpen={handleOpen}
            onClose={handleClose}
            open={open}
            onChange={(_, data) => handleChange(data.id)}
            openOnFocus={true}
            loading={loading}
            disableClearable={true}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            defaultValue={{id: 999, description: 'All'}}
            renderInput={(props) => (
                <TextField label='Area' variant='filled' {...props} />
            )}
        />
    );
};

export default SelectArea;
