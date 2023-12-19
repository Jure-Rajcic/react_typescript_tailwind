import IGameModel from '../models/IGameModel'
import React, { useState, useCallback, useEffect } from 'react'

// Rest of your component code...

export interface ILevelComponentProps {
  gameModel: IGameModel
}

const LevelComponent: React.FunctionComponent<ILevelComponentProps> = (props) => {
  const [, updateState] = useState<number>(0)
  const forceUpdate = useCallback(() => updateState((prevState: number) => prevState + 1), [])

  useEffect(() => {
    const keyMapping: { [key: string]: () => void } = {
      ArrowUp: props.gameModel.moveUp,
      ArrowDown: props.gameModel.moveDown,
      ArrowLeft: props.gameModel.moveLeft,
      ArrowRight: props.gameModel.moveRight,
    }

    const handleKeyPress = (event: KeyboardEvent) => {
      if (keyMapping[event.key]) keyMapping[event.key]()
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  })

  // Register the forceUpdate callback with the gameModel
  props.gameModel.setUpdateCallback(forceUpdate)

  const map = props.gameModel.getMap()
  const width = map[0].length

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
                {map[rowIndex][colIndex]({})}
              </div>
            </div>
          )),
        )}
      </div>
    </div>
  )
}
export default LevelComponent
