import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar'
import NoteState from './context/notes/NoteState';
import Auth from './components/Auth';
import Account from './components/Account';
import Footer from './components/Footer';
import Resetpassword from './components/Resetpassword';
import Verifyandresetpassword from './components/Verifyandresetpassword';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
              <Route exact path='/resetpassword' element={< Resetpassword />}></Route>
              <Route exact path='/verify' element={< Verifyandresetpassword apiHost={apiHost} />}></Route>
            </Routes>
          </div>
          <ToastContainer />
          <Footer />
        </Router>
      </NoteState>
    </>
  );
}

export default App;
