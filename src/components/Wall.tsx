import React from 'react'
import IGameComponent from './IGameComponent'

const Wall: React.FC<IGameComponent> = (props) => {
  return (
    <div className={`w-full h-full bg-gray-800`}>
      <div className={`w-full h-full bg-white`}></div>{' '}
    </div>
  )
}

export default Wall
