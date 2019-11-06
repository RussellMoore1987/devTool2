import React from 'react';
import GlobalState from "../context/GlobalState";
import Layout from "../components/Layout/Layout.jsx";
import './App.css';

function App() {
  return (
    <GlobalState>
      <Layout/>
    </GlobalState>
  );
}

export default App;
