import React from 'react'
import IGameComponent from './IGameComponent'

const Tile: React.FC<IGameComponent> = (props) => {
  return <div className={`w-full h-full bg-gray-800`}></div>
}

export default Tile
