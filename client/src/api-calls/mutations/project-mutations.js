/** @format */

import {gql} from '@apollo/client';

export const CREATE_PROJECT_HEADER = gql`
	mutation CreateProjectHeader($input: OrderheaderInput!) {
		createOrderheader(input: { orderheader: $input }) {
			clientMutationId
		}
	}
`;

export const EDIT_PROJECT_HEADER = gql`
	mutation EditProjectHeader($id: Int!, $patch: OrderheaderPatch!) {
		updateOrderheader(input: { patch: $patch, id: $id }) {
			clientMutationId
		}
	}
`;

export const DELETE_PROJECT_HEADER = gql`
	mutation DeleteProjectHeader($id: Int!) {
		deleteOrderheader(input: { id: $id }) {
			deletedOrderheaderNodeId
			clientMutationId
		}
	}
`;

export const CREATE_BULK_WORKSHEETS = gql`
	mutation CreateBulkWorksheets(
		$input: WorksheetCreateBulkWorksheetsInput!
		$orderId: Int!
		$locationId: Int!
	) {
		worksheetCreateBulkWorksheets(input: $input) {
			query {
				orderheaderWithValue(id: $orderId) {
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
				sitelocationWithValueById(id: $locationId) {
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
	}
`;

export const CREATE_PROJECT_LOCATION = gql`
	mutation CreateProjectLocation($projectId: Int!, $reference: String!) {
		createSitelocation(
			input: {
				sitelocation: { reference: $reference, orderheaderId: $projectId }
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
	}
`;

export const CREATE_MANY_LOCATIONS = gql`
	mutation CreateManyLocations($input: [SitelocationInput!]) {
		mnCreateSitelocation(input: { mnSitelocation: $input }) {
			clientMutationId
		}
	}
`;

export const CREATE_BULK_LOCATIONS = gql`
	mutation CreateBulkLocations(
		$input: [SitelocationInput!]
		$orderheaderId: Int!
	) {
		sitelocationCreateBulkLocations(input: { locations: $input }) {
			sitelocations {
				sitelocationWithValueById {
					complete
					id
					imageCount
					itemCount
					itemsComplete
					orderValue
					orderheaderId
					reference
					valueApplied
					valueComplete
					worksheetReference
				}
			}
			query {
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
		}
	}
`;

export const DELETE_MANY_LOCATIONS = gql`
	mutation DeleteManyLocations($input: [SitelocationPatch!]) {
		mnDeleteSitelocation(input: { mnPatch: $input }) {
			orderheader {
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
			}
		}
	}
`;

export const ADD_BULK_ITEMS_TO_LOCATION = gql`
	mutation AddBulkItemsToLocation(
		$input: [OrderdetailInput!]
		$locationId: Int!
		$orderheaderId: Int!
	) {
		mnCreateOrderdetail(input: { mnOrderdetail: $input }) {
			clientMutationId
			query {
				sitelocationWithValueById(id: $locationId) {
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
		}
	}
`;

export const CREATE_MANY_ITEMS = gql`
	mutation CreateManyItems($input: [OrderdetailInput!], $orderheaderId: Int!) {
		orderdetailCreateBulkItems(input: { orderdetails: $input }) {
			orderdetails {
				orderdetailWithValueById {
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
			query {
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
		}
	}
`;

export const CALCULATE_ITEM_VALUE = gql`
	mutation CalculateItemValue(
		$priceId: Int!
		$qtyOrdered: BigFloat!
		$materialsValue: BigFloat!
	) {
		calculateItemValue(
			input: {
				priceId: $priceId
				qtyOrdered: $qtyOrdered
				materialsValue: $materialsValue
			}
		) {
			bigFloat
		}
	}
`;

export const ADD_IMAGE_TO_LOCATION = gql`
	mutation AddImageToLocation($input: ImageInput!, $orderheaderId: Int!) {
		createImage(input: { image: $input }) {
			sitelocation {
				sitelocationWithValueById {
					complete
					id
					imageCount
					itemCount
					itemsComplete
					orderValue
					orderheaderId
					reference
					valueApplied
					valueComplete
					worksheetReference
				}
			}
			query {
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
		}
	}
`;

export const ADD_BULK_IMAGES_TO_LOCATION = gql`
	mutation AddBulkImagesToLocation($input: [ImageInput!]) {
		mnCreateImage(input: { mnImage: $input }) {
			sitelocation {
				sitelocationWithValueById {
					complete
					id
					imageCount
					itemCount
					itemsComplete
					orderValue
					orderheaderId
					reference
					valueApplied
					valueComplete
					worksheetReference
					orderheader {
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
					}
				}
			}
		}
	}
`;

export const UPLOAD_DOCUMENTS = gql`
	mutation UploadDocuments($input: [DocumentInput!]) {
		mnCreateDocument(input: { mnDocument: $input }) {
			clientMutationId
		}
	}
`;
export const DELETE_GLOBAL_DOCUMENTS = gql`
	mutation DeleteGlobalDocuments($input: [DocumentPatch!]) {
		mnDeleteDocument(input: { mnPatch: $input }) {
			document {
				id
			}
		}
	}
`;

export const UPDATE_PROJECT_GLOBAL_DOCUMENTS = gql`
	mutation UpdateProjectGlobalDocuments(
		$additions: [OrderheaderDocumentInput!]
		$deletions: [OrderheaderDocumentPatch!]
	) {
		mnDeleteOrderheaderDocument(input: { mnPatch: $deletions }) {
			orderheader {
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
			}
		}
		mnCreateOrderheaderDocument(input: { mnOrderheaderDocument: $additions }) {
			orderheader {
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
			}
		}
	}
`;
