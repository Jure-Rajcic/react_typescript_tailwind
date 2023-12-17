import React from 'react'
import { Outlet } from 'react-router-dom'

export interface ILayoutComponentProps {}

const LayoutComponent: React.FunctionComponent<ILayoutComponentProps> = (props) => {
  return (
    <div className='border-2 p-2 border-black bg-cyan-900 border-dashed m-5 w-500 h-500'>
      <Outlet />
    </div>
  )
}

export default LayoutComponent
