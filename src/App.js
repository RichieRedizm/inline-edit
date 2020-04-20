import React from 'react'
import './App.css'
import Text from './components/Content/Text'
import logo from './logo.svg'

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <Text />
      </header>
    </div>
  )
}

export default App
