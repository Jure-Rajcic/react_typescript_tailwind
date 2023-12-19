import IGameComponent from '../components/IGameComponent'

export default interface IGameModel {
  setUpdateCallback(callback: () => void): void

  getMap(): React.FC<IGameComponent>[][]
  moveUp(): void
  moveDown(): void
  moveLeft(): void
  moveRight(): void
}
