/** @format */
import React from 'react';
import TestChart from '../charts/TestChart';
import TestChart2 from '../charts/TestChart2';
import {Divider, Grid} from '@mui/material';
import SelectArea from '../charts/components/SelectArea';
import SelectPeriod from "../charts/components/SelectPeriod";
import {useQuery} from "@apollo/client";
import {GET_AREAS_WITH_VALUES} from "../../api-calls/queries/misc";
import AreaValuesGrid from "../grids/grids/AreaValuesGrid";

function useDashboardFilters() {
    const [filters, setFilter] = React.useState({
        area: null,
        period: null
    });

    const updateFilter = (filterType, value) => {
        setFilter(prevState => ({
            ...prevState,
            [filterType]: value,
        }));
    };

    return {
        models: {filters},
        operations: {updateFilter},
    };
}

const Dashboard = () => {
    const {operations, models} = useDashboardFilters()
    const {data, loading, error, refetch} = useQuery(GET_AREAS_WITH_VALUES)

    console.log(models)

    if (loading) return null
    if (error) console.log(error)
    if (data) console.log(data)
    return (

        <React.Fragment>
            <Grid container spacing={3} columns={3} rowSpacing={5} >
                <Grid item xs={1.5}>
                    <SelectArea areaFilter={operations}/>
                </Grid>
                <Grid item={true} xs={1.5}>
                    <SelectPeriod periodFilter={operations}/>
                </Grid>


                {/* <Grid item>
					<TestChart />
				</Grid>*/}
                <Grid item xs={1.5} >
                    {/*<TestChart2  data={data.areaWithValues.nodes}/>*/}
                    <React.Fragment>
                        <div className={'grid-title'}>AREA VALUES</div>
                        <AreaValuesGrid/>
                    </React.Fragment>
                </Grid>
            </Grid>
        </React.Fragment>

    );
};

export default Dashboard;
