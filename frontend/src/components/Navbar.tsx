import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaSun, FaMoon, FaShieldAlt, FaChartBar, FaHome, FaMicroscope, FaInfoCircle } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useDarkMode } from '../contexts/DarkModeContext'

const Navbar: React.FC = () => {
  const { isDark, toggleDarkMode } = useDarkMode()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '/', icon: FaHome },
    { name: 'Analyzer', href: '/analyzer', icon: FaMicroscope },
    { name: 'Dashboard', href: '/dashboard', icon: FaChartBar },
    { name: 'About', href: '/about', icon: FaInfoCircle },
  ]

  const isActivePath = (path: string) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-dark shadow-lg'
          : isDark
          ? 'bg-gray-900/80 backdrop-blur-sm'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 group"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FaShieldAlt className="text-2xl text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
            <span className="text-xl font-bold gradient-text">TrustReview AI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActivePath(item.href)
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className="text-lg" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
          </div>

          {/* Dark Mode Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <FaSun className="text-yellow-500 text-lg" />
              ) : (
                <FaMoon className="text-gray-700 text-lg" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              <div className="w-6 h-0.5 bg-gray-700 dark:bg-gray-300 mb-1.5"></div>
              <div className="w-6 h-0.5 bg-gray-700 dark:bg-gray-300 mb-1.5"></div>
              <div className="w-6 h-0.5 bg-gray-700 dark:bg-gray-300"></div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700"
          >
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                    isActivePath(item.href)
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className="text-lg" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

export default Navbar
