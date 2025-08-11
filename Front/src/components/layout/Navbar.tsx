"use client"

import { NavLink, useNavigate } from "react-router-dom"
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa"
import { useState } from "react"

export default function Navbar() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("userType")
    navigate("/login")
  }

  const linkBase = "rounded-md px-3 py-2 text-sm font-medium transition-colors"
  const activeLink = "text-white bg-gray-900 " + linkBase
  const inactiveLink = "text-gray-300 hover:bg-gray-700 hover:text-white " + linkBase

  return (
    <nav className="bg-gray-800 shadow-md sticky top-0 z-50 animate-slide-right">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-white font-extrabold text-xl tracking-tight">
                <span className="text-white">TEA</span> <span className="text-rose-400">Connect</span>
              </h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-2">
                <NavLink to="/dashboard" className={({ isActive }) => (isActive ? activeLink : inactiveLink)}>
                  Dashboard
                </NavLink>
                <NavLink to="/profissionais" className={({ isActive }) => (isActive ? activeLink : inactiveLink)}>
                  Profissionais
                </NavLink>
                <NavLink to="/consultas" className={({ isActive }) => (isActive ? activeLink : inactiveLink)}>
                  Consultas
                </NavLink>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="hidden md:flex items-center space-x-4">
            <FaUserCircle className="h-8 w-8 text-gray-300" />
            <button
              onClick={handleLogout}
              className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
            >
              Sair
            </button>
          </div>

          {/* Mobile button */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Abrir menu"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700 animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? activeLink : inactiveLink)}
              onClick={() => setOpen(false)}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/profissionais"
              className={({ isActive }) => (isActive ? activeLink : inactiveLink)}
              onClick={() => setOpen(false)}
            >
              Profissionais
            </NavLink>
            <NavLink
              to="/consultas"
              className={({ isActive }) => (isActive ? activeLink : inactiveLink)}
              onClick={() => setOpen(false)}
            >
              Consultas
            </NavLink>
            <div className="flex items-center justify-between px-3 py-2">
              <div className="flex items-center gap-2 text-gray-300">
                <FaUserCircle className="h-6 w-6" />
                <span className="text-sm">Minha Conta</span>
              </div>
              <button onClick={handleLogout} className="text-sm text-gray-200 hover:text-white">
                Sair
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
