import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Account from "./pages/Account"
import Orders from "./pages/Orders"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-account" element={<Account />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
