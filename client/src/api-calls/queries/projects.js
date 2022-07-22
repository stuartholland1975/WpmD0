/** @format */

import {gql} from '@apollo/client';

export const GET_ALL_PROJECT_SUMMARIES = gql`
	query GetAllProjectSummaries {
		orderheaderWithValues {
			nodes {
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
`;

export const GET_ALL_PROJECT_NUMBERS = gql`
	query GetAllProjectNumbers {
		orderheaderWithValues {
			nodes {
				orderNumber
			}
		}
	}
`;

export const GET_SINGLE_PROJECT_HEADER = gql`
	query GetSingleProjectHeader($id: Int!) {
		orderheaderWithValue(id: $id) {
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

export const READ_SINGLE_PROJECT_SUMMARY = gql`
	fragment ProjectHeader on OrderheaderWithValue {
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
`;
