import React from 'react';
// components
import GlobalState from "../context/GlobalState";
import Layout from "../components/Layout/Layout.jsx";
// main or global CSS
import './App.css';
import './App.animations.css';

function App() {
  return (
    <GlobalState>
      <Layout/>
    </GlobalState>
  );
}

export default App;
