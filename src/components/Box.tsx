import React from 'react'
import IGameComponent from './IGameComponent'

const Box: React.FC<IGameComponent> = (props) => {
  return (
    <div className={`w-full h-full bg-gray-800 flex justify-center items-center`}>
      <div className={`w-4/5 h-4/5 bg-yellow-600`}></div>
    </div>
  )
}

export default Box
