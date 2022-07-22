/** @format */
import ProjectItemsGrid from '../../../grids/grids/ProjectItemsGrid';
import ProjectItemsButtons from './ProjectItemsButtons';

const ProjectItems = () => {
	return (
		<div>
			<ProjectItemsButtons/>
			<hr/>
			<div className='grid-title'>Project Items List</div>
			<ProjectItemsGrid/>
		</div>
	);
};

export default ProjectItems;
