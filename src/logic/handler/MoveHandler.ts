import IGameObject from '../../models/IGameObject'
import IGameSquare from '../IGameSquare'
import Player from '../game_objects/Player'
import Wall from '../game_objects/Wall'
import Box from '../game_objects/Box'
import Nothing from '../game_objects/Nothing'
import { Move } from '../constants/Move'
export default abstract class MoveHandler {
  protected readonly map: IGameSquare[][]
  protected readonly move: Move
  protected readonly row_index: number
  protected readonly col_index: number

  constructor(map: IGameSquare[][], direction: Move, [rowIndex, colIndex]: [number, number]) {
    this.map = map
    this.move = direction
    this.row_index = rowIndex
    this.col_index = colIndex
  }

  public canMove(): boolean {
    const [row, col]: [number, number] = this.nextObjectCordinates()
    const objectInWay: IGameObject = this.map[row][col].occupant
    if (objectInWay instanceof Wall) return this.canMoveWall(objectInWay)
    if (objectInWay instanceof Box) return this.canMoveBox(objectInWay)
    if (objectInWay instanceof Nothing) return this.canMoveNothing(objectInWay)
    if (objectInWay instanceof Player) return this.canMovePlayer(objectInWay)
    throw new Error(`Unknown game object to push ${objectInWay}`)
  }

  protected nextObjectCordinates(): [number, number] {
    switch (this.move) {
      case Move.UP:
        return [this.row_index - 1, this.col_index]
      case Move.DOWN:
        return [this.row_index + 1, this.col_index]
      case Move.LEFT:
        return [this.row_index, this.col_index - 1]
      case Move.RIGHT:
        return [this.row_index, this.col_index + 1]
    }
  }

  protected abstract canMoveWall(wall: Wall): boolean
  protected abstract canMoveBox(box: Box): boolean
  protected abstract canMoveNothing(nothing: Nothing): boolean
  protected abstract canMovePlayer(player: Player): boolean
}
