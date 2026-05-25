import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import NavBar from './components/NavBar'
import { FoodProvider } from './context/FoodContext'
import './App.css'

function App() {
  return (
    <FoodProvider>
      <BrowserRouter>
        <NavBar />
        <main style={{ flex: 1 }}>
          <AppRoutes />
        </main>
      </BrowserRouter>
    </FoodProvider>
  )
}

export default App