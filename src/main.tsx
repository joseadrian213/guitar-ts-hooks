import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import './index.css'
//Assetion not null non null assertion operaor es el operadorcon el que le indicamos a typescript que elemento que estamos pando no sera nuio ! 
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
