import GameSquare from './IGameSquare'
import { Move } from '../logic/constants/Move'

export default interface IGameModel {
  setUpdateCallback(callback: () => void): void

  getMap(): GameSquare[][]
  move(move: Move): void

  undoMove(): void
  redoMove(): void
}
