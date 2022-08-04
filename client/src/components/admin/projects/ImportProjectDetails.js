/** @format */

import React from 'react';
import { Box, TextField } from '@mui/material';
import { useReactiveVar } from '@apollo/client';
import { gridSelectionsVar } from '../../../cache';
import { read, utils } from 'xlsx';
import ImportProjectDetailGrid from '../../grids/grids/ImportProjectDetailGrid';

const ImportProjectDetails = () => {
	const [importData, setImportData] = React.useState(null);

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

	console.log(importData);

	return (
		<Box>
			<Box pt={5}>
				<hr />
				<div className='grid-title'>IMPORT PROJECT DETAIL</div>
				<TextField
					variant='outlined'
					accept='*'
					type='file'
					onChange={(data) => handleImport(data)}
				/>
			</Box>
			<ImportProjectDetailGrid importData={importData} />
		</Box>
	);
};

export default ImportProjectDetails;
