/** @format */

import ProjectHeaders from '../../projects/ProjectHeaders';
import ProjectAdminButtons from './ProjectAdminButtons';
import { Outlet } from 'react-router-dom';

const ProjectAdmin = () => {
	return (
		<div>
			<ProjectAdminButtons />
			<ProjectHeaders />
			<Outlet />
		</div>
	);
};

export default ProjectAdmin;
