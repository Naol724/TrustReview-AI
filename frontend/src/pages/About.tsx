import React from 'react'
import { motion } from 'framer-motion'
import { FaBrain, FaShieldAlt, FaChartBar, FaCode, FaDatabase, FaRobot, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa'
import { useDarkMode } from '../contexts/DarkModeContext'

const About: React.FC = () => {
  const { isDark } = useDarkMode()

  const technologies = [
    {
      icon: FaBrain,
      name: 'Machine Learning',
      description: 'Advanced neural networks and NLP models trained on millions of reviews'
    },
    {
      icon: FaDatabase,
      name: 'Big Data Analytics',
      description: 'Processing and analyzing patterns from large-scale review datasets'
    },
    {
      icon: FaRobot,
      name: 'AI Automation',
      description: 'Automated detection algorithms with real-time processing capabilities'
    },
    {
      icon: FaCode,
      name: 'Modern Tech Stack',
      description: 'Built with React, TypeScript, and cutting-edge web technologies'
    }
  ]

  const features = [
    {
      icon: FaCheckCircle,
      title: 'Pattern Recognition',
      description: 'Identifies suspicious patterns in review language, timing, and sentiment'
    },
    {
      icon: FaShieldAlt,
      title: 'Multi-Layer Analysis',
      description: 'Combines multiple detection methods for comprehensive review validation'
    },
    {
      icon: FaChartBar,
      title: 'Statistical Validation',
      description: 'Uses statistical models to detect anomalies and outliers in review data'
    },
    {
      icon: FaExclamationTriangle,
      title: 'Risk Assessment',
      description: 'Provides confidence scores and risk levels for informed decision-making'
    }
  ]

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            About TrustReview AI
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Learn about our mission, technology, and how we're helping consumers make informed purchasing decisions.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card dark:card-dark mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Our Mission
              </h2>
              <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                In an era where online reviews heavily influence purchasing decisions, the prevalence of fake reviews has become a significant concern. TrustReview AI was founded with a clear mission: to empower consumers with accurate, AI-driven insights to distinguish authentic reviews from fraudulent ones.
              </p>
              <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                We believe that transparency and trust are fundamental to healthy e-commerce ecosystems. Our advanced machine learning models analyze millions of data points to identify patterns indicative of fake reviews, helping you shop with confidence.
              </p>
            </div>
            <div className={`text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <FaBrain className="text-6xl mx-auto mb-4 text-blue-600 dark:text-blue-400" />
              <p className="text-sm">
                Powered by cutting-edge artificial intelligence
              </p>
            </div>
          </div>
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className={`text-3xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            How Our AI Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Text Analysis',
                description: 'NLP models analyze review language, sentiment, and writing patterns'
              },
              {
                step: '2',
                title: 'Pattern Detection',
                description: 'Identifies suspicious patterns and anomalies in review behavior'
              },
              {
                step: '3',
                title: 'Context Evaluation',
                description: 'Considers product context, reviewer history, and timing factors'
              },
              {
                step: '4',
                title: 'Confidence Scoring',
                description: 'Generates confidence scores based on multiple validation factors'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full gradient-text font-bold text-2xl mb-4 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  {item.step}
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {item.title}
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technologies Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className={`text-3xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Technologies We Use
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {technologies.map((tech, index) => {
              const Icon = tech.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card dark:card-dark"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                      <Icon className="text-2xl text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {tech.name}
                      </h3>
                      <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {tech.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Dataset Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className={`card dark:card-dark mb-16 ${isDark ? 'bg-gradient-to-r from-blue-900/20 to-purple-900/20' : 'bg-gradient-to-r from-blue-50 to-purple-50'}`}
        >
          <div className="text-center">
            <FaDatabase className={`text-5xl mx-auto mb-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Training Dataset
            </h2>
            <p className={`text-lg mb-6 max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Our AI models are trained on a diverse dataset of over 10 million product reviews from various e-commerce platforms. This extensive training data includes both authentic reviews and known fake reviews, enabling our models to learn the subtle patterns that distinguish genuine feedback from fraudulent content.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">10M+</div>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Reviews Analyzed</p>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">500+</div>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Product Categories</p>
              </div>
              <div>
                <div className="text-3xl font-bold gradient-text mb-2">95%</div>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Accuracy Rate</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mb-16"
        >
          <h2 className={`text-3xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'} flex-shrink-0`}>
                    <Icon className="text-xl text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {feature.title}
                    </h3>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className={`text-center p-12 rounded-2xl ${isDark ? 'bg-gradient-to-r from-blue-900/50 to-purple-900/50' : 'bg-gradient-to-r from-blue-50 to-purple-50'}`}
        >
          <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Ready to Experience TrustReview AI?
          </h2>
          <p className={`text-lg mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Join thousands of users who trust our AI to help them make informed purchasing decisions.
          </p>
          <a
            href="/analyzer"
            className="btn-primary inline-flex items-center space-x-2 text-lg px-8 py-4"
          >
            <span>Try Our Analyzer</span>
          </a>
        </motion.div>
      </div>
    </div>
  )
}

export default About
