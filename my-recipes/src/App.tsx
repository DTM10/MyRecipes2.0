import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import Home from './Pages/Home/Home';
import List from './Pages/List/List';
import { CgProfile, CgSearch, CgHeart, CgPlayButtonO } from 'react-icons/cg';
import { FaHeart } from 'react-icons/fa';

// import { FiSearch } from 'react-icons/fi';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" index element={<Home />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
