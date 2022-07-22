/** @format */

import {useApolloClient, useMutation} from '@apollo/client';
import {Box, Button, DialogActions, DialogContent, Divider, Grid, TextField,} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import {useFieldArray, useForm} from 'react-hook-form';
import {CREATE_BULK_LOCATIONS} from '../../../api-calls/mutations/project-mutations';
import {GET_PROJECT_LOCATIONS, READ_LOCATION_REFERENCES,} from '../../../api-calls/queries/locations';
import {gridSelectionsVar} from '../../../cache';
import * as yup from 'yup';
import {useYupValidationResolver} from '../components/validation';
import {GET_SINGLE_PROJECT_HEADER} from '../../../api-calls/queries/projects';

const CreateProjectLocationForm = ({hideModal}) => {
	const client = useApolloClient();
	const addLocationButtonRef = React.useRef();

	const selectedProject = gridSelectionsVar().selectedOrder;

	const {sitelocationWithValues} = client.readQuery({
		query: READ_LOCATION_REFERENCES,
		variables: {id: selectedProject.id},
	});

	const formSchema = {
		reference: yup.string().notOneOf(
			sitelocationWithValues.nodes.map((x) => x.reference),
			'Location Reference Already Exists!',
		),
	};

	const projectLocationSchema = yup.object().shape({
		location: yup.array().of(yup.object().shape(formSchema)),
	});

	const resolver = useYupValidationResolver(projectLocationSchema);

	const {
		watch,
		register,
		handleSubmit,
		reset,
		control,
		setFocus,
		formState: {errors},
	} = useForm({
		defaultValues: {location: [{reference: ''}]},
		mode: 'onTouched',
		resolver: resolver,
	});

	const {fields, append, remove} = useFieldArray({
		control,
		name: 'location',
	});

	const watchReference = watch();

	const [createProjectLocation] = useMutation(CREATE_BULK_LOCATIONS, {
		update: (cache, result) => {
			const locationData = cache.readQuery({
				query: GET_PROJECT_LOCATIONS,
				variables: {id: selectedProject.id},
			});

			const newLocations =
				result.data.sitelocationCreateBulkLocations.sitelocations.map(
					(item) => item.sitelocationWithValueById,
				);

			const updatedProject = result.data.sitelocationCreateBulkLocations.query;

			cache.writeQuery({
				query: GET_PROJECT_LOCATIONS,
				variables: {id: selectedProject.id},
				data: {
					sitelocationWithValues: {
						nodes: [
							...locationData.sitelocationWithValues.nodes,
							...newLocations,
						],
					},
				},
			});
			cache.writeQuery({
				query: GET_SINGLE_PROJECT_HEADER,
				variables: {id: selectedProject.id},
				data: updatedProject,
			});
		},
		onCompleted: () => {
			hideModal();
		},
	});

	const onSubmit = ({location}) => {
		const locationData = location.map((item) => ({
			reference: item.reference,
			orderheaderId: selectedProject.id,
		}));

		createProjectLocation({
			variables: {
				input: locationData,
				orderheaderId: selectedProject.id,
			},
		});
	};

	React.useEffect(() => setFocus('location[0].reference'), [setFocus]);

	return (
		<Box>
			<DialogContent>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Grid container spacing={2}>
						{fields.map((field, index) => (
							<React.Fragment key={field.id}>
								<Grid item xs={9}>
									<TextField
										{...register(`location.${index}.reference`)}
										label={'Location Reference'}
										variant='filled'
										fullWidth
										onBlur={() => addLocationButtonRef.current.focus()}
									/>
								</Grid>
								<Grid item xs={3}>
									<Button
										sx={{height: '100%', borderRadius: 0, border: 0}}
										color='delete'
										fullWidth
										onClick={() => remove(index)}>
										delete
									</Button>
								</Grid>
								<Grid item xs={12}>
									{errors[`location[${index}].reference`] && (
										<p style={{color: 'red', fontWeight: 'bold'}}>
											{errors[`location[${index}].reference`].message}
										</p>
									)}
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
							disabled={
								watchReference.location[watchReference.location.length - 1]
									.reference === ''
							}
							ref={addLocationButtonRef}
							sx={{height: '100%', borderRadius: 0, border: 1}}
							color='create'
							fullWidth
							startIcon={<AddIcon/>}
							onClick={() => append({reference: ''})}>
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
		</Box>
	);
};

export default CreateProjectLocationForm;
