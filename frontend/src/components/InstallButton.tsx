import React, { useState, useEffect } from 'react'

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
  prompt(): Promise<void>
}

declare global {
  interface WindowEventMap {
    'beforeinstallprompt': BeforeInstallPromptEvent
  }
}

const InstallButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault()
      console.log('beforeinstallprompt event fired')
      setDeferredPrompt(e)
      setIsVisible(true)
    }

    const handleAppInstalled = () => {
      console.log('appinstalled event fired')
      setIsInstalled(true)
      setIsVisible(false)
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
    }

    // Check if iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent)
    setIsIOS(isIOSDevice)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    console.log('Install button clicked', { isIOS, hasDeferredPrompt: !!deferredPrompt })
    
    if (isIOS) {
      handleIOSInstall()
      return
    }

    if (!deferredPrompt) {
      console.log('No deferred prompt available')
      return
    }

    console.log('Showing install prompt')
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    console.log('Install prompt outcome:', outcome)
    setDeferredPrompt(null)
    setIsVisible(false)

    if (outcome === 'accepted') {
      setIsInstalled(true)
    }
  }

  const handleIOSInstall = () => {
    alert('To install TrustReview AI:\n\n1. Tap the Share button in Safari\n2. Scroll down and tap "Add to Home Screen"\n3. Tap "Add" to confirm')
  }

  if (isInstalled) return null

  if (isIOS) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={handleIOSInstall}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3-3a1 1 0 011-1h6a1 1 0 110 2H6a1 1 0 01-1-1zm0-4a1 1 0 011-1h6a1 1 0 110 2H6a1 1 0 01-1-1zm-2-4a1 1 0 00-1 1v4a1 1 0 001 1h10a1 1 0 001-1V6a1 1 0 00-1-1H4z"/>
          </svg>
          <span>Add to Home Screen</span>
        </button>
      </div>
    )
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={handleInstallClick}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 flex items-center space-x-2"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3-3a1 1 0 011-1h6a1 1 0 110 2H6a1 1 0 01-1-1zm0-4a1 1 0 011-1h6a1 1 0 110 2H6a1 1 0 01-1-1zm-2-4a1 1 0 00-1 1v4a1 1 0 001 1h10a1 1 0 001-1V6a1 1 0 00-1-1H4z"/>
        </svg>
        <span>Install TrustReview AI</span>
      </button>
    </div>
  )
}

export default InstallButton
