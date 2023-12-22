import GameFactory from './GameFactory'
import IGameModel from '../models/IGameModel'
import ILevelInfo from '../models/ILevelInfo'
import ILevelService from '../models/ILevelService'
import LocalServiceFactory from '../services/LevelServiceFactory'
import GameSquare from '../models/IGameSquare'
import { Move } from './constants/Move'
import PlayerMoveValidator from './move/validators/PlayerMoveValidator'
import GameUtil from './GameUtil'
import CommandManeger from './move/MoveManeger'
import MoveCommand from './move/command/MoveCommand'

export default class GameModel implements IGameModel {
  // pass function to update map to constructor
  private updateCallback: () => void
  private readonly levelInfo: ILevelInfo
  private readonly map: GameSquare[][]
  private readonly moveManager: CommandManeger<MoveCommand>

  constructor(levelId: string) {
    // setting up updateCallback
    this.updateCallback = () => {}

    // setting up levelInfo
    const levelService: ILevelService = LocalServiceFactory.getLevelService()
    this.levelInfo = levelService.getLevelInfo(parseInt(levelId))

    // TODO addapt different levelInfo.Layouts to something with what gameFactory can work with
    const map: string[][] = this.levelInfo.Layout.map((row: string) => row.split(''))
    const width: number = map.reduce((max, row) => (row.length > max ? row.length : max), 0)
    map.forEach((row) => {
      while (row.length < width) row.push(' ')
    })
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
