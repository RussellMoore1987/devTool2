import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// components
import GlobalState from "../context/GlobalState";
import Layout from "../components/Layout/Layout.jsx";
// main or global CSS
import './App.css';
import './App.animations.css';

function App() {
  return (
    <GlobalState>
      <BrowserRouter>
        <Layout/>
      </BrowserRouter>
    </GlobalState>
  );
}

export default App;
