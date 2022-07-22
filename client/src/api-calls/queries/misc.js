/** @format */

import {gql} from '@apollo/client';

export const GET_ALL_AREAS = gql`
    query getAreas {
        areas {
            nodes {
                id
                description
            }
        }
    }
`;

export const GET_ALL_WORKTYPES = gql`
    query getWorktypes {
        worktypes {
            nodes {
                id
                description
            }
        }
    }
`;

export const GET_ALL_ORDERHEADER_STATUSES = gql`
    query getOrderheaderStatus {
        orderheaderStatuses {
            nodes {
                id
                statusDescription
            }
        }
    }
`;

export const GET_PROJECT_WORKSHEETS = gql`
    query GetProjectWorksheets($id: Int!) {
        worksheetWithValues(filter: { orderheaderId: { equalTo: $id } }) {
            nodes {
                activityCode
                activityDescription
                applied
                dateComplete
                id
                itemNumber
                locationReference
                worksheetReference
                week
                year
                periodNumber
                qtyComplete
                supervisorName
                valueComplete
                batchId
                applicationNumber
            }
        }
    }
`;

export const GET_ALL_SUPERVISORS = gql`
    query GetAllSupervisors {
        supervisors {
            nodes {
                id
                displayName
                firstname
                fullName
                middlename
                surname
            }
        }
    }
`;

export const GET_CURRENT_PERIOD = gql`
    query GetCurrentPeriod {
        periods(condition: { current: true }) {
            nodes {
                current
                id
                periodNumber
                week
                weekCommencingDate
                weekEndingDate
                year
            }
        }
    }
`;

export const GET_ORDER_IMAGES = gql`
    query GetOrderImages($id: Int!) {
        imageDetails(filter: { orderheaderId: { equalTo: $id } }) {
            totalCount
            nodes {
                headerImageFile
                id
                longName
                shortName
                reference
                worksheetReference
                dateTakenManual
                exifDate
            }
        }
    }
`;

export const GET_ITEM_TYPES = gql`
    query GetItemTypes {
        itemTypes {
            nodes {
                id
                typeShort
            }
        }
    }
`;

export const GET_RATESET_HEADERS = gql`
    query GetRatesetHeaders {
        ratesetHeaders {
            nodes {
                id
                description
            }
        }
    }
`;

export const GET_RATESET_PRICES = gql`
    query GetRatesetPrices($id: Int) {
        ratesetPrices(filter: { ratesetHeaderId: { equalTo: $id } }) {
            nodes {
                activitycode {
                    activityCode
                    activityDescription
                    id
                }
                id
            }
        }
    }
`;

export const GET_IMAGE_TYPES = gql`
    query GetImageTypes {
        imageTypes {
            nodes {
                id
                longName
                shortName
            }
        }
    }
`

export const GET_PROJECT_DOCUMENTS = gql`
    query GetProjectDocuments($orderId:Int!) {
        orderheaderDocuments(condition: { orderheaderId: $orderId }) {
            nodes {
                document {
                    createdAt
                    global
                    headerDocumentFile
                    id
                    title
                }
            }
        }
    }
`

export const GET_PROJECT_WORKBOOK_DETAILS = gql`
    query GetProjectWorkbookDetails($orderId:Int!) {
        orderheader(id: $orderId) {
            orderheaderWithValueById {
                worktypeId
                orderStatusId
                statusDescription
                averageLocationValue
                averageItemValue
                notes
                startDate
                endDate
                issuedDate
                area
                areaId
                averageItemValue
                averageLocationValue
                id
                itemCount
                itemCountBoq
                itemCountVarn
                itemsComplete
                itemsCompleteBoq
                itemsCompleteVarn
                locationCount
                locationsComplete
                statusDescription
                orderNumber
                orderValueLabour
                orderValueMaterials
                orderValueOther
                orderValueTotal
                orderValueTotalApplied
                orderValueTotalBoq
                orderValueTotalComplete
                orderValueTotalVarn
                projectTitle
                workType
                issuedDate
                documentCount
                imageCount
            }
            sitelocationWithValues {
                nodes {
                    complete
                    id
                    itemCount
                    itemsComplete
                    orderValue
                    orderheaderId
                    reference
                    valueApplied
                    valueComplete
                    worksheetReference
                    imageCount
                    sitelocationById {
                        orderdetailWithValues {
                            nodes {
                                activityCode
                                activityDescription
                                complete
                                id
                                orderheaderId
                                qtyApplied
                                qtyComplete
                                qtyOrdered
                                qtyOs
                                typeShort
                                unitPayableTotal
                                valueApplied
                                valueComplete
                                valuePayableTotal
                                worksheetReference
                                itemNumber
                            }
                        }
                    }
                }
            }
        }
    }
`