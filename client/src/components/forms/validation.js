/** @format */

import * as yup from 'yup';

export const existingProjects = (existing) =>
	existing.map((x) => x.orderNumber);

export const projectHeaderSchema = yup.object().shape({
	orderNumber: yup.string().required().length(7),
	projectTitle: yup.string().required(),
	areaId: yup.number().required(),
	worktypeId: yup.number().required(),
	orderStatusId: yup.number().required(),
});

export const projectItemSchema = yup.object().shape({
	item: yup.array().of(
		yup.object().shape({
			itemNumber: yup.number('Must Be A Number').required(),
			itemTypeId: yup.number().required(),
			packNumber: yup.string(),
			qtyOrdered: yup.number().required(),
			ratesetPriceId: yup.number().required(),
			valueBaseMaterials: yup.number().required(),
		}),
	),
});
