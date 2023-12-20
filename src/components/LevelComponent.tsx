import IGameModel from '../models/IGameModel'
import React, { useState, useCallback } from 'react'
import AStyler from './styles/AStyler'
import DefaultStyler from './styles/DefaultStyler'

export interface ILevelComponentProps {
  gameModel: IGameModel
}

const LevelComponent: React.FunctionComponent<ILevelComponentProps> = (props) => {
  const gameModel: IGameModel = props.gameModel

  // Register the forceUpdate callback with the gameModel
  const [, updateState] = useState<number>(0)
  const forceUpdate = useCallback(() => updateState((prevState: number) => prevState + 1), [])
  gameModel.setUpdateCallback(forceUpdate)

  const map = gameModel.getMap()
  const width = map[0].length
  const styler: AStyler = new DefaultStyler()

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
                {styler.render(map[rowIndex][colIndex])}
              </div>
            </div>
          )),
        )}
      </div>
    </div>
  )
}
export default LevelComponent
