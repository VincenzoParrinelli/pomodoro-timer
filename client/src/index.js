import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Router';
import { Provider } from "react-redux"
import SettingsStore from "./Redux/SettingsStore"


ReactDOM.hydrate(
  <Provider store={SettingsStore}>
    <React.StrictMode>
      <Routes />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

