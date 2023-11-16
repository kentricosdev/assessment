import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { HomeScreen } from './screens'


const AppRoutes = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Navigate to="/" />} />
        <Route path="/" element={<HomeScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes