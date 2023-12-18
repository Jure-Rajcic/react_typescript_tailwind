import ILevelService from '../models/ILevelService'
import LocalLevelService from './LocalLevelService'

export default class LocalServiceFactory {
  private static levelService: ILevelService

  public static getLevelService(): ILevelService {
    if (!LocalServiceFactory.levelService) LocalServiceFactory.initializeLevelService()
    return LocalServiceFactory.levelService
  }

  public static async initializeLevelService(): Promise<void> {
    /// TODO based on some configuration file and reflection API
    const promise: Promise<ILevelService> = new LocalLevelService().initialize()
    LocalServiceFactory.levelService = await promise
  }
}
