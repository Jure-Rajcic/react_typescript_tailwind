import GameFactory from './GameFactory'
import IGameModel from '../models/IGameModel'
import ILevelInfo from '../models/ILevelInfo'
import ILevelService from '../models/ILevelService'
import LocalServiceFactory from '../services/LevelServiceFactory'
import IGameSquare from './IGameSquare'
import Player from './game_objects/Player'
import { Move } from './constants/Move'
import PlayerMoveHandler from './handler/PlayerMoveHandler'
import Stack from 'ts-data.stack'
import Nothing from './game_objects/Nothing'

export default class GameModel implements IGameModel {
  // pass function to update map to constructor
  private updateCallback: () => void
  private readonly levelInfo: ILevelInfo
  private readonly map: IGameSquare[][]
  private readonly player: Player
  // private readonly targetSquares: IGameSquare[];

  constructor(levelId: string) {
    // setting up updateCallback
    this.updateCallback = () => {}

    // TODO get levelInfo from levelService

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

    this.player = this.map.reduce((player: Player, row: IGameSquare[], rowIndex: number) => {
      const playerIndex: number = row.findIndex((col) => col.occupant instanceof Player)
      if (playerIndex !== -1) {
        player.setIndexes([rowIndex, playerIndex])
        return player
      }
      return player
    }, new Player())
  }

  setUpdateCallback(callback: () => void): void {
    this.updateCallback = callback
  }

  getMap(): IGameSquare[][] {
    return this.map
  }

  // IMPLEMENT SOMETHING WITH PLAYER SERVICE to HAVE MULTIPLE PLAYERS
  move(move: Move): void {
    const pleyerHandler = new PlayerMoveHandler(this.map, move, this.player.getIndexes())
    if (!pleyerHandler.canMove()) return
    this.movePlayerToNextSquare(move)
    this.updateCallback()
  }

  private movePlayerToNextSquare(move: Move): void {
    // Update map
    const stack: Stack<[number, number]> = new Stack<[number, number]>()
    let [row, col]: [number, number] = this.player.getIndexes()

    // fill stack with objects from [Player, Nothing) (opend interval)
    while (!(this.map[row][col].occupant instanceof Nothing)) {
      stack.push([row, col])
      ;[row, col] = this.nextObjectCordinates(row, col, move)
    }

    // [row, col] point to the square with Nothing
    while (!stack.isEmpty()) {
      const square: IGameSquare = this.map[row][col]
      ;[row, col] = stack.peek()
      square.occupant = this.map[row][col].occupant
      ;[row, col] = stack.pop()
    }

    this.map[row][col].occupant = new Nothing()

    // Update player position
    ;[row, col] = this.nextObjectCordinates(row, col, move)
    this.player.setIndexes([row, col])
  }

  // REFACTOR TO SOME UTIL FUNCTION
  private nextObjectCordinates(row: number, col: number, move: Move): [number, number] {
    switch (move) {
      case Move.UP:
        return [row - 1, col]
      case Move.DOWN:
        return [row + 1, col]
      case Move.LEFT:
        return [row, col - 1]
      case Move.RIGHT:
        return [row, col + 1]
      default:
        throw new Error('Invalid move')
    }
  }
}
