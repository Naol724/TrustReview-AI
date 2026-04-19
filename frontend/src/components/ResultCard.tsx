import React from 'react'
import { motion } from 'framer-motion'
import { FaCheckCircle, FaExclamationTriangle, FaShieldAlt, FaBrain } from 'react-icons/fa'

interface ResultCardProps {
  prediction: 'Fake' | 'Real'
  confidence: number
  review: string
}

const ResultCard: React.FC<ResultCardProps> = ({ prediction, confidence, review }) => {
  const isFake = prediction === 'Fake'
  const confidenceColor = confidence >= 80 ? 'text-green-600' : confidence >= 60 ? 'text-yellow-600' : 'text-red-600'
  
  const getSuggestion = () => {
    if (isFake) {
      if (confidence >= 80) {
        return "This review shows strong indicators of being fake. Be cautious and look for verified purchases."
      } else if (confidence >= 60) {
        return "This review has some suspicious characteristics. Consider checking the reviewer's history."
      } else {
        return "This review might be fake, but the confidence is moderate. Verify with other sources."
      }
    } else {
      if (confidence >= 80) {
        return "This review appears to be authentic with high confidence."
      } else if (confidence >= 60) {
        return "This review seems genuine, though with moderate confidence."
      } else {
        return "This review is likely authentic, but confidence is lower. Additional verification recommended."
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className={`w-full max-w-2xl mx-auto ${
        isFake 
          ? 'bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-red-200 dark:border-red-800' 
          : 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800'
      } rounded-2xl shadow-xl border-2 p-8 backdrop-blur-lg`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          {isFake ? (
            <FaExclamationTriangle className="text-3xl text-red-600 dark:text-red-400" />
          ) : (
            <FaCheckCircle className="text-3xl text-green-600 dark:text-green-400" />
          )}
          <div>
            <h3 className={`text-2xl font-bold ${isFake ? 'text-red-700 dark:text-red-300' : 'text-green-700 dark:text-green-300'}`}>
              {prediction} Review
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              AI Analysis Result
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-3xl font-bold ${confidenceColor}`}>
            {confidence}%
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Confidence
          </p>
        </div>
      </div>

      {/* Review Text */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Analyzed Review:
        </h4>
        <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
            {review.length > 200 ? `${review.substring(0, 200)}...` : review}
          </p>
        </div>
      </div>

      {/* AI Suggestion */}
      <div className="bg-white/70 dark:bg-gray-800/70 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-start space-x-3">
          <FaBrain className="text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
              AI Suggestion:
            </h4>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {getSuggestion()}
            </p>
          </div>
        </div>
      </div>

      {/* Confidence Bar */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Confidence Level
          </span>
          <span className={`text-sm font-bold ${confidenceColor}`}>
            {confidence}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${confidence}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full rounded-full ${
              isFake 
                ? confidence >= 80 ? 'bg-red-600' : confidence >= 60 ? 'bg-orange-500' : 'bg-yellow-500'
                : confidence >= 80 ? 'bg-green-600' : confidence >= 60 ? 'bg-emerald-500' : 'bg-blue-500'
            }`}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <FaShieldAlt className="text-blue-600 dark:text-blue-400" />
          <span>Powered by TrustReview AI</span>
        </div>
      </div>
    </motion.div>
  )
}

export default ResultCard
