import React from 'react'
import IGameComponent from './IGameComponent'

const Target: React.FC<IGameComponent> = (props) => {
  return (
    <div className={`w-full h-full bg-gray-800 flex justify-center items-center`}>
      <div className={`w-1/3 h-1/3 bg-yellow-600 rounded-full`}></div>
    </div>
  )
}

export default Target
