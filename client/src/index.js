/** @format */

import { ApolloClient, ApolloLink, ApolloProvider } from '@apollo/client';
import { onError } from 'apollo-link-error';
import { createUploadLink } from 'apollo-upload-client';
import { ThemeProvider } from '@mui/material/styles';
import { DevSupport } from '@react-buddy/ide-toolbox';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import { LocalStorageWrapper, persistCache } from 'apollo3-cache-persist';
import { ConfirmProvider } from 'material-ui-confirm';
import React from 'react';
import { positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ReactDOM from 'react-dom/client';
import 'react-image-gallery/styles/css/image-gallery.css';
import { ModalProvider } from 'react-modal-hook';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { cache } from './cache';
import { ComponentPreviews, useInitial } from './dev';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { theme } from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));

const options = {
	timeout: 3000,
	position: positions.MIDDLE,
};

persistCache({
	cache,
	storage: new LocalStorageWrapper(window.localStorage),
});

export const client = new ApolloClient({
	link: ApolloLink.from([
		onError(({ graphQLErrors, networkError }) => {
			if (graphQLErrors)
				graphQLErrors.map(({ message, locations, path }) =>
					console.log(
						`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
					),
				);
			if (networkError) console.log(`[Network error]: ${networkError}`);
		}),
		createUploadLink({
			uri: `${process.env.REACT_APP_API_ENDPOINT}/graphql`,
		}),
	]),
	cache,
});

root.render(
	<React.StrictMode>
		<Router>
			<ApolloProvider client={client}>
				<ThemeProvider theme={theme}>
					<DevSupport
						ComponentPreviews={ComponentPreviews}
						useInitialHook={useInitial}
					>
						<ConfirmProvider
							defaultOptions={{
								confirmationButtonProps: { autoFocus: true },
							}}
						>
							<ModalProvider>
								<AlertProvider template={AlertTemplate} {...options}>
									<App />
								</AlertProvider>
							</ModalProvider>
						</ConfirmProvider>
					</DevSupport>
				</ThemeProvider>
			</ApolloProvider>
		</Router>
	</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
