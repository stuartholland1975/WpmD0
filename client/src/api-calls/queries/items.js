/** @format */

import {gql} from '@apollo/client';

export const GET_PROJECT_ITEMS = gql`
	query GetProjectItems($id: Int!) {
		orderdetailWithValues(filter: { orderheaderId: { equalTo: $id } }) {
			nodes {
				activityCode
				activityDescription
				complete
				id
				orderheaderId
				qtyApplied
				qtyComplete
				qtyOrdered
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
`;

export const GET_NEW_PROJECT_ITEMS = gql`
	query GetProjectItems($orderheaderId: Int!, $id: Int!) {
		orderdetailWithValues(
			filter: {
				orderheaderId: { equalTo: $orderheaderId }
				id: { greaterThan: $id }
			}
		) {
			nodes {
				activityCode
				activityDescription
				complete
				id
				orderheaderId
				qtyApplied
				qtyComplete
				qtyOrdered
				typeShort
				unitPayableTotal
				valueApplied
				valueComplete
				valuePayableTotal
				worksheetReference
				itemNumber
			}
			totalCount
		}
	}
`;

export const GET_PROJECT_ITEM_NUMBERS = gql`
	query GetProjectItemNumbers($id: Int!) {
		orderdetails(filter: { orderheaderId: { equalTo: $id } }) {
			nodes {
				id
				itemNumber
			}
		}
	}
`;
