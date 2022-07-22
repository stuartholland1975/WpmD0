/** @format */

import React from 'react';
import {useAlert} from 'react-alert';
import {numberOnly} from '../../../functions/formattingFunctions';

export default React.forwardRef((props, ref) => {
	const [value, setValue] = React.useState(props.data.qtyOs);
	const inputRef = React.useRef();
	const alert = useAlert();

	const onChangeHandler = React.useCallback(
		(event) => {
			if (Number(event.target.value) > Number(props.data.qtyOs)) {
				alert.error('Qty Done Cannot Exceed Qty Outstanding', {
					position: 'middle',
					onClose: () => {
						inputRef.current.select();
					},
				});
			} else {
				setValue(event.target.value);
			}
		},
		[props.data.qtyOs, alert],
	);

	const onKeyPressListener = React.useCallback((event) => {
		if (!numberOnly(event.nativeEvent)) {
			event.preventDefault();
		}
	}, []);

	React.useEffect(() => {
		props.cellStartedEdit && inputRef.current.focus();
		props.cellStartedEdit && inputRef.current.select();
	}, [props.cellStartedEdit]);

	React.useImperativeHandle(ref, () => {
		return {
			getValue() {
				return value;
			},
		};
	});

	return (
		<input
			className='ag-input-field-input ag-text-field-input'
			ref={inputRef}
			value={value}
			onChange={onChangeHandler}
			style={{height: '100%'}}
			onKeyPress={onKeyPressListener}
		/>
	);
});
