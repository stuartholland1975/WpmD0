/** @format */

import {createTheme} from '@mui/material/styles';

export const theme = createTheme({
	palette: {
		type: 'light',
		primary: {
			main: '#22415e',
		},
		secondary: {
			main: '#737373',
		},
		dataTable: {
			main: '#d5d5d5',
		},
		action: {
			main: '#45152d',
			// light: '#862d59',
			contrastText: '#fff',
		},
		create: {
			main: '#052e2e',
			light: '#015b5b',
			contrastText: '#fff',
		},
		update: {
			main: '#040E7C',
			light: '#404ABF',
			contrastText: '#fff',
		},
		delete: {
			main: '#730d1c',
			light: '#b8142d',
			dark: '#66000d',
			contrastText: '#fff',
		},
		navigation: {
			main: '#1B344B',
			light: '#366896',
			dark: '#0b3458',
			contrastText: '#fff',
		},
		cancel: {
			main: '#404040',
			contrastText: '#404040',
		},
		info: {
			main: '#404040',
		},
		contrasting: {
			main: '#fff',
		},
		submit: {
			main: '#006666',
			contrastText: '#fff',
		},
		print: {
			main: '#4b0055',
		},
		background: {
			default: '#f5f5f5',
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 10,
					fontWeight: 600,
					textTransform: 'uppercase',
					textDecorationLine: 'none',
					textAlign: 'center',
					padding: 2,
					border: '5px solid',
					'&:disabled': {
						cursor: 'not-allowed',
						backgroundColor: '#737373',
						color: '#b1b1b1',
					},
				},
			},
			defaultProps: {
				variant: 'contained',
				fullWidth: true,
			},
		},
		MuiTextField: {
			defaultProps: {
				variant: 'outlined',
				size: 'small',
			},
		},

		/* MuiDataGrid: {
            styleOverrides: {
                root: {
                     '& .MuiDataGrid-row:nth-of-type(odd)': {
                        backgroundColor: '#f2f2f2',
                    },
                    '& .MuiDataGrid-row:nth-of-type(even)': {
                        backgroundColor: '#e6e6e6',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        color: 'white',
                        backgroundColor: '#4e667e',
                    },
                },
            },
        }, */
	},
	props: {
		MuiList: {
			dense: true,
		},
		MuiMenuItem: {
			dense: true,
		},
		MuiTable: {
			size: 'small',
		},
		MuiAppBar: {
			color: 'inherit',
		},
	},

	typography: {
		fontFamily: 'Arial',
	},
});
