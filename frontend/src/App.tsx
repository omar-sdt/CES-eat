import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom"
import Home from "./pages/home"
import Profile from "./pages/profile"
import Orders from "./pages/orders"
import Login from "./pages/login"
import { AuthProvider, useAuth } from "./context/auth-context"
import { JSX, ReactNode } from "react"
import Navbar from "@/components/navbar"
import { CartProvider } from "./context/cart-context"
import { FilterProvider } from "./context/filter-context"
import Register from "./pages/register"
import Restaurant from "./pages/restaurant"
import Home_livreur from "./pages/Home_livreur"


function PrivateRoute({ element }: { element: JSX.Element }) {
  const { accessToken } = useAuth();

  // Si l'utilisateur n'est pas connecté, redirige vers la page de login
  return accessToken ? element : <Navigate to="/login" />;
}

function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();

  // Ajoute ici les routes où tu ne veux PAS afficher la Navbar
  const noNavbarRoutes = ["/home_livreur"];

  return (
    <>
      {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
      {children}
    </>
  );
}

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <FilterProvider>

              <Layout> {/* ← On utilise le composant Layout ici */}
                <Routes>
                  <Route path="*" element={<Navigate to="/home" />} />
                  <Route path="/" element={<Navigate to="/home" />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/orders" element={<PrivateRoute element={<Orders />} />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/restaurant/:id" element={<Restaurant />} />
                  <Route path="/home_livreur" element={<Home_livreur />} />

                  <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
                </Routes>
              </Layout>

            </FilterProvider>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App
