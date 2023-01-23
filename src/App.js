import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from 'react'
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';

const App =()=> {
  let pageSize = 15;
  let api = '38008cbaffa3460fa370c2eb9e42c6cf';
  const [progress, setProgress] = useState(0);
  
    return (
      <Router>
        <LoadingBar
        height={2.3}
          color='#f11946'
          progress={progress}
        />
        <NavBar />
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} key="general" pageSize={pageSize} api={api} country="in" category="general" />} />
          <Route exact path="/business" element={<News setProgress={setProgress} key="business" pageSize={pageSize} api={api} country="in" category="business" />} />
          <Route exact path="/entertainment" element={<News setProgress={setProgress} key="entertainment" pageSize={pageSize} api={api} country="in" category="entertainment" />} />
          <Route exact path="/health" element={<News setProgress={setProgress} key="health" pageSize={pageSize} api={api} country="in" category="health" />} />
          <Route exact path="/science" element={<News setProgress={setProgress} key="science" pageSize={pageSize} api={api} country="in" category="science" />} />
          <Route exact path="/sports" element={<News setProgress={setProgress} key="sports" pageSize={pageSize} api={api} country="in" category="sports" />} />
          <Route exact path="/technology" element={<News setProgress={setProgress} key="technology" pageSize={pageSize} api={api} country="in" category="technology" />} />
        </Routes>
      </Router>
    )
}

export default App;