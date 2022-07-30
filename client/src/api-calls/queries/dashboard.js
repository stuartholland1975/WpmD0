/** @format */

import { gql } from '@apollo/client';

export const GET_DASHBOARD_DATA = gql`
	query GetDashboardData {
		areaWithValues(orderBy: ID_ASC) {
			nodes {
				id
				description
				orderCount
				orderValue
				valueComplete
			}
		}
		workCompleteByAreaPeriodTables(orderBy: PERIOD_DESC, first: 10) {
			nodes {
				admin
				central
				misc
				north
				period
				south
				test
			}
		}
		workAppliedByAreaAndApplications(orderBy: APPLICATION_DESC, first: 10) {
			nodes {
				application
				north
				central
				south
				admin
				misc
				test
			}
		}
	}
`;
