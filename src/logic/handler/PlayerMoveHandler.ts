import Player from '../game_objects/Player'
import Wall from '../game_objects/Wall'
import Box from '../game_objects/Box'
import Nothing from '../game_objects/Nothing'
import MoveHandler from './MoveHandler'
import BoxMoveHandler from './BoxMoveHandler'

export default class PlayerMoveHandler extends MoveHandler {
  protected canMoveWall(wall: Wall): boolean {
    return false
  }
  protected canMoveBox(box: Box): boolean {
    const [row, col]: [number, number] = this.nextObjectCordinates()
    const boxMoveHandler: MoveHandler = new BoxMoveHandler(this.map, this.move, [row, col])
    return boxMoveHandler.canMove()
  }
  protected canMoveNothing(nothing: Nothing): boolean {
    return true
  }
  protected canMovePlayer(player: Player): boolean {
    return false
  }
}
