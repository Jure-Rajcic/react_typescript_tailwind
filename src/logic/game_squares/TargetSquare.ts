import IGameObject from '../../models/IGameObject'
import IGameSquare from '../IGameSquare'

export default class TargetSquare implements IGameSquare {
  occupant: IGameObject

  constructor(occupant: IGameObject) {
    this.occupant = occupant
  }
}
