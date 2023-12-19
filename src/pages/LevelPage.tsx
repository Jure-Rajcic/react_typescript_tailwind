import { useParams } from 'react-router-dom'
import GameModel from '../logic/GameModel'
import IGameModel from '../models/IGameModel'
import LevelComponent from '../components/LevelComponent'

export interface ILevelPageProps {}

const LevelPage: React.FunctionComponent<ILevelPageProps> = (props) => {
  const { number: levelId } = useParams()
  const gameModel: IGameModel = new GameModel(levelId as string)

  return <LevelComponent {...{ gameModel }} />
}

export default LevelPage
