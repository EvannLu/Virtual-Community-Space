import React from 'react'
import { useRoutes, Link } from 'react-router-dom'
import Locations from './pages/Locations'
import LocationEvents from './pages/LocationEvents'
import Events from './pages/Events'
import './App.css'

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <Locations />
    },
    /*
    why <LocationEvents id={#} /> instead of <LocationEvents index={#} />
    because the router does not pass props like index automatically. 
    We have to explicitly pass the location ID as a prop to the component.
    The id corresponds to the location's ID in the database.
    */
    {
      path: '/echolounge',
      element: <LocationEvents id={1} />
    },
    {
      path: '/houseofblues',
      element: <LocationEvents id={2} />
    },
    {
      path: '/pavilion',
      element: <LocationEvents id={3} />
    },
    {
      path: '/americanairlines',
      element: <LocationEvents id={4} />
    },
    {
      path: '/events',
      element: <Events />
    }
  ])

  return (
    <div className='app'>

      <header className='main-header'>
        <h1>UnityGrid Plaza</h1>

        <div className='header-buttons'>
          <Link to='/' role='button'>Home</Link>
          <Link to='/events' role='button'>Events</Link>
        </div>
      </header>

      <main>
        {element}
      </main>
    </div>
  )
}

export default App