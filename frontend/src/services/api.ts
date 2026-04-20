import axios from 'axios'

const API_BASE_URL = 'https://trustreview-ai-u53d.onrender.com/'

export interface PredictionRequest {
  review: string
}

export interface PredictionResponse {
  prediction: 'Fake' | 'Real'
  confidence: number
}

export interface HistoryItem {
  id: string
  review: string
  prediction: 'Fake' | 'Real'
  confidence: number
  timestamp: string
}

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const predictReview = async (review: string): Promise<PredictionResponse> => {
  try {
    console.log(' Making API call to:', API_BASE_URL + '/predict')
    console.log(' Review data:', { review: review.substring(0, 50) + '...' })
    
    const response = await api.post<PredictionResponse>('/predict', { review })
    console.log(' API Response:', response.data)
    return response.data
  } catch (error) {
    console.error(' API Error:', error)
    if (axios.isAxiosError(error)) {
      console.log(' Error details:', {
        code: error.code,
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
        url: API_BASE_URL + '/predict'
      })
      
      if (error.code === 'ECONNREFUSED') {
        throw new Error('Backend server is not running. Please start the backend with: cd backend && python app.py')
      }
      if (error.response?.status === 400) {
        const backendError = error.response.data?.error || 'Invalid request format'
        throw new Error(`Backend error: ${backendError}`)
      }
      if (error.response?.status === 500) {
        const backendError = error.response.data?.error || 'Internal server error'
        throw new Error(`Backend error: ${backendError}`)
      }
    }
    
    // Log the actual error for debugging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    throw new Error(`Analysis failed: ${errorMessage}`)
  }
}

export const getHistory = (): HistoryItem[] => {
  try {
    const history = localStorage.getItem('predictionHistory')
    return history ? JSON.parse(history) : []
  } catch (error) {
    console.error('Error reading history:', error)
    return []
  }
}

export const saveToHistory = (item: Omit<HistoryItem, 'id' | 'timestamp'>): void => {
  try {
    const history = getHistory()
    const newItem: HistoryItem = {
      ...item,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    }
    history.unshift(newItem)
    
    // Keep only last 100 items
    if (history.length > 100) {
      history.splice(100)
    }
    
    localStorage.setItem('predictionHistory', JSON.stringify(history))
  } catch (error) {
    console.error('Error saving to history:', error)
  }
}

export const clearHistory = (): void => {
  try {
    localStorage.removeItem('predictionHistory')
  } catch (error) {
    console.error('Error clearing history:', error)
  }
}

export const exportToCSV = (): string => {
  const history = getHistory()
  const headers = ['Date', 'Review', 'Prediction', 'Confidence']
  const rows = history.map(item => [
    new Date(item.timestamp).toLocaleString(),
    `"${item.review.replace(/"/g, '""')}"`,
    item.prediction,
    `${item.confidence}%`
  ])
  
  const csvContent = [headers, ...rows]
    .map(row => row.join(','))
    .join('\n')
  
  return csvContent
}
