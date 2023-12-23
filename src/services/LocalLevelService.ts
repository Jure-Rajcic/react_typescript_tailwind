import ILevelService from '../models/ILevelService'
interface LocalLevelDataFormat {
  Layout: string[]
}

export default class LocalLevelService implements ILevelService {
  private readonly url: string
  private readonly levels: LocalLevelDataFormat[]

  constructor() {
    this.url = 'http://localhost:3000/api/resources/1.json'
    this.levels = []
  }

  public async initialize(): Promise<ILevelService> {
    ;(await this._fetchData()).forEach((level) => this.levels.push(level))
    return this
  }

  private async _fetchData(): Promise<LocalLevelDataFormat[]> {
    try {
      const response = await fetch(this.url)
      const data: LocalLevelDataFormat[] = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching data:', error)
      throw error
    }
  }

  public getTotalLevelsCount(): number {
    return this.levels.length
  }

  public getLevelLayout(id: number): string[][] {
    console.log('levels', this.levels)
    const layout: string[] = this.levels[id - 1].Layout
    console.log('layout', layout)
    const map: string[][] = layout.map((row: string) => row.split(''))
    const width: number = map.reduce((max, row) => (row.length > max ? row.length : max), 0)
    map.forEach((row) => {
      while (row.length < width) row.push(' ')
    })
    return map
  }
}
