/** @format */

import React from 'react';
import {cache, gridSelectionsInitialValue, gridSelectionsVar,} from '../../cache';
import WpmLogo from './WpmLogo';

const Home = () => {
	React.useEffect(() => {
		cache.gc();
		gridSelectionsVar(gridSelectionsInitialValue);
	}, []);

	return (
		<>
			<div style={{textAlign: 'center'}}>
				<WpmLogo/>
			</div>
			<h1 style={{textAlign: 'center', fontWeight: 'bolder'}}>
				WORK PACKAGE MANAGER
			</h1>
			<hr/>
			<br/>
			<h1 style={{textAlign: 'center', fontWeight: 'bolder'}}>
				GENERIC CONTRACT EDITION
			</h1>
			<br/>
			<hr/>
		</>
	);
};

export default Home;
