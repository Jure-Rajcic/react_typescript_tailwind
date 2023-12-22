import { useParams } from 'react-router-dom'
import GameModel from '../logic/GameModel'
import IGameModel from '../models/IGameModel'
import LevelComponent from '../components/LevelComponent'
import React, { useEffect } from 'react'
import { Move } from '../logic/constants/Move'

export interface ILevelPageProps {}

const LevelPage: React.FunctionComponent<ILevelPageProps> = (props) => {
  const { number: levelId } = useParams()
  const gameModel: IGameModel = new GameModel(levelId as string)
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          gameModel.move(Move.UP)
          break
        case 'ArrowDown':
          gameModel.move(Move.DOWN)
          break
        case 'ArrowLeft':
          gameModel.move(Move.LEFT)
          break
        case 'ArrowRight':
          gameModel.move(Move.RIGHT)
          break
        case 'z':
          gameModel.undoMove()
          break
        case 'r':
          gameModel.redoMove()
          break
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  })
  return <LevelComponent {...{ gameModel }} />
}

export default LevelPage
