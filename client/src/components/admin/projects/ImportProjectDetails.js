/** @format */

import React from 'react';
import {Box, Button, CircularProgress, TextField} from '@mui/material';
import {useLazyQuery} from '@apollo/client';
import {gridSelectionsVar} from '../../../cache';
import {
    VALIDATE_IMPORT_DATA,
    VALIDATE_PRICES,
} from '../../../api-calls/queries/misc';
import {read, utils} from 'xlsx';
import ImportProjectDetailGrid from '../../grids/grids/ImportProjectDetailGrid';
import {ref} from 'yup';

const ImportProjectDetails = () => {
    const [importData, setImportData] = React.useState(null);
    const [validateData] = useLazyQuery(VALIDATE_IMPORT_DATA, {
        fetchPolicy: 'network-only',
        //onCompleted: (data) => console.log(data),
    });
    const [validatePrices] = useLazyQuery(VALIDATE_PRICES, {
        fetchPolicy: 'network-only',
        //onCompleted: (data) => console.log(data),
    });

    const handleImport = (event) => {
        const files = event.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;
                if (sheets.length) {
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                    setImportData(rows);
                }
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const handleValidateData = () => {
        const validationData = {
            items: importData.map((item) => item.itemNumber),
            activities: importData.map((item) => item.code),
            refs: importData.map((item) => item.reference),
            rateset: [...new Set(importData.map((item) => item.ratesetId))],
        };

        validateData({
            variables: {
                orderId: Number(gridSelectionsVar().selectedOrder[0].id),
                items: validationData.items,
                activities: validationData.activities,
                refs: validationData.refs,
            },
        }).then((res) => {
            if (res.data.validateActivities === true) {
                const sets = validationData.rateset.map((item) => ({
                    rateset: item,
                    activities: [
                        ...new Set(
                            importData
                                .filter((obj) => obj.ratesetId === item)
                                .map((item) => item.code),
                        ),
                    ],
                }));
                console.log(sets);
                const validateRatesets = (data) => {
                    console.log(data);
                    validatePrices({
                        variables: {
                            rateset: data.rateset,
                            activities: data.activities,
                        },
                    }).then(console.log);
                };
                sets.forEach(validateRatesets);
            } else {
                console.log('validation failed');
            }
        });
    };

    return (
        <Box>
            <Box pt={5} pb={5}>
                <hr/>
                <div className='grid-title'>IMPORT PROJECT DETAIL</div>
                <Box display={'flex'}>
                    <TextField
                        variant='outlined'
                        accept='*'
                        type='file'
                        onChange={(data) => {
                            handleImport(data);
                        }}
                    />
                    <Button
                        disabled={importData === null}
                        fullWidth={false}
                        onClick={handleValidateData}
                    >
                        Validate Data
                    </Button>
                </Box>
            </Box>
            <ImportProjectDetailGrid importData={importData}/>
        </Box>
    );
};

export default ImportProjectDetails;
