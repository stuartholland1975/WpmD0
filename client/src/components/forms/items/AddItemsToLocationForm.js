/** @format */

import React from 'react';
import {Button, DialogActions, DialogContent, Divider, Grid, TextField,} from '@mui/material';
import {GET_RATESET_PRICES} from '../../../api-calls/queries/misc';
import {useFieldArray, useForm} from 'react-hook-form';
import {useLazyQuery, useMutation, useQuery} from '@apollo/client';
import {GET_PROJECT_ITEM_NUMBERS} from '../../../api-calls/queries/items';
import {GET_SINGLE_PROJECT_HEADER} from '../../../api-calls/queries/projects';
import {ADD_BULK_ITEMS_TO_LOCATION, CALCULATE_ITEM_VALUE,} from '../../../api-calls/mutations/project-mutations';
import {useConfirm} from 'material-ui-confirm';
import {gridSelectionsVar} from '../../../cache';
import {useYupValidationResolver} from '../components/validation';
import SelectItemType from '../components/SelectItemType';
import SelectRateset from '../components/SelectRateset';
import {formatNumberTwoDecimals} from '../../../functions/formattingFunctions';
import AddIcon from '@mui/icons-material/Add';
import {projectItemSchema} from '../validation';
import {GET_SINGLE_LOCATION} from '../../../api-calls/queries/locations';

