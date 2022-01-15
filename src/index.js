import React from 'react';
import ReactDOM from 'react-dom';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StoreProvider } from './store/Store';
import { initialState, modulesReducer } from './store/reducer';

const firebaseConfig = {
  apiKey: "AIzaSyDj73hZra6z0rr1f6oaSycmM1s4PvhACvc",
  authDomain: "pacemaker-d7960.firebaseapp.com",
  projectId: "pacemaker-d7960",
  storageBucket: "pacemaker-d7960.appspot.com",
  messagingSenderId: "471035000094",
  appId: "1:471035000094:web:4bf7a61a0970e37eaa050f",
  measurementId: "G-6KGJ4XRCE6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider initialState={initialState} reducer={modulesReducer}>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
