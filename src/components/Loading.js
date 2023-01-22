import React, { Component } from 'react'
import loader from './loader.gif'

export class Loading extends Component {
  render() {
    return (
      <div className='my-4 text-center'>
        <img src={loader} alt="loading" />
      </div>
    )
  }
}

export default Loading
