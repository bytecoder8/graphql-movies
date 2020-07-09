import React from 'react'
import './App.css'
import Movies from './components/Movies'
import Directors from './components/Directors'
import Container from '@material-ui/core/Container'
import SimpleTabs from './components/Tabs/Tabs'


function App() {
  return (
    <Container maxWidth="md" className="App">
      <SimpleTabs labels={['Movies', 'Directors']}>
        <Movies />
        <Directors />
      </SimpleTabs>
    </Container>
  )
}

export default App
