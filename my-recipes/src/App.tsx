// import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import Home from './Pages/Home/Home';
import Layout from './Components/Layout/Layout';
import List from './Pages/List/List';
import Recipe from './Pages/Recipe/Recipe';
// import { CgProfile, CgSearch, CgHeart, CgPlayButtonO } from 'react-icons/cg';
// import { FaHeart } from 'react-icons/fa';

// import { FiSearch } from 'react-icons/fi';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="list" element={<List />} />
            <Route path="recipe" element={<Recipe />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
