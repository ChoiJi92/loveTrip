import { Routes, Route, BrowserRouter } from 'react-router-dom'
import HotelList from '@pages/HotelList'
import Test from '@pages/Test'
import HotelPage from './pages/Hotel'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HotelList />} />
        <Route path="/hotel/:id" element={<HotelPage />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
