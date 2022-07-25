/** @format */

import React from 'react';
import TransferList from "../components/forms/components/TransferList";

const ComponentTests = () => {
	const componentRef = React.useRef();

	return (
		<div ref={componentRef}>
			<h1>COMPONENT TESTING</h1>

			<hr/>
			<TransferList/>
		</div>
	);
};

export default ComponentTests;
