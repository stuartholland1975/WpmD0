/** @format */
import React from 'react';
import {gridSelectionsVar} from '../../../../cache';
import ProjectLocationsGrid from '../../../grids/grids/ProjectLocationsGrid';
import ProjectLocationsButtons from './ProjectLocationsButtons';

const ProjectLocations = () => {
	React.useEffect(() => {
		gridSelectionsVar({...gridSelectionsVar(), selectedLocation: false});
	}, []);
	return (
		<div>
			<ProjectLocationsButtons/>
			<hr/>
			<div className='grid-title'>Project Locations List</div>
			<ProjectLocationsGrid/>
		</div>
	);
};

export default ProjectLocations;
