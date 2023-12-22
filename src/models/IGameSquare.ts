import IGameObject from './IGameObject'
import Box from '../logic/game_objects/Box'
import Nothing from '../logic/game_objects/Nothing'
import Player from '../logic/game_objects/Player'
import Wall from '../logic/game_objects/Wall'

export default abstract class GameSquare {
  // Object that is currently on the square
  public row: number
  public col: number
  private occupant: IGameObject

  constructor([row, col]: [number, number], occupant: IGameObject) {
    this.row = row
    this.col = col
    this.occupant = occupant
  }

  public getOccupant(): IGameObject {
    return this.occupant
  }

  public setOccupant(occupant: IGameObject): void {
    this.occupant = occupant
    this.applySquareEffect()
  }

  private applySquareEffect(): void {
    if (this.occupant instanceof Player) return this.applyEffectToPlayer(this.occupant)
    if (this.occupant instanceof Box) return this.applyEffectToBox(this.occupant)
    if (this.occupant instanceof Wall) return this.applyEffectToWall(this.occupant)
    if (this.occupant instanceof Nothing) return this.applyEffectToNothing(this.occupant)
  }

  // ADAPTER, npr mozemo dodat nekakv trap tile ili teleportation tile da prominimo same objekte
  protected applyEffectToPlayer(player: Player): void {}
  protected applyEffectToBox(box: Box): void {}
  protected applyEffectToWall(wall: Wall): void {}
  protected applyEffectToNothing(nothing: Nothing): void {}
}
