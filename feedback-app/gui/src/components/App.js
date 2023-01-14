import { BrowserRouter, Routes, Route } from "react-router-dom";
import ActivityForm from './ActivityForm'
import LoginForm from './LoginForm'
import Home from './Home'

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/activity" element={<ActivityForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
