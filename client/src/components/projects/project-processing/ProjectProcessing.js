/** @format */
import {Outlet, useParams} from 'react-router-dom';
import ProjectProcessingButtons from './ProjectProcessingButtons';
import ProjectStats from './ProjectStats';

const ProjectProcessing = () => {
	const {id} = useParams();
	console.log(id);
	return (
		<div>
			<ProjectStats/>
			<hr/>
			<ProjectProcessingButtons/>
			<Outlet/>
		</div>
	);
};

export default ProjectProcessing;
