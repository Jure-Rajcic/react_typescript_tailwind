import React from 'react'
import { useParams } from 'react-router-dom'

export interface IAboutPageProps {}

const LevelPage: React.FunctionComponent<IAboutPageProps> = (props) => {
  const { number: levelId } = useParams()

  return <p> This is level {levelId} </p>
}

export default LevelPage
