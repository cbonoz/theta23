import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

import App from './App';
import './index.css';
import { APP_NETWORK_CONFIG } from './constants';
import { DAppProvider } from '@usedapp/core';
import { BrowserRouter } from 'react-router-dom';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <DAppProvider config={APP_NETWORK_CONFIG}>
        <BrowserRouter>


            <Provider store={store}>
                <App />
            </Provider>

        </BrowserRouter>
    </DAppProvider>
);
