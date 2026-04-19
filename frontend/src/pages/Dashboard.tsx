import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaChartBar, FaDownload, FaTrash, FaHistory, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa'
import { useDarkMode } from '../contexts/DarkModeContext'
import { getHistory, clearHistory, exportToCSV, HistoryItem } from '../services/api'
import toast from 'react-hot-toast'
import Charts from '../components/Charts'

const Dashboard: React.FC = () => {
  const { isDark } = useDarkMode()
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = () => {
    try {
      const historyData = getHistory()
      setHistory(historyData)
    } catch (error) {
      console.error('Error loading history:', error)
      toast.error('Failed to load history')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all history? This action cannot be undone.')) {
      try {
        clearHistory()
        setHistory([])
        toast.success('History cleared successfully')
      } catch (error) {
        console.error('Error clearing history:', error)
        toast.error('Failed to clear history')
      }
    }
  }

  const handleExportCSV = () => {
    try {
      const csvContent = exportToCSV()
      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `trustreview-history-${new Date().toISOString().split('T')[0]}.csv`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
      toast.success('History exported successfully')
    } catch (error) {
      console.error('Error exporting CSV:', error)
      toast.error('Failed to export history')
    }
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  if (isLoading) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className={`mt-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Loading dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
        >
          <div>
            <h1 className={`text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Analytics Dashboard
            </h1>
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Track your review analysis history and insights
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <button
              onClick={handleExportCSV}
              disabled={history.length === 0}
              className="btn-secondary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaDownload />
              <span>Export CSV</span>
            </button>
            <button
              onClick={handleClearHistory}
              disabled={history.length === 0}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaTrash />
              <span>Clear History</span>
            </button>
          </div>
        </motion.div>

        {/* Charts Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Charts history={history} />
        </motion.div>

        {/* Recent History */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold flex items-center space-x-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <FaHistory />
              <span>Recent Analysis History</span>
            </h2>
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {history.length} total reviews
            </span>
          </div>

          {history.length === 0 ? (
            <div className="card dark:card-dark text-center py-12">
              <FaHistory className={`text-5xl mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
              <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                No analysis history yet
              </h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
                Start analyzing reviews to see your history here
              </p>
              <a
                href="/analyzer"
                className="btn-primary inline-flex items-center space-x-2"
              >
                <span>Analyze Your First Review</span>
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {history.slice(0, 10).map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`card dark:card-dark ${
                    item.prediction === 'Fake' 
                      ? 'border-l-4 border-l-red-500' 
                      : 'border-l-4 border-l-green-500'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        {item.prediction === 'Fake' ? (
                          <FaExclamationTriangle className="text-red-500" />
                        ) : (
                          <FaCheckCircle className="text-green-500" />
                        )}
                        <span className={`font-semibold ${
                          item.prediction === 'Fake' 
                            ? 'text-red-600 dark:text-red-400' 
                            : 'text-green-600 dark:text-green-400'
                        }`}>
                          {item.prediction} Review
                        </span>
                        <span className={`text-sm px-2 py-1 rounded-full ${
                          item.confidence >= 80 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            : item.confidence >= 60
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                        }`}>
                          {item.confidence}% confidence
                        </span>
                      </div>
                      <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                        {truncateText(item.review, 200)}
                      </p>
                      <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                        {formatDate(item.timestamp)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {history.length > 10 && (
                <div className="text-center mt-6">
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Showing 10 of {history.length} reviews
                  </p>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard
