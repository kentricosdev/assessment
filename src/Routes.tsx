import { Routes, Route, Navigate } from 'react-router-dom'

import { HomeScreen, PersonalFormScreen } from './screens'


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<Navigate to="/" />} />
      <Route path="/" element={<HomeScreen />} />
      <Route path="/personalForm" element={<PersonalFormScreen />} />
    </Routes>
  )
}

export default AppRoutes