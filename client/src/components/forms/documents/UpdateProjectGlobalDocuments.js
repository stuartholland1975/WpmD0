import React from 'react';
import {useMutation, useQuery} from "@apollo/client";
import {GET_GLOBAL_DOCUMENTS, GET_PROJECT_DOCUMENTS} from "../../../api-calls/queries/misc";
import TransferList from "../components/TransferList";
import {Button, DialogActions, DialogContent} from "@mui/material";
import {UPDATE_PROJECT_GLOBAL_DOCUMENTS} from "../../../api-calls/mutations/project-mutations";

const filterByReference = (arr1, arr2) => {
    let res = [];
    res = arr1.filter(el => {
        return !arr2.find(element => {
            return element.id === el.id;
        });
    });
    return res;
}

const UpdateProjectGlobalDocuments = ({current, hideModal, id}) => {

    const [options, setOptions] = React.useState([])
    const [selected, setSelected] = React.useState(current)
    const {loading} = useQuery(GET_GLOBAL_DOCUMENTS, {
        onCompleted: data => setOptions(filterByReference(data.documents.nodes, current))
    })

    const [updateProjectDocuments] = useMutation(UPDATE_PROJECT_GLOBAL_DOCUMENTS, {
        refetchQueries: [
            {
                query: GET_PROJECT_DOCUMENTS,
                variables: {orderId: Number(id)}
            }
        ]
    })

    const onSubmit = () => {
        const additions = filterByReference(selected, current).map(item => ({
            orderheaderId: Number(id),
            documentId: item.id
        }))
        const deletions = filterByReference(current, selected).map(item => ({
            orderheaderId: Number(id),
            documentId: item.id
        }))
        updateProjectDocuments({
            variables: {additions: additions, deletions: deletions}
        }).then(() => hideModal())
    }
    if (loading) return null
    return (
        <>
            <DialogContent>
                <TransferList options={options} initial={current} setSelected={setSelected}/>
            </DialogContent>
            <DialogActions>
                <Button
                    fullWidth
                    onClick={hideModal}
                    color='info'
                    sx={{borderRadius: 0, border: 1, height: '100%'}}>
                    close
                </Button>
                <Button>button</Button>
                <Button>button</Button>
                <Button color='submit' onClick={onSubmit}>submit</Button>
            </DialogActions>
        </>
    );
};

export default UpdateProjectGlobalDocuments;