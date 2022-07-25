import React from 'react';
import ProjectDocumentsGrid from "../../../grids/grids/ProjectDocumentsGrid";
import ProjectDocumentButtons from "./ProjectDocumentButtons";
import {useQuery} from "@apollo/client";
import {GET_PROJECT_DOCUMENTS} from "../../../../api-calls/queries/misc";
import {useParams} from "react-router-dom";

const ProjectDocuments = () => {
    const {id} = useParams();
    const [rowData, setRowData] = React.useState([]);
    const {loading} = useQuery(GET_PROJECT_DOCUMENTS, {
        variables: {orderId: Number(id)},
        fetchPolicy: 'cache-and-network',
        onCompleted: (data) =>
            setRowData(data.orderheaderDocuments.nodes.map((item) => item.document)),
    });
    if (loading) return null;
    return (
        <div>
            <ProjectDocumentButtons rowData={rowData}/>
            <hr/>
            <div className={'grid-title'}>Project Documents Listing</div>
            <ProjectDocumentsGrid rowData={rowData}/>
        </div>
    );
};

export default ProjectDocuments;