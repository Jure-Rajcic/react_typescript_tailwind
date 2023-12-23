import GameFactory from './GameFactory'
import IGameModel from '../models/IGameModel'
import LocalServiceFactory from '../services/LevelServiceFactory'
import GameSquare from '../models/IGameSquare'
import { Move } from './constants/Move'
import PlayerMoveValidator from './move/validators/PlayerMoveValidator'
import GameUtil from './GameUtil'
import CommandManeger from './move/MoveManeger'
import MoveCommand from './move/command/MoveCommand'

export default class GameModel implements IGameModel {
  private updateCallback: () => void
  private readonly map: GameSquare[][]
  private readonly moveManager: CommandManeger<MoveCommand>

  constructor(levelId: string) {
    this.updateCallback = () => {}

    console.log('levelId', levelId)
    const map: string[][] = LocalServiceFactory.getLevelService().getLevelLayout(parseInt(levelId))
    this.map = GameFactory.createLevel(map)

    this.moveManager = new CommandManeger()
  }

  public setUpdateCallback(callback: () => void): void {
    this.updateCallback = callback
  }

  public getMap(): GameSquare[][] {
    return this.map
  }

  public move(move: Move): void {
    // IMPLEMENT SOMETHING WITH PLAYER SERVICE to HAVE MULTIPLE PLAYERS

    const [row, col] = GameUtil.findPlayerCordinates(this.map)
    const validator = new PlayerMoveValidator(this.map, move, [row, col])
    if (!validator.canMove()) return

    const moveCommand: MoveCommand = new MoveCommand(this.map, validator.validPath)
    this.moveManager.executeCommand(moveCommand)

    this.updateCallback()

    // console.log(GameUtil.checkIfLevelIsCompleted(this.map))
  }

  public undoMove(): void {
    this.moveManager.undo()
    this.updateCallback()
  }

  public redoMove(): void {
    this.moveManager.redo()
    this.updateCallback()
  }
}
