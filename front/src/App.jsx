import VideoBackground from "./components/ui/VideoBackground.jsx" 
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<VideoBackground />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App