import React from 'react';
import { useMutation, useReactiveVar } from '@apollo/client';
import { DELETE_GLOBAL_DOCUMENTS } from '../../../api-calls/mutations/project-mutations';
import { useConfirm } from 'material-ui-confirm';
import { Button } from '@mui/material';
import { gridSelectionsVar } from '../../../cache';
import { GET_GLOBAL_DOCUMENTS } from '../../../api-calls/queries/misc';
import DeleteIcon from '@mui/icons-material/Delete'

const DeleteGlobalDocuments = () => {

    const confirm = useConfirm()

    const selectedDocuments = useReactiveVar(gridSelectionsVar).selectedDocument

    const [deleteDocuments] = useMutation(DELETE_GLOBAL_DOCUMENTS, {
        refetchQueries: [
            {
                query: GET_GLOBAL_DOCUMENTS
            }
        ],
        awaitRefetchQueries: true
    })

    const handleDeleteGlobalDocuments = () => {

        confirm({
            title: 'Confirm Document Deletion',
            titleProps: { color: 'red', fontWeight: 'bold' },
            content: `Submission Contains ${gridSelectionsVar().selectedDocument.length
                } Item(s)`,
            confirmationText: 'Confirm',
            cancellationButtonProps: { color: 'secondary' },
            allowClose: false,
            contentProps: { fontWeight: 'bold' },
        }).then(() => deleteDocuments({
            variables: { input: selectedDocuments.map(item => ({ id: item.id })) }
        })).catch(console.error)
    }

    return (
        <Button
            fullWidth
            onClick={handleDeleteGlobalDocuments}
            color='delete'
            disabled={selectedDocuments === false}
            startIcon={<DeleteIcon />}>
            delete document(s)
        </Button>
    );
};

export default DeleteGlobalDocuments;