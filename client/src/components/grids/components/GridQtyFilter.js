/** @format */

import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import {BottomNavigation, BottomNavigationAction, Paper} from '@mui/material';

const GridQtyFilter = ({value, setValue}) => {
	return (
		<Paper
			sx={{position: 'absolute', bottom: 0, left: 0, right: 0}}
			elevation={3}>
			<BottomNavigation
				sx={{
					'& .MuiBottomNavigationAction-root': {
						color: 'navy',
						fontWeight: 'bold',
					},
					'& .Mui-selected ': {
						color: 'red',
						fontWeight: 'bolder',
						'& .MuiBottomNavigationAction-label': {fontSize: 14},
						'& .MuiBottomNavigationAction-icon': {color: 'black'},
					},
					'& .MuiBottomNavigationAction-label': {fontSize: 14},
					backgroundColor: 'lightgray',
					borderTopStyle: 'solid',
					borderWidth: 2,
				}}
				value={value}
				onChange={(event, newValue) => {
					setValue(newValue);
				}}
				showLabels>
				<BottomNavigationAction
					label='Show All'
					value='All'
					icon={<AllInclusiveIcon/>}
				/>
				<BottomNavigationAction
					label='Complete Only'
					value='Complete Only'
					icon={<CheckIcon/>}
				/>
				<BottomNavigationAction
					label='Outstanding Only'
					value='Outstanding Only'
					icon={<ClearIcon/>}
				/>
			</BottomNavigation>
		</Paper>
	);
};

export default GridQtyFilter;
