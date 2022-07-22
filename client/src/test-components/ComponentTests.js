/** @format */

import React from 'react';
import ProjectWorkbook from '../components/projects/project-processing/workbooks/project-workbook/ProjectWorkbook';

const ComponentTests = () => {
	const componentRef = React.useRef();

	return (
		<div ref={componentRef}>
			<h1>COMPONENT TESTING</h1>

			<hr/>
			<ProjectWorkbook/>
		</div>
	);
};

export default ComponentTests;
