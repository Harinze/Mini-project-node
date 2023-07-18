
import '../App.css'
import About from './About'
import Home from './Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './Signup'
import Login from './Login'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/signup" element ={<Signup/>}/> 
        <Route path="/login" element={<Login/>}/>
      </Routes>


    </BrowserRouter>
  )
}

export default App
