import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar'
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const apiHost = "http://192.168.0.101:5000" 
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <div className='container'>
            <Routes>
              <Route exact path='/' element={< Home />}></Route>
              <Route exact path='/about' element={< About />}></Route>
              <Route exact path='/login' element={< Login apiHost={apiHost}/>}></Route>
              <Route exact path='/signup' element={< Signup apiHost={apiHost}/>}></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
