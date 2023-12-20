import IGameObject from '../../models/IGameObject'

export default class Player implements IGameObject {
  private row_index: number
  private col_index: number

  constructor() {
    this.row_index = 0
    this.col_index = 0
  }

  public setIndexes([row_index, col_index]: [number, number]): void {
    this.row_index = row_index
    this.col_index = col_index
  }

  public getIndexes(): [number, number] {
    return [this.row_index, this.col_index]
  }
}
