import React from 'react'
import loader from './loader.gif'

const Loading =()=> {
    return (
      <div className='my-4 text-center'>
        <img src={loader} alt="loading" />
      </div>
    )
}

export default Loading
