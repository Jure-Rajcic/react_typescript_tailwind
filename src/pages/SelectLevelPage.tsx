import React from 'react'
import './SelectLevelPage.css' // Import your CSS file
import { useNavigate } from 'react-router-dom'

import ILevelService from '../models/ILevelService'
import LocalServiceFactory from '../services/LevelServiceFactory'

export interface ISelectLevelPageProps {}

const SelectLevelPage: React.FC<ISelectLevelPageProps> = (props) => {
  const navigate = useNavigate()
  const levelService: ILevelService = LocalServiceFactory.getLevelService()
  console.log('total levels: ' + levelService.getTotalLevelsCount())
  const redirect = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number) => {
    console.log('redirecting to level ' + id)
    navigate(`/level/${id}`)
  }

  /// TODO refactor to GridTile component
  return (
    <div className='h-screen mar p-10 grid grid-cols-3 gap-4'>
      {Array.from(Array(levelService.getTotalLevelsCount()).keys()).map((level, index) => (
        <div
          key={index}
          className='bg-slate-600 hover:bg-slate-800'
          onClick={(_) => redirect(_, index + 1)}
        >
          <p className=' bg-cyan-400'>{level}</p>
        </div>
      ))}
    </div>
  )
}

export default SelectLevelPage
