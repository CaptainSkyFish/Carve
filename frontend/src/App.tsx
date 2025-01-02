import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import Signup from "./pages/SignUp"
import Signin from "./pages/SignIn"
import Blog from "./pages/Blog"
import Blogs from "./pages/Blogs"
import Background from "./UI/Background"
import "./App.css"
import { useEffect, useState } from "react"
import Appbar from "./components/Appbar"

function AppWrapper() {
  const location = useLocation()
  const [showBackground, setShowBackground] = useState(false)

  useEffect(() => {
    const hiddenBackgroundRoutes = ["/signup", "/signin"]
    setShowBackground(!hiddenBackgroundRoutes.includes(location.pathname))
  }, [location])

  return (
    <div>
        {showBackground && <Background />}
        <div className="relative border-2 border-x-[5px] md:border-x-[10px] border-slate-950">
            <Appbar />
        </div>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<Blog />} />
        </Routes>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  )
}
