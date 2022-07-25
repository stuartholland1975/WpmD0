import {gql} from "@apollo/client";

export const GET_PROJECT_APPLICATION_DETAILS = gql`
    query GetProjectApplicationDetails($orderId:Int!) {
        applicationSummaryOrderheaderWithCumulativeValues(
            condition: { orderId: $orderId }
            orderBy: APPLICATION_NUMBER_ASC
        ) {
            nodes {
                applicationId
                applicationNumber
                applicationReference
                prevCumulativeApplicationValue
                thisApplicationValue
                cumulativeApplicationValue
                itemCount
                locationCount        
            }
        }
    }
`