import React from 'react';
import ProjectDocumentsGrid from "../../../grids/grids/ProjectDocumentsGrid";

const ProjectDocuments = () => {
    return (
        <div>
            <hr/>
            <div className={'grid-title'}>Project Documents Listing</div>
            <ProjectDocumentsGrid/>
        </div>
    );
};

export default ProjectDocuments;