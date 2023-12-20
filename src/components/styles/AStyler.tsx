import IGameSquare from '../../logic/IGameSquare'
import Box from '../../logic/game_objects/Box'
import Nothing from '../../logic/game_objects/Nothing'
import Player from '../../logic/game_objects/Player'
import Wall from '../../logic/game_objects/Wall'
import TargetSquare from '../../logic/game_squares/TargetSquare'
import EmptySquare from '../../logic/game_squares/EmptySquare'
import { ReactElement } from 'react'
import IGameObject from '../../models/IGameObject'

export default abstract class AStyler {
  public render(square: IGameSquare): ReactElement {
    if (square instanceof EmptySquare) return this.renderEmptySquare(square.occupant)
    if (square instanceof TargetSquare) return this.renderTargetSquare(square.occupant)
    throw new Error('Unknown square type')
  }

  private renderEmptySquare(occupant: IGameObject): ReactElement {
    if (occupant instanceof Player) return this.renderPlayerOnEmptySquare()
    if (occupant instanceof Box) return this.renderBoxOnEmptySquare()
    if (occupant instanceof Wall) return this.renderWallOnEmptySquare()
    if (occupant instanceof Nothing) return this.renderNothingOnEmptySquare()
    throw new Error('Unknown game object type')
  }

  private renderTargetSquare(occupant: IGameObject): ReactElement {
    if (occupant instanceof Player) return this.renderPlayerOnTargetSquare()
    if (occupant instanceof Box) return this.renderBoxOnTargetSquare()
    if (occupant instanceof Wall) return this.renderWallOnTargetSquare()
    if (occupant instanceof Nothing) return this.renderNothingOnTargetSquare()
    throw new Error('Unknown game object type')
  }

  protected abstract renderPlayerOnEmptySquare(): ReactElement
  protected abstract renderBoxOnEmptySquare(): ReactElement
  protected abstract renderWallOnEmptySquare(): ReactElement
  protected abstract renderNothingOnEmptySquare(): ReactElement
  protected abstract renderPlayerOnTargetSquare(): ReactElement
  protected abstract renderBoxOnTargetSquare(): ReactElement
  protected abstract renderWallOnTargetSquare(): ReactElement
  protected abstract renderNothingOnTargetSquare(): ReactElement
}
