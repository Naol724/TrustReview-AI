import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaMicroscope, FaEraser, FaPaste, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa'
import { useDarkMode } from '../contexts/DarkModeContext'
import { predictReview, saveToHistory } from '../services/api'
import toast from 'react-hot-toast'
import Loader from '../components/Loader'
import ResultCard from '../components/ResultCard'

const Analyzer: React.FC = () => {
  const { isDark } = useDarkMode()
  const [review, setReview] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<{
    prediction: 'Fake' | 'Real'
    confidence: number
  } | null>(null)

  const handleAnalyze = async () => {
    if (!review.trim()) {
      toast.error('Please enter a review to analyze')
      return
    }

    if (review.trim().length < 10) {
      toast.error('Review text is too short. Please provide at least 10 characters.')
      return
    }

    setIsAnalyzing(true)
    setResult(null)

    try {
      const response = await predictReview(review.trim())
      setResult(response)
      
      // Save to history
      saveToHistory({
        review: review.trim(),
        prediction: response.prediction,
        confidence: response.confidence
      })

      toast.success(`Analysis complete: ${response.prediction} review detected`)
    } catch (error) {
      console.error('Analysis error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to analyze review')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleClear = () => {
    setReview('')
    setResult(null)
    toast.success('Review cleared')
  }

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setReview(text)
      toast.success('Text pasted successfully')
    } catch (error) {
      toast.error('Failed to paste text from clipboard')
    }
  }

  const characterCount = review.length
  const maxCharacters = 5000
  const isOverLimit = characterCount > maxCharacters

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Review Analyzer
          </h1>
          <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Paste a product review and let our AI determine if it's authentic or fake
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card dark:card-dark"
          >
            <div className="mb-4">
              <label htmlFor="review" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Product Review Text
              </label>
              <div className="relative">
                <textarea
                  id="review"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Paste the product review you want to analyze here..."
                  className={`w-full h-48 p-4 rounded-lg border resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    isDark 
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  } ${isOverLimit ? 'border-red-500 focus:ring-red-500' : ''}`}
                  disabled={isAnalyzing}
                />
                
                {/* Action Buttons */}
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button
                    onClick={handlePaste}
                    disabled={isAnalyzing}
                    className={`p-2 rounded-lg transition-colors duration-200 ${
                      isDark 
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                    title="Paste from clipboard"
                  >
                    <FaPaste />
                  </button>
                  <button
                    onClick={handleClear}
                    disabled={isAnalyzing || !review}
                    className={`p-2 rounded-lg transition-colors duration-200 ${
                      isDark 
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                    title="Clear text"
                  >
                    <FaEraser />
                  </button>
                </div>
              </div>
              
              {/* Character Counter */}
              <div className={`flex justify-between items-center mt-2 text-sm ${
                isOverLimit ? 'text-red-500' : isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <span>{characterCount} / {maxCharacters} characters</span>
                {isOverLimit && (
                  <span className="flex items-center space-x-1">
                    <FaExclamationTriangle />
                    <span>Text exceeds limit</span>
                  </span>
                )}
              </div>
            </div>

            {/* Analyze Button */}
            <div className="flex justify-center">
              <button
                onClick={handleAnalyze}
                disabled={!review.trim() || isAnalyzing || isOverLimit}
                className="btn-primary flex items-center space-x-2 text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <FaMicroscope />
                <span>{isAnalyzing ? 'Analyzing...' : 'Analyze Review'}</span>
              </button>
            </div>
          </motion.div>

          {/* Loading State */}
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="card dark:card-dark"
            >
              <Loader size="large" text="AI is analyzing the review..." />
            </motion.div>
          )}

          {/* Result */}
          {result && !isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ResultCard
                prediction={result.prediction}
                confidence={result.confidence}
                review={review}
              />
            </motion.div>
          )}

          {/* Tips Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`rounded-lg p-6 ${isDark ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'} border`}
          >
            <h3 className={`text-lg font-semibold mb-4 flex items-center space-x-2 ${isDark ? 'text-blue-300' : 'text-blue-800'}`}>
              <FaCheckCircle />
              <span>Tips for Best Results</span>
            </h3>
            <ul className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">·</span>
                <span>Provide the complete review text, not just a snippet</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">·</span>
                <span>Include specific details mentioned in the review</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">·</span>
                <span>The more context provided, the more accurate the analysis</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">·</span>
                <span>Reviews with emotional language or unusual patterns are easier to detect</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Analyzer
