import React from 'react'
import IGameComponent from './IGameComponent'

const Player: React.FC<IGameComponent> = (props) => {
  return (
    <div className={`w-full h-full bg-gray-800 di `}>
      <div className={`w-full h-full bg-blue-600`}></div>
    </div>
  )
}

export default Player
