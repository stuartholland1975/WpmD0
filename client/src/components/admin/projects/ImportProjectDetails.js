/** @format */

import React from 'react';
import {Box, Button, CircularProgress, TextField} from '@mui/material';
import {useLazyQuery} from '@apollo/client';
import {gridSelectionsVar} from '../../../cache';
import {VALIDATE_IMPORT_DATA} from "../../../api-calls/queries/misc";
import {read, utils} from 'xlsx';
import ImportProjectDetailGrid from '../../grids/grids/ImportProjectDetailGrid';
import {ref} from "yup";

const ImportProjectDetails = () => {
    const [importData, setImportData] = React.useState(null);
	const [validateData] = useLazyQuery(VALIDATE_IMPORT_DATA, {
		onCompleted: data => console.log(data)
	})


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
			items: importData.map(item =>  item.itemNumber),
			activities: importData.map(item => item.code),
			refs: importData.map(item => item.reference)
		}
		console.log(validationData)
		validateData({
			variables:{orderId:Number(gridSelectionsVar().selectedOrder[0].id), items: validationData.items, activities:validationData.activities, refs:validationData.refs}
		}).then(console.log)
	}
	//orderId: Number(gridSelectionsVar().selectedOrder.id),

    console.log(importData);

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
                            handleImport(data)
                        }}
                    />
                    <Button disabled={importData === null} fullWidth={false} onClick={handleValidateData}>
                        Validate Data
                    </Button>
                </Box>
            </Box>
            <ImportProjectDetailGrid importData={importData}/>
        </Box>
    );
};

export default ImportProjectDetails;
