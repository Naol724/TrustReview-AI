import React from 'react'
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { HistoryItem } from '../services/api'

interface ChartsProps {
  history: HistoryItem[]
}

const Charts: React.FC<ChartsProps> = ({ history }) => {
  // Pie Chart Data
  const fakeCount = history.filter(item => item.prediction === 'Fake').length
  const realCount = history.filter(item => item.prediction === 'Real').length
  
  const pieData = [
    { name: 'Fake Reviews', value: fakeCount, color: '#ef4444' },
    { name: 'Real Reviews', value: realCount, color: '#10b981' }
  ]

  // Bar Chart Data - Last 7 days
  const getLast7DaysData = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const today = new Date()
    const data = []

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dayName = days[date.getDay()]
      
      const dayHistory = history.filter(item => {
        const itemDate = new Date(item.timestamp)
        return itemDate.toDateString() === date.toDateString()
      })

      data.push({
        day: dayName,
        fake: dayHistory.filter(item => item.prediction === 'Fake').length,
        real: dayHistory.filter(item => item.prediction === 'Real').length
      })
    }

    return data
  }

  // Line Chart Data - Confidence Trend
  const getConfidenceTrend = () => {
    return history.slice(0, 20).reverse().map((item, index) => ({
      index: index + 1,
      confidence: item.confidence,
      prediction: item.prediction
    }))
  }

  const barData = getLast7DaysData()
  const lineData = getConfidenceTrend()

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const CustomLineTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Review #{label}</p>
          <p className="text-sm text-blue-600 dark:text-blue-400">
            Confidence: {payload[0].value}%
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Type: {payload[0].payload.prediction}
          </p>
        </div>
      )
    }
    return null
  }

  if (history.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 dark:text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No data available</h3>
        <p className="text-gray-600 dark:text-gray-400">Start analyzing reviews to see your statistics here.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Pie Chart - Fake vs Real Distribution */}
      <div className="card dark:card-dark">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Review Distribution
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart - Daily Analysis */}
      <div className="card dark:card-dark">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Last 7 Days Activity
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="day" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="fake" fill="#ef4444" name="Fake Reviews" />
            <Bar dataKey="real" fill="#10b981" name="Real Reviews" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart - Confidence Trend */}
      <div className="card dark:card-dark">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Confidence Trend (Last 20 Reviews)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="index" stroke="#9ca3af" label={{ value: 'Review #', position: 'insideBottom', offset: -5 }} />
            <YAxis stroke="#9ca3af" label={{ value: 'Confidence %', angle: -90, position: 'insideLeft' }} />
            <Tooltip content={<CustomLineTooltip />} />
            <Line 
              type="monotone" 
              dataKey="confidence" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={{ fill: '#3b82f6', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card dark:card-dark text-center">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            {history.length}
          </div>
          <div className="text-gray-600 dark:text-gray-400">Total Reviews</div>
        </div>
        <div className="card dark:card-dark text-center">
          <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
            {fakeCount}
          </div>
          <div className="text-gray-600 dark:text-gray-400">Fake Reviews</div>
        </div>
        <div className="card dark:card-dark text-center">
          <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
            {realCount}
          </div>
          <div className="text-gray-600 dark:text-gray-400">Real Reviews</div>
        </div>
      </div>
    </div>
  )
}

export default Charts
