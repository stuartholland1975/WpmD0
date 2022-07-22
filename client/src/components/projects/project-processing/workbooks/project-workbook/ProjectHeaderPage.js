/** @format */

import React from 'react';
import {Page, Text} from '@react-pdf/renderer';
import ReportHeader from '../../../../reports/components/ReportHeader';
import ProjectSummarySection from './ProjectSummarySection';
import {DateTime} from 'luxon';
import PageTitle from '../../../../reports/components/PageTitle';
import PageContent from '../../../../reports/components/PageContent';

const today = DateTime.now().toLocaleString();

const ProjectHeaderPage = ({projectData}) => {
    return (
        <Page size={'a4'} orientation={'landscape'} style={{padding: 10}}>
            <ReportHeader>
                <Text>Printed: {today.toLocaleString()}</Text>
                <Text>{'Project Workbook Report'}</Text>
                <Text
                    render={({pageNumber, totalPages}) =>
                        `Page:${pageNumber} / ${totalPages}`
                    }
                />
            </ReportHeader>
            <PageContent>
                <PageTitle title='PROJECT SUMMARY INFO'/>
                <ProjectSummarySection projectData={projectData}/>
            </PageContent>
        </Page>
    );
};

export default ProjectHeaderPage;
