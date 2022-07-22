/** @format */

import {gql} from '@apollo/client';

export const GET_PROJECT_LOCATIONS = gql`
	query GetProjectLocations($id: Int!) {
		sitelocationWithValues(filter: { orderheaderId: { equalTo: $id } }) {
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
			}
		}
	}
`;

export const GET_INCOMPLETE_LOCATION_ITEMS = gql`
	query GetIncompleteLocationItems($id: Int!) {
		orderdetailWithValues(
			filter: { complete: { equalTo: false }, sitelocationId: { equalTo: $id } }
		) {
			nodes {
				activityCode
				activityDescription
				itemNumber
				typeShort
				valueOs
				qtyOs
				qtyOrdered
				id
				orderheaderId
				unitPayableTotal
				sitelocationId
			}
		}
	}
`;

export const READ_LOCATION_REFERENCES = gql`
	query ReadLocationReferences($id: Int!) {
		sitelocationWithValues(filter: { orderheaderId: { equalTo: $id } }) {
			nodes {
				reference
				id
			}
		}
	}
`;

export const GET_SINGLE_LOCATION = gql`
	query GetSingleLocation($id: Int!) {
		sitelocationWithValue(id: $id) {
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
		}
	}
`;

export const GET_UPDATED_LOCATIONS = gql`
	query GetUpdatedLocations($id: Int!, $orderheaderId: Int!) {
		sitelocationWithValues(
			filter: {
				id: { greaterThan: $id }
				orderheaderId: { equalTo: $orderheaderId }
			}
		) {
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
			}
		}
		orderheaderWithValue(id: $orderheaderId) {
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
	}
`;
