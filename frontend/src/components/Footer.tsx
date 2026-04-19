import React from 'react'
import { FaGithub, FaEnvelope, FaShieldAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useDarkMode } from '../contexts/DarkModeContext'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()
  const { isDark } = useDarkMode()

  return (
    <footer className={`${isDark ? 'bg-gray-900/50 border-gray-800/50' : 'bg-gray-100/50 border-gray-200/50'} backdrop-blur-lg border-t`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <FaShieldAlt className={`text-2xl ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>TrustReview AI</span>
            </div>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
              Advanced AI-powered system for detecting fake product reviews using cutting-edge machine learning algorithms.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}
                aria-label="GitHub"
              >
                <FaGithub className="text-xl" />
              </a>
              <a
                href="mailto:contact@trustreview.ai"
                className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}
                aria-label="Email"
              >
                <FaEnvelope className="text-xl" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}>
                  Home
                </a>
              </li>
              <li>
                <a href="/analyzer" className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}>
                  Review Analyzer
                </a>
              </li>
              <li>
                <a href="/dashboard" className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}>
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/about" className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}>
                  About
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Contact</h3>
            <div className="space-y-2">
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <span className="font-medium">Email:</span> contact@trustreview.ai
              </p>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <span className="font-medium">Support:</span> support@trustreview.ai
              </p>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <span className="font-medium">Business:</span> business@trustreview.ai
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 pt-8 border-t border-gray-800/50"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
              © {currentYear} TrustReview AI. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}>
                Privacy Policy
              </a>
              <a href="#" className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}>
                Terms of Service
              </a>
              <a href="#" className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}>
                Cookie Policy
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
