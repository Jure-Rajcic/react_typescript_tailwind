import IGameSquare from '../logic/IGameSquare'
import { Move } from '../logic/constants/Move'

export default interface IGameModel {
  setUpdateCallback(callback: () => void): void

  getMap(): IGameSquare[][]
  move(move: Move): void
}
