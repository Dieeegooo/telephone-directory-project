
import './App.css'
import { Route } from 'react-router'
import { Link } from 'react-router'
import { Routes } from 'react-router'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'

function App() {

  return (
    <>
      <nav>
        <Link to='/register'>Register</Link> | {" "}
        <Link to='/login'>Login</Link>
      </nav>
      <Routes>
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/' element={<Home/>} />
      </Routes>

    </> 
  )
}

export default App
