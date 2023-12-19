import GameComponentFactory from '../components/GameComponentFactory'
import IGameComponent from '../components/IGameComponent'
import IGameModel from '../models/IGameModel'
import ILevelInfo from '../models/ILevelInfo'
import ILevelService from '../models/ILevelService'
import LocalServiceFactory from '../services/LevelServiceFactory'

export default class GameModel implements IGameModel {
  // pass function to update map to constructor

  private readonly levelInfo: ILevelInfo
  private updateCallback: () => void
  private map: React.FC<IGameComponent>[][]

  constructor(levelId: string) {
    console.log('GameModel constructor called')
    // setting up levelInfo
    const levelService: ILevelService = LocalServiceFactory.getLevelService()
    this.levelInfo = levelService.getLevelInfo(parseInt(levelId))

    // setting up updateCallback
    this.updateCallback = () => {}

    // setting up map
    const map: string[][] = this.levelInfo.Layout.map((row: string) => row.split(''))
    const width: number = map.reduce((max, row) => (row.length > max ? row.length : max), 0)
    map.forEach((row) => {
      while (row.length < width) row.push(' ')
    })
    this.map = map.map((row: string[]) =>
      row.map((col: string) => GameComponentFactory.createGameComponent(col)),
    )
  }

  setUpdateCallback(callback: () => void): void {
    this.updateCallback = callback
  }

  getMap(): React.FC<IGameComponent>[][] {
    return this.map
  }

  moveUp(): void {
    console.log('Player moved up')
  }
  moveDown(): void {
    console.log('Player moved down')
  }
  moveLeft(): void {
    console.log('Player moved left')
  }
  moveRight(): void {
    console.log('Player moved right')
  }

  toString(): string {
    const newMap: string[][] = [
      ['$', '$', '$', '$'],
      ['$', '$', '$', '$'],
      ['$', '$', '$', '$'],
      ['$', '$', '$', '$'],
    ]
    const arr: string[] = ['#', ' ', '@', '$', '.']
    for (let i = 0; i < 4; i++) {
      const random: number = Math.floor(Math.random() * arr.length)
      newMap[i][i] = arr[random]
    }
    this.map = newMap.map((row: string[]) =>
      row.map((col: string) => GameComponentFactory.createGameComponent(col)),
    )

    this.updateCallback()
    return 'GameModel'
  }
}
