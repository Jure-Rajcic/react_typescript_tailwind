import ILevelService from '../models/ILevelService'
import LocalLevelService from './LocalLevelService'

export default class LocalServiceFactory {
  // TODO napravit proxy oko ovoga da se mogu koristiti razliciti local servicevi za razlicite grupe
  // NPR te grupe mogu bit npr di imas samo smede kutije ili imas i plave kutije itd...
  private static levelService: ILevelService

  public static async initializeLevelService(): Promise<void> {
    const promise: Promise<ILevelService> = new LocalLevelService().initialize()
    LocalServiceFactory.levelService = await promise
  }

  public static getLevelService(): ILevelService {
    return LocalServiceFactory.levelService
  }
}
