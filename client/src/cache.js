/** @format */

import {InMemoryCache, makeVar} from '@apollo/client';

export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                gridSelections: {
                    read() {
                        return gridSelectionsVar();
                    },
                },
                selectedWorksheets: {
                    read() {
                        return selectedWorksheetsVar();
                    },
                },
                toggleComplete: {
                    read() {
                        return toggleCompleteVar();
                    },
                },
                mutationApi: {
                    read() {
                        return mutationApiVar();
                    },
                },
                toggleModal: {
                    read() {
                        return toggleModal();
                    },
                },
                dashboardSelections: {
                    read() {
                        return dashboardSelectionsVar();
                    },
                },
            },
        },
    },
});

export const gridSelectionsInitialValue = {
    selectedOrder: false,
    selectedLocation: false,
    selectedItem: false,
    selectedApplication: false,
    selectedDocument: false,
    selectedPeriod: false,
    worksheetsValue: 0.0,
};

export const dashboardSelectionsInitialValue = {
    selectedArea: false,
    selectedPeriod: false
};

export const dashboardSelectionsVar = makeVar(dashboardSelectionsInitialValue);

const mutationApiInitialValue = {
    data: false,
};

export const gridSelectionsVar = makeVar(gridSelectionsInitialValue);

export const toggleCompleteVar = makeVar('all');

export const mutationApiVar = makeVar(mutationApiInitialValue);

export const selectedWorksheetsVar = makeVar();

export const toggleModal = makeVar(false);
