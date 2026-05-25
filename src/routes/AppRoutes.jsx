import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Homes'
import AddFood from '../pages/AddFood'
import EditFood from '../pages/EditFood'
import Detail from '../pages/Detail'

function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/add' element={<AddFood />} />
      <Route path='/edit/:id' element={<EditFood />} />
      <Route path='/detail/:id' element={<Detail />} />
    </Routes>
  )
}

export default AppRoutes