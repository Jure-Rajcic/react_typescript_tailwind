import IGameSquare from './IGameSquare'
import EmptySquare from './game_squares/EmptySquare'
import Wall from './game_objects/Wall'
import Player from './game_objects/Player'
import Box from './game_objects/Box'
import Nothing from './game_objects/Nothing'
import TargetSquare from './game_squares/TargetSquare'

const WALL_ON_EMPTY_SQUERE: string = '#'
const PLAYER_ON_EMPTY_SQUERE: string = '@'
const BOX_ON_EMPTY_SQUERE: string = '$'
const NOTHING_ON_EMPTY_SQUERE: string = ' '

const WALL_ON_TARGET_SQUARE: string = '?' // TODO: make game more interesting
const PLAYER_ON_TARGET_SQUARE: string = '+'
const BOX_ON_TARGET_SQUARE: string = '*'
const NOTHING_ON_TARGET_SQUARE: string = '.'

export default class GameFactory {
  public static createLevel(map: string[][]): IGameSquare[][] {
    return map.map((row, rowIndex) =>
      row.map((col, colIndex) => {
        return this.createGameObject(col)
      }),
    )
  }

  private static createGameObject(id: string): IGameSquare {
    switch (id) {
      case WALL_ON_EMPTY_SQUERE:
        return new EmptySquare(new Wall())
      case PLAYER_ON_EMPTY_SQUERE:
        return new EmptySquare(new Player())
      case BOX_ON_EMPTY_SQUERE:
        return new EmptySquare(new Box())
      case NOTHING_ON_EMPTY_SQUERE:
        return new EmptySquare(new Nothing())
      case WALL_ON_TARGET_SQUARE:
        return new TargetSquare(new Wall())
      case PLAYER_ON_TARGET_SQUARE:
        return new TargetSquare(new Player())
      case BOX_ON_TARGET_SQUARE:
        return new TargetSquare(new Box())
      case NOTHING_ON_TARGET_SQUARE:
        return new TargetSquare(new Nothing())
      default:
        throw new Error(`Unknown game component identifier ${id}`)
    }
  }
}
