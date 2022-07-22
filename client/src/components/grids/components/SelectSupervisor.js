/** @format */

import React from 'react';

export default React.forwardRef((props, ref) => {
	const prevSupervisor = props.lastRowSupervisor
		? props.lastRowSupervisor.data.supervisor
		: props.options[0].displayName;
	const [value, setValue] = React.useState(prevSupervisor);
	const options = props.options.map((x) => x.displayName);

	const onChangeHandler = (e) => {
		setValue(e.target.value);
	};

	React.useImperativeHandle(ref, () => {
		return {
			getValue() {
				return value;
			},
		};
	});

	return (
		<select
			style={{height: '100%', width: '100%'}}
			name='supervisor'
			id='supervisor'
			autoFocus
			onChange={onChangeHandler}
			defaultValue={prevSupervisor}>
			{options.map((x) => (
				<option key={x} value={x}>
					{x}
				</option>
			))}
		</select>
	);
});
