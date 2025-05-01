import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ListTodo from './components/ListTodo'
import Header from './components/Header'

function App() {
  
  return (
    <div>
      <Header></Header>
    <ListTodo></ListTodo>
    </div>
  )
}

export default App
