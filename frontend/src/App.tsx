import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Account from "./pages/Account"
import Orders from "./pages/Orders"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} /> {/* Redirection de / vers /home */}
          <Route path="/home" element={<Home />} />
          <Route path="/my-account" element={<Account />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
