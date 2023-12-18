import ILevelInfo from './ILevelInfo'

export default interface ILevelService {
  initialize(): Promise<ILevelService>
  getLevelInfo(levelId: number): ILevelInfo
  getTotalLevelsCount(): number
}
