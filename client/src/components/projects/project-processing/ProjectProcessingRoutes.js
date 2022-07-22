/** @format */

import {useRoutes} from 'react-router-dom';
import ProjectImages from './images/ProjectImages';
import ProjectItems from './items/ProjectItems';
import ProjectLocations from './locations/ProjectLocations';
import ProjectProcessing from './ProjectProcessing';
import ProjectProgress from './locations/ProjectProgress';
import ProjectWorksheets from './ProjectWorksheets';
import ProjectApplications from './applications/ProjectApplications';
import ProjectDocuments from './documents/ProjectDocuments';

import ProjectWorkbooks from './workbooks/ProjectWorkbooks';
import ProjectWorkbook from './workbooks/project-workbook/ProjectWorkbook';

const ProjectProcessingRoutes = () => {
	return useRoutes([
		{
			path: '/',
			element: <ProjectProcessing/>,
			children: [
				{
					path: 'locations',
					element: <ProjectLocations/>,
					exact: true,
				},
				{
					path: 'items',
					element: <ProjectItems/>,
					exact: true,
				},
				{
					path: 'worksheets',
					element: <ProjectWorksheets/>,
					exact: true,
				},
				{
					path: 'locations/progress',
					element: <ProjectProgress/>,
					exact: true,
				},
				{
					path: 'images',
					element: <ProjectImages/>,
					exact: true,
				},
				{
					path: 'applications',
					element: <ProjectApplications/>,
					exact: true,
				},
				{
					path: 'documents',
					element: <ProjectDocuments/>,
					exact: true,
				},
				{
					path: 'workbooks',
					element: <ProjectWorkbooks/>,
					exact: true,
					children: [
						{
							path: 'project-workbook',
							element: <ProjectWorkbook/>,
							exact: true,
						},
					],
				},
			],
		},

		{
			path: 'items',
		},
		{
			path: 'worksheets',
		},
	]);
};
export default ProjectProcessingRoutes;
