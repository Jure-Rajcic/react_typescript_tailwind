export default interface ILevelService {
  initialize(): Promise<ILevelService>
  getLevelLayout(levelId: number): string[][]
  getTotalLevelsCount(): number
}
