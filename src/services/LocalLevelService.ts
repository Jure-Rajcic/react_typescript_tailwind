import ILevelService from '../models/ILevelService'
import ILevelInfo from '../models/ILevelInfo'

export default class LocalLevelService implements ILevelService {
  private readonly _URL: string = 'http://localhost:3000/api/resources/1.json'
  private _levelsData: ILevelInfo[] = []

  public async initialize(): Promise<ILevelService> {
    await this._fetchData()
    return this
  }

  private async _fetchData(): Promise<void> {
    try {
      const response = await fetch(this._URL)
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const data: any = await response.json()
      const keys = Object.keys({} as ILevelInfo)
      const isValid = data.every((item: any) => keys.every((key) => key in item))
      if (!isValid) {
        throw new Error('Data is not of type ILevelInfo[]')
      }
      this._levelsData = data
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  public getTotalLevelsCount(): number {
    return this._levelsData.length
  }

  public getLevelInfo(id: number): ILevelInfo {
    return this._levelsData[id - 1]
  }
}
