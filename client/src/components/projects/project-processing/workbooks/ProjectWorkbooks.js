/** @format */

import React from 'react';
import ProjectWorkbookButtons from './ProjectWorkbookButtons';
import {Outlet} from 'react-router-dom';

const ProjectWorkbooks = () => {
	return (
		<div>
			<ProjectWorkbookButtons/>
			<hr/>
			<Outlet/>
		</div>
	);
};

export default ProjectWorkbooks;
