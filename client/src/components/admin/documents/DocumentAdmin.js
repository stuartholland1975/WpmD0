import React from 'react';
import DocumentAdminButtons from "./DocumentAdminButtons";
import GlobalDocumentsGrid from "../../grids/grids/GlobalDocumentsGrid";

const DocumentAdmin = () => {
    return (
        <div>
            <DocumentAdminButtons/>
            <GlobalDocumentsGrid/>
        </div>
    );
};

export default DocumentAdmin;