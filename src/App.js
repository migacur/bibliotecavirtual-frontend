import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { Datos } from "./context/context-book";
import { Auth } from "./context/auth-context";
import { Usuarios } from "./context/user-context";
import { FavoriteBooks } from "./context/favorite-context";
import Login from "./componentes/Forms/Login";
import Home from "./componentes/HomeScreen/Home";
import Categorias from "./componentes/Books/Categoria";
import Registro from "./componentes/Forms/Registro";
import Ingresar from "./componentes/Forms/Ingresar";
import Cuenta from "./componentes/Profile/Cuenta";
import Favoritos from "./componentes/Profile/Favoritos";
import Agregar from "./componentes/Forms/Agregar";
import Editar from "./componentes/Forms/Editar";
import LibrosBuscados from "./componentes/Books/LibrosBuscados";
import FormPassword from "./componentes/Forms/FormPassword";
import RecoverPass from "./componentes/Forms/RecoverPass";
import ConfirmarPass from "./componentes/Forms/confirmarPass";
import NotFound from "./componentes/Others/NotFound";
import Header from "./componentes/Header/Header";
import Navbar from "./componentes/Navigation/Navbar";
import Footer from "./componentes/Footer/Footer";

function App() {
  return (
    <div className="container">
      <Header title="Biblioteca Virtual" />
      <Usuarios>
        <FavoriteBooks>
          <Auth>
            <Datos>
              <main className="contenido">
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/categoria/:nombre" element={<Categorias />} />
                  <Route path="/registro" element={<Registro />} />
                  <Route path="/ingresar" element={<Ingresar />} />
                  <Route path="/micuenta" element={<Cuenta />} />
                  <Route path="/favoritos" element={<Favoritos />} />
                  <Route path="/administrador" element={<Agregar />} />
                  <Route path="/editar-libro" element={<Editar />} />
                  <Route path="/busqueda" element={<LibrosBuscados />} />
                  <Route path="/form-password" element={<FormPassword />} />
                  <Route path="/recover-pass" element={<RecoverPass />} />
                  <Route
                    path="/confirmar-password"
                    element={<ConfirmarPass />}
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </Datos>
          </Auth>
        </FavoriteBooks>
      </Usuarios>
      <Footer />
    </div>
  );
}

export default App;
