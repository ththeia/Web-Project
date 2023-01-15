import { BrowserRouter, Routes, Route } from "react-router-dom";
import ActivityForm from './ActivityForm'
import LoginForm from './LoginForm'
import Home from './Home'
import Menu from './Menu'
import Footer from './Footer'

function App () {

  return (
    <>
      <BrowserRouter>
        <Menu />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/activity" element={<ActivityForm />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
