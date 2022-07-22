/** @format */

import {Button, Grid} from '@mui/material';
import {useLocation, useNavigate} from 'react-router-dom';

const ProjectProcessingButtons = () => {
	const navigate = useNavigate();
	const location = useLocation();
	return (
		<Grid container spacing={2} mb={2} mt={1} columns={7}>
			<Grid item xs={1}>
				<Button
					disabled={location.pathname === '/projects/processing/locations'}
					color='navigation'
					onClick={() => navigate('locations')}>
					locations
				</Button>
			</Grid>
			<Grid item xs={1}>
				<Button
					disabled={location.pathname === '/projects/processing/items'}
					color='navigation'
					onClick={() => navigate('items')}>
					items
				</Button>
			</Grid>
			<Grid item xs={1}>
				<Button
					disabled={location.pathname === '/projects/processing/worksheets'}
					color='navigation'
					onClick={() => navigate('worksheets')}>
					works completed
				</Button>{' '}
			</Grid>
			<Grid item xs={1}>
				<Button
					color='navigation'
					disabled={location.pathname === '/projects/processing/applications'}
					onClick={() => navigate('applications')}>
					applications
				</Button>{' '}
			</Grid>
			<Grid item xs={1}>
				<Button
					color='navigation'
					disabled={location.pathname === '/projects/processing/documents'}
					onClick={() => navigate('documents')}>
					documents
				</Button>{' '}
			</Grid>
			<Grid item xs={1}>
				<Button color='navigation' onClick={() => navigate('images')}>
					view images
				</Button>{' '}
			</Grid>
			<Grid item xs={1}>
				<Button
					color='navigation'
					onClick={() => navigate('workbooks')}
					disabled={location.pathname === '/projects/processing/workbooks'}>
					project workbooks
				</Button>{' '}
			</Grid>
		</Grid>
	);
};

export default ProjectProcessingButtons;
