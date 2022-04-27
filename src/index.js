import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {ContextProvider} from "./context/Context"

ReactDOM.render(
  <React.StrictMode>
    {/* using context provider to get the user data */}
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
