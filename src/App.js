import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar'
import NoteState from './context/notes/NoteState';
import Auth from './components/Auth';
import Account from './components/Account';
import Footer from './components/Footer';

function App() {
  const apiHost = "http://localhost:5000"
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <div className='container'>
            <Routes>
              <Route exact path='/' element={< Home />}></Route>
              <Route exact path='/about' element={< About />}></Route>
              <Route exact path='/auth' element={< Auth apiHost={apiHost} />}></Route>
              <Route exact path='/account' element={< Account />}></Route>
            </Routes>
          </div>
          <Footer/>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
