import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserForm from './components/form'
import {Formik} from "formik"

function App() {
  return (
    <div className="App">
      <Formik><UserForm /></Formik>
    </div>
  );
}

export default App;
