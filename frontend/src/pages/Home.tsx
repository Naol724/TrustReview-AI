import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaShieldAlt, FaBrain, FaChartBar, FaMicroscope, FaCheckCircle, FaExclamationTriangle, FaArrowRight } from 'react-icons/fa'
import { useDarkMode } from '../contexts/DarkModeContext'

const Home: React.FC = () => {
  const { isDark } = useDarkMode()

  const features = [
    {
      icon: FaBrain,
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning algorithms analyze review patterns to detect fake content with high accuracy.',
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      icon: FaShieldAlt,
      title: 'Real-time Detection',
      description: 'Get instant results with confidence scores to help you make informed purchasing decisions.',
      color: 'text-green-600 dark:text-green-400'
    },
    {
      icon: FaChartBar,
      title: 'Analytics Dashboard',
      description: 'Track your review analysis history and gain insights from comprehensive statistics.',
      color: 'text-purple-600 dark:text-purple-400'
    }
  ]

  const stats = [
    { number: '95%', label: 'Accuracy Rate', description: 'Industry-leading detection accuracy' },
    { number: '< 2s', label: 'Analysis Time', description: 'Lightning-fast processing' },
    { number: '10K+', label: 'Reviews Analyzed', description: 'Trusted by thousands of users' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Gradient */}
        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'}`} />
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${isDark ? 'bg-white/5' : 'bg-blue-100/30'}`}
              style={{
                width: Math.random() * 300 + 100,
                height: Math.random() * 300 + 100,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="text-center">
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              <span className="gradient-text">TrustReview AI</span>
              <br />
              <span className={`text-3xl md:text-5xl ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>
                Fake Review Detection
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
            >
              Advanced AI-powered system to detect fake product reviews and help you make informed purchasing decisions with confidence.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                to="/analyzer"
                className="btn-primary flex items-center space-x-2 text-lg px-8 py-4"
              >
                <FaMicroscope />
                <span>Analyze Review</span>
                <FaArrowRight />
              </Link>
              <Link
                to="/dashboard"
                className="btn-secondary flex items-center space-x-2 text-lg px-8 py-4"
              >
                <FaChartBar />
                <span>Dashboard</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-900/50' : 'bg-white/50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Why Choose TrustReview AI?
            </h2>
            <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
              Our cutting-edge technology combines multiple AI approaches to provide the most accurate fake review detection available.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="card dark:card-dark text-center group"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${isDark ? 'bg-gray-800' : 'bg-gray-100'} mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`text-2xl ${feature.color}`} />
                  </div>
                  <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {feature.title}
                  </h3>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-800/50' : 'bg-blue-50/50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="text-5xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {stat.label}
                </div>
                <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-900/50' : 'bg-white/50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              How It Works
            </h2>
            <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
              Get started in three simple steps and protect yourself from fake reviews.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Paste Review', description: 'Copy and paste the product review you want to analyze' },
              { step: '2', title: 'AI Analysis', description: 'Our AI analyzes the text using advanced machine learning models' },
              { step: '3', title: 'Get Results', description: 'Receive instant feedback with confidence scores and recommendations' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative"
              >
                <div className="card dark:card-dark text-center">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full gradient-text font-bold text-xl mb-4 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    {item.step}
                  </div>
                  <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {item.title}
                  </h3>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {item.description}
                  </p>
                </div>
                {index < 2 && (
                  <div className={`hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                    <FaArrowRight className="text-2xl" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className={`py-20 ${isDark ? 'bg-gradient-to-r from-blue-900/50 to-purple-900/50' : 'bg-gradient-to-r from-blue-50 to-purple-50'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Ready to Spot Fake Reviews?
            </h2>
            <p className={`text-xl mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Join thousands of users who trust TrustReview AI to make informed purchasing decisions.
            </p>
            <Link
              to="/analyzer"
              className="btn-primary inline-flex items-center space-x-2 text-lg px-8 py-4"
            >
              <FaMicroscope />
              <span>Start Analyzing Now</span>
              <FaArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
