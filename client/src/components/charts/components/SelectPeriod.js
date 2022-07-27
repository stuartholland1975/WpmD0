import React from 'react';
import {Autocomplete, TextField} from "@mui/material";
import {dashboardSelectionsVar} from "../../../cache";
import {useQuery} from "@apollo/client";
import {GET_ALL_PERIODS} from "../../../api-calls/queries/misc";

const SelectPeriod = ({periodFilter}) => {
    const [periods, setPeriods] = React.useState([{id: 999, periodNumber: 'All'}]);
    const [open, setOpen] = React.useState(false);
    const {loading} = useQuery(GET_ALL_PERIODS, {
        onCompleted: (data) =>
            setPeriods(prevState => [...data.periods.nodes.map(item => ({
                id: item.id,
                periodNumber: item.periodNumber.toString()
            })), ...prevState]),
    });

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (data) => {
        dashboardSelectionsVar({...dashboardSelectionsVar(), selectedPeriod: data});
        periodFilter.updateFilter("period", data)
    };
    return (
        <Autocomplete
            options={periods}
            getOptionLabel={(option) => option.periodNumber}
            onOpen={handleOpen}
            onClose={handleClose}
            open={open}
            onChange={(_, data) => handleChange(data.id)}
            openOnFocus={true}
            loading={loading}
            disableClearable={true}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            defaultValue={{id: 999, periodNumber: 'All'}}
            renderInput={(props) => (
                <TextField label='Period' variant='filled' {...props} />
            )}
        />
    );
};

export default SelectPeriod;