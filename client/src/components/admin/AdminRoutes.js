/** @format */

import { useRoutes } from 'react-router-dom';

import React from 'react';
import ProjectAdmin from './projects/ProjectAdmin';
import DocumentAdmin from './documents/DocumentAdmin';
import ImportProjectDetails from './projects/ImportProjectDetails';

const AdminRoutes = () => {
	return useRoutes([
		{
			path: 'projects',
			element: <ProjectAdmin />,
			children: [
				{
					path: 'import',
					element: <ImportProjectDetails />,
				},
			],
		},
		{
			path: 'documents',
			element: <DocumentAdmin />,
		},
	]);
};

export default AdminRoutes;
