/** @format */
//import { useQuery } from '@apollo/client';
//import { CircularProgress } from '@mui/material';
//import { GET_ALL_PROJECT_SUMMARIES } from '../../api-calls/queries/projects';
import ProjectHeaderGrid from '../grids/grids/ProjectHeaderGrid';
import {gridSelectionsInitialValue, gridSelectionsVar} from '../../cache';
import React from 'react';

const ProjectHeaders = () => {
	React.useEffect(() => {
		gridSelectionsVar(gridSelectionsInitialValue);
	}, []);
	return <ProjectHeaderGrid/>;
};

export default ProjectHeaders;
