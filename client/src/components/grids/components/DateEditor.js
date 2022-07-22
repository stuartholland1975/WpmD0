/** @format */

import {DateTime} from 'luxon';
import {forwardRef, useEffect, useImperativeHandle, useRef, useState,} from 'react';

export default forwardRef((props, ref) => {
	DateTime.now().toISODate();
	const inputRef = useRef();
	const [value, setValue] = useState(() => {
		if (props.lastRowDate) {
			return props.lastRowDate.data.date;
		} else return props.currentPeriod.weekEndingDate;
	});

	useEffect(() => {
		inputRef.current.focus();
		inputRef.current.select();
	}, []);

	function inputHandler(e) {
		setValue(e.target.value.toLocaleString());
	}

	useImperativeHandle(ref, () => {
		return {
			getValue() {
				return value;
			},
		};
	});

	return (
		<input
			type='date'
			className='ag-input-field-input ag-text-field-input'
			ref={inputRef}
			onChange={inputHandler}
			value={value}
		/>
	);
});
