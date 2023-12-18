import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import services
import LevelServiceFactory from './services/LevelServiceFactory'
// import pages for routing
import SelectLevelPage from './pages/SelectLevelPage'
import LevelPage from './pages/LevelPage'

export interface IApplicationProps {}

const Application: React.FunctionComponent<IApplicationProps> = (props) => {
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const initializeLevelService = async () => {
      try {
        await LevelServiceFactory.initializeLevelService()
        setIsInitialized(true)
      } catch (error) {
        console.error('Error initializing level service:', error)
      }
    }

    initializeLevelService()
  }, [])

  if (!isInitialized) {
    // You can render a loading state or return null while the service is being initialized
    return <p>Loading...</p>
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SelectLevelPage />} />
        <Route path='level'>
          <Route path=':number' element={<LevelPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Application
