/** @format */

import {useRoutes} from 'react-router-dom';
import './App.css';
import ProjectAdmin from './components/admin/projects/ProjectAdmin';
import Home from './components/home/Home';
import NavigationDrawer from './components/navigation/NavigationDrawer';
import ProjectProcessingRoutes from './components/projects/project-processing/ProjectProcessingRoutes';
import ProjectHeaders from './components/projects/ProjectHeaders';
import ComponentTests from './test-components/ComponentTests';
import DocumentAdmin from "./components/admin/documents/DocumentAdmin";

function App() {
    let element = useRoutes([
        {
            path: '/',
            element: <NavigationDrawer/>,
            children: [
                {
                    index: true,
                    element: <Home/>,
                },
                {
                    element: <ProjectHeaders/>,
                    path: 'projects',
                    exact: true,
                },
                {
                    element: <ProjectAdmin/>,
                    path: 'admin/projects',
                },
                {
                    element: <DocumentAdmin/>,
                    path: 'admin/documents',
                },
                {
                    element: <ProjectProcessingRoutes/>,
                    path: 'projects/processing/:id/*',
                },
                {
                    element: <ComponentTests/>,
                    path: 'testing',
                },
            ],
        },
    ]);

    return element;
}

export default App;
