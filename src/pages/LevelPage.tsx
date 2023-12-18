import React from 'react'
import { useParams } from 'react-router-dom'
import ILevelService from '../models/ILevelService'
import LocalServiceFactory from '../services/LevelServiceFactory'
import ILevelInfo from '../models/ILevelInfo'
import GameComponentFactory from '../components/GameComponentFactory'

export interface IAboutPageProps {}

const LevelPage: React.FunctionComponent<IAboutPageProps> = (props) => {
  // fetch level specific information from level service
  const { number: levelId } = useParams()
  const levelService: ILevelService = LocalServiceFactory.getLevelService()
  const levelInfo: ILevelInfo = levelService.getLevelInfo(parseInt(levelId as string))

  // create map from level information
  const map: string[][] = levelInfo.Layout.map((row) => row.split(''))
  let width: number = map.reduce((max, row) => (row.length > max ? row.length : max), 0)
  map.forEach((row) => {
    while (row.length < width) row.push(' ')
  })

  // create game components from map
  return (
    <div className={`w-screen h-screen flex justify-center items-center `}>
      <div
        className={'grid gap-1 border-solid border-2 border-black bg-black'}
        style={{ gridTemplateColumns: `repeat(${width}, 1fr)` }}
      >
        {map.map((row, rowIndex) =>
          row.map((col, colIndex) => (
            <div key={`${rowIndex}-${colIndex}`} className={`bg-green`}>
              <div className='w-10 h-10 flex justify-center items-center'>
                {GameComponentFactory.createGameComponent(col)({})}
              </div>
            </div>
          )),
        )}
      </div>
    </div>
  )
}
export default LevelPage
