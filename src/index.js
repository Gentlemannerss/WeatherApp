import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from "react-router-dom";
import TempContextProvider from "./context/TempContextProvider";
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
      <TempContextProvider>
            <App />
      </TempContextProvider>
  </Router>
);
