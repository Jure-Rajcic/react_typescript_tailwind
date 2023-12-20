import Player from '../game_objects/Player'
import Wall from '../game_objects/Wall'
import Box from '../game_objects/Box'
import Nothing from '../game_objects/Nothing'
import MoveHandler from './MoveHandler'

export default class BoxMoveHandler extends MoveHandler {
  protected canMoveWall(wall: Wall): boolean {
    return false
  }
  protected canMoveBox(box: Box): boolean {
    return false
  }
  protected canMoveNothing(nothing: Nothing): boolean {
    return true
  }
  protected canMovePlayer(player: Player): boolean {
    return false
  }
}