const AddItemsToLocationForm = ({hideModal}) => {
	const selectedProject = gridSelectionsVar().selectedOrder;
	const selectedLocation = gridSelectionsVar().selectedLocation[0];
	const [itemNumbers, setItemNumbers] = React.useState([]);
	const [existingItems, setExistingItems] = React.useState([]);
	const [activityCodes, setActivityCodes] = React.useState([]);
	const resolver = useYupValidationResolver(projectItemSchema);

	const addItemButtonRef = React.useRef();
	const confirm = useConfirm();

	const {loading: itemNumbersLoading} = useQuery(GET_PROJECT_ITEM_NUMBERS, {
		variables: {id: selectedProject.id},
		fetchPolicy: 'cache-and-network',
		onCompleted: (data) => {
			setItemNumbers(
				data.orderdetails.nodes.map((x) => parseFloat(x.itemNumber)),
			);
			setExistingItems(data.orderdetails.nodes.map((x) => x.id));
		},
	});

	const [getActivities, {loading: activitiesLoading}] = useLazyQuery(
		GET_RATESET_PRICES,
		{
			fetchPolicy: 'cache-and-network',
			onCompleted: (data) => {
				setActivityCodes(data.ratesetPrices.nodes);
			},
		},
	);

	const {
		handleSubmit,
		control,
		register,
		getValues,
		setValue,
		reset,
		setFocus,
		formState: {errors},
	} = useForm({
		mode: 'onSubmit',
		resolver: resolver,
		defaultValues: {
			item: [
				{
					qtyOrdered: '0.00',
					valueBaseMaterials: '0.00',
					packNumber: '',
					itemTypeId: '',
				},
			],
		},
	});

	const {fields, append, remove} = useFieldArray({
		control,
		name: 'item',
	});

	React.useEffect(() => {
		if (!itemNumbersLoading) setFocus('item[0].itemNumber');
	}, [setFocus, itemNumbersLoading]);

	const [createLocationItems] = useMutation(ADD_BULK_ITEMS_TO_LOCATION, {
		update: (cache, result) => {
			const updatedLocation =
				result.data.mnCreateOrderdetail.query.sitelocationWithValueById;
			const updatedProject =
				result.data.mnCreateOrderdetail.query.orderheaderWithValue;
			const locationData = cache.readQuery({
				query: GET_SINGLE_LOCATION,
				variables: {id: selectedLocation.id},
			});
			const projectData = cache.readQuery({
				query: GET_SINGLE_PROJECT_HEADER,
				variables: {id: selectedProject.id},
			});
			cache.writeQuery(
				{
					query: GET_SINGLE_LOCATION,
					variables: {id: selectedLocation.id},
					[locationData]: {
						sitelocationWithValue: updatedLocation,
					},
				},
				{
					query: GET_SINGLE_PROJECT_HEADER,
					variables: {id: selectedProject.id},
					[projectData]: {
						orderheaderWithValue: updatedProject,
					},
				},
			);
		},
	});

	const [calculateItemValue] = useMutation(CALCULATE_ITEM_VALUE);

	const onSubmit = (data) => {
		const {item} = data;
		const totalValue = item
			.map((x) => parseFloat(x.itemValue.replace(/,/g, '')))
			.reduce((tot, num) => tot + num);
		const submissionData = item.map((x) => ({
			itemNumber: x.itemNumber,
			itemTypeId: x.itemTypeId,
			orderheaderId: selectedProject.id,
			packNumber: x.packNumber,
			qtyOrdered: x.qtyOrdered,
			ratesetPriceId: x.ratesetPriceId,
			sitelocationId: selectedLocation.id,
			valueBaseMaterials: x.valueBaseMaterials,
		}));
		confirm({
			title: 'Confirm Data Submission',
			titleProps: {color: 'red', fontWeight: 'bold'},
			content: `Submission Contains ${
				item.length
			} Item(s) With A Value of ${totalValue.toLocaleString()}`,
			confirmationText: 'Submit',
			cancellationButtonProps: {color: 'secondary'},
			allowClose: false,
			contentProps: {fontWeight: 'bold'},
		})
			.then(() =>
				createLocationItems({
					variables: {
						input: submissionData,
						locationId: selectedLocation.id,
						orderheaderId: selectedProject.id,
					},
				}),
			)
			.then(() => {
				gridSelectionsVar({...gridSelectionsVar(), selectedLocation: false});
				hideModal();
			});
		console.log(data, item, totalValue);
	};

	if (errors) {
		console.log(errors);
	}

	const getValue = (index) => {
		const {item} = getValues();
		const data = item[index];
		console.log(data);
		calculateItemValue({
			variables: {
				priceId: data.ratesetPriceId,
				qtyOrdered: data.qtyOrdered,
				materialsValue: data.valueBaseMaterials,
				ratesetPriceId: '',
			},
		})
			.then((r) =>
				setValue(
					`item.${index}.itemValue`,
					formatNumberTwoDecimals(r.data.calculateItemValue.bigFloat),
				),
			)
			.then(addItemButtonRef.current.focus());
	};

	const handleAppendItem = () => {
		const {item} = getValues();
		const thisItemNumber = item[item.length - 1].itemNumber;
		append({itemNumber: Number(thisItemNumber) + 1});
	};
	if (itemNumbersLoading) return null;
	return (
		<>
			<DialogContent>
				<form>
					<Grid container columnSpacing={2} rowSpacing={3} columns={14}>
						{fields.map((field, index) => (
							<React.Fragment key={field.id}>
								<Grid item xs={1}>
									<TextField
										{...register(`item.${index}.itemNumber`)}
										label={'Item Number'}
										variant='filled'
										fullWidth
										size='small'
										defaultValue={
											itemNumbers.length === 0
												? 1
												: Number(Math.max(...itemNumbers)) + 1
										}
									/>
								</Grid>
								<Grid item xs={1}>
									<SelectItemType control={control} index={index}/>
								</Grid>
								<Grid item xs={1}>
									<TextField
										{...register(`item.${index}.qtyOrdered`)}
										label={'Qty Ordered'}
										variant='filled'
										fullWidth
										size='small'
									/>
								</Grid>
								<SelectRateset
									control={control}
									index={index}
									getActivities={getActivities}
									activitiesLoading={activitiesLoading}
									activityCodes={activityCodes}
								/>
								<Grid item xs={1}>
									<TextField
										{...register(`item.${index}.valueBaseMaterials`)}
										label={'Materials Base Value'}
										variant='filled'
										fullWidth
										size='small'
									/>
								</Grid>

								<Grid item xs={1}>
									<TextField
										{...register(`item.${index}.packNumber`)}
										label={'Pack Number'}
										variant='filled'
										fullWidth
										size='small'
									/>
								</Grid>
								<Grid item xs={1}>
									<Button
										sx={{height: '100%', borderRadius: 0, border: 1}}
										color='action'
										fullWidth
										onClick={() => getValue(index)}>
										get value
									</Button>
								</Grid>
								<Grid item xs={1}>
									<TextField
										InputProps={{
											readOnly: true,
										}}
										{...register(`item.${index}.itemValue`)}
										label={'Item Value'}
										variant='filled'
										fullWidth
										size='small'
										defaultValue={'0.00'}
									/>
								</Grid>

								<Grid item xs={1}>
									<Button
										sx={{height: '100%', borderRadius: 0, border: 1}}
										color='delete'
										fullWidth
										onClick={() => remove(index)}>
										remove
									</Button>
								</Grid>
							</React.Fragment>
						))}
					</Grid>
				</form>
			</DialogContent>
			<Divider/>
			<DialogActions>
				<Grid container p={2} spacing={2} columns={4}>
					<Grid item xs={1}>
						<Button
							fullWidth
							onClick={hideModal}
							color='secondary'
							sx={{borderRadius: 0, border: 1, height: '100%'}}>
							close
						</Button>
					</Grid>
					<Grid item xs={1}>
						<Button
							fullWidth
							color='cancel'
							onClick={() => reset()}
							sx={{borderRadius: 0, border: 1, height: '100%'}}>
							reset
						</Button>
					</Grid>
					<Grid item xs={1}>
						<Button
							ref={addItemButtonRef}
							sx={{height: '100%', borderRadius: 0, border: 1}}
							color='create'
							fullWidth
							startIcon={<AddIcon/>}
							onClick={handleAppendItem}>
							add another
						</Button>
					</Grid>
					<Grid item xs={1}>
						<Button
							fullWidth
							color='submit'
							onClick={handleSubmit(onSubmit)}
							sx={{borderRadius: 0, border: 1, height: '100%'}}>
							submit
						</Button>
					</Grid>
				</Grid>
			</DialogActions>
		</>
	);
};

export default AddItemsToLocationForm;
