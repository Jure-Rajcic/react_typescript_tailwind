import React from 'react'

interface IGridTileProps {
  level: number
}

const GridTileComponent: React.FC<IGridTileProps> = (props) => {
  return (
    <div className='bg-slate-600 hover:bg-slate-800'>
      <p className=' bg-cyan-400'>{props.level}</p>
    </div>
  )
}
