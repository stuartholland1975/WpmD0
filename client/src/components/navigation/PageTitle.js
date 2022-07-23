/** @format */

import {Box} from '@mui/material';
import {useLocation} from 'react-router-dom';

const PageTitle = () => {
    const routeMatch = useLocation();
    let text;

    if (routeMatch.pathname.startsWith('/projects/processing')) {
        text = 'PROJECT PROCESSING';
    } else if (routeMatch.pathname === '/projects/admin/locations') {
        text = 'ORDER LOCATIONS LISTING';
    } else if (routeMatch.pathname === '/projects/admin/items') {
        text = 'ORDER ITEMS LISTING';
    } else if (routeMatch.pathname === '/projects/admin/worksheets') {
        text = 'ORDER WORKSHEETS LISTING';
    } else if (routeMatch.pathname === '/projects/admin/documents') {
        text = 'ORDER DOCUMENTS LISTING';
    } else if (routeMatch.pathname === '/projects/admin/images') {
        text = 'ORDER IMAGES LISTING';
    } else if (routeMatch.pathname === '/projects') {
        text = 'PROJECT ORDER LISTING';
    } else if (routeMatch.pathname === '/applications') {
        text = 'APPLICATION PROCESSING';
    } else if (routeMatch.pathname === '/dashboard') {
        text = 'CONTRACT DASHBOARD';
    } else if (routeMatch.pathname === '/analysis') {
        text = 'PERIOD ANALYSIS';
    } else if (routeMatch.pathname === '/enquiries') {
        text = 'CONTRACT ENQUIRIES';
    } else if (routeMatch.pathname === '/admin/global/applications') {
        text = 'CONTRACT APPLICATIONS ADMIN';
    } else if (routeMatch.pathname === '/admin/global/financials_archive') {
        text = 'CONTRACT PERIODS ADMIN';
    } else if (routeMatch.pathname === '/admin/global/documents') {
        text = 'CONTRACT DOCUMENTS ADMIN';
    } else if (routeMatch.pathname === '/enquiry/applications') {
        text = 'CONTRACT APPLICATIONS ENQUIRY';
    } else if (routeMatch.pathname === '/enquiry/projects') {
        text = 'CONTRACT ORDER ENQUIRY';
    } else if (routeMatch.pathname === '/enquiry/period-financials') {
        text = 'PERIOD VALUE ENQUIRY';
    } else if (routeMatch.pathname === '/reports/applications') {
        text = 'APPLICATION REPORTS';
    } else if (routeMatch.pathname === '/reports/financial') {
        text = 'FINANCIAL REPORTS';
    } else if (routeMatch.pathname === '/reports/projects') {
        text = 'PROJECT REPORTS';
    } else if (routeMatch.pathname === '/reports') {
        text = 'REPORT SELECTIONS';
    } else if (routeMatch.pathname === '/admin/projects') {
        text = 'PROJECT ADMINISTRATION';
    } else if (routeMatch.pathname === '/admin/documents') {
        text = 'GLOBAL DOCUMENT ADMINISTRATION';
    } else {
        text = 'WORK PACKAGE MANAGER';
    }
    return (
        <Box
            component='h2'
            sx={{
                position: 'sticky',
                top: 0,
                background: '#22415e',
                color: 'white',
                mt: 0,
                textAlign: 'center',
                p: 1,
            }}>
            {text}
        </Box>
    );
};

export default PageTitle;
