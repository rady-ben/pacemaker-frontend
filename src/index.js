import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StoreProvider } from './store/Store';
import { initialState, modulesReducer } from './store/reducer';


ReactDOM.render(
  <React.StrictMode>
    <StoreProvider initialState={initialState} reducer={modulesReducer}>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
