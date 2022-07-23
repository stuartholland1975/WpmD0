/** @format */

import React from 'react';
import {Document, PDFViewer} from '@react-pdf/renderer';
import ProjectHeaderPage from './ProjectHeaderPage';
import {useParams} from 'react-router-dom';
import {useQuery} from '@apollo/client';
import {GET_PROJECT_WORKBOOK_DETAILS} from '../../../../../api-calls/queries/misc';
import ProjectLocationPage from './ProjectLocationPage';

const ProjectWorkbookReport = ({projectData}) => {
    return (
        <Document>
            <ProjectHeaderPage projectData={projectData}/>
            <ProjectLocationPage projectData={projectData}/>
        </Document>
    );
};

const ProjectWorkbook = () => {
    const {id} = useParams();
    const [projectData, setProjectData] = React.useState();
    const {loading} = useQuery(GET_PROJECT_WORKBOOK_DETAILS, {
        variables: {orderId: Number(id)},
        fetchPolicy: 'cache-and-network',
        onCompleted: (data) => setProjectData(data.orderheader),
    });

    if (loading) return null;
    return (
        <PDFViewer width={'100%'} height={1000}>
            <ProjectWorkbookReport projectData={projectData}/>
        </PDFViewer>
    );
};

export default ProjectWorkbook;
