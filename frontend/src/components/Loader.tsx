import React from 'react'
import { motion } from 'framer-motion'
import { FaBrain, FaShieldAlt } from 'react-icons/fa'

interface LoaderProps {
  size?: 'small' | 'medium' | 'large'
  text?: string
}

const Loader: React.FC<LoaderProps> = ({ size = 'medium', text = 'Analyzing review...' }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  }

  const iconSize = {
    small: 'text-lg',
    medium: 'text-2xl',
    large: 'text-3xl'
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <div className="relative">
        <motion.div
          className={`${sizeClasses[size]} rounded-full border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 dark:border-t-blue-400 animate-spin`}
        />
        <motion.div
          className={`absolute inset-0 flex items-center justify-center ${iconSize[size]} text-blue-600 dark:text-blue-400`}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <FaBrain />
        </motion.div>
      </div>
      
      <motion.div
        className="text-center space-y-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-gray-600 dark:text-gray-400 font-medium">{text}</p>
        <div className="flex items-center justify-center space-x-2">
          <FaShieldAlt className="text-blue-600 dark:text-blue-400 text-sm" />
          <span className="text-xs text-gray-500 dark:text-gray-500">AI Analysis in Progress</span>
        </div>
      </motion.div>

      {/* Animated dots */}
      <div className="flex space-x-1">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default Loader
