import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Component } from 'react'
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  pageSize = 15;
  api = process.env.REACT_APP_NEWS_API;
  state = {
    progress: 0
  }
  setProgress = (progress) => {
    this.setState({
      progress: progress
    })
  }
  render() {
    return (
      <Router>
        <LoadingBar
        height={2.3}
          color='#f11946'
          progress={this.state.progress}
        />
        <NavBar />
        <Routes>
          <Route exact path="/" element={<News setProgress={this.setProgress} key="general" pageSize={this.pageSize} api={this.api} country="in" category="general" />} />
          <Route exact path="/business" element={<News setProgress={this.setProgress} key="business" pageSize={this.pageSize} api={this.api} country="in" category="business" />} />
          <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} api={this.api} country="in" category="entertainment" />} />
          <Route exact path="/health" element={<News setProgress={this.setProgress} key="health" pageSize={this.pageSize} api={this.api} country="in" category="health" />} />
          <Route exact path="/science" element={<News setProgress={this.setProgress} key="science" pageSize={this.pageSize} api={this.api} country="in" category="science" />} />
          <Route exact path="/sports" element={<News setProgress={this.setProgress} key="sports" pageSize={this.pageSize} api={this.api} country="in" category="sports" />} />
          <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" pageSize={this.pageSize} api={this.api} country="in" category="technology" />} />
        </Routes>
      </Router>
    )
  }
}