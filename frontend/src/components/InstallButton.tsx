import React, { useState, useEffect } from 'react'

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
  prompt(): Promise<void>
}

const InstallButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [showIOSInstructions, setShowIOSInstructions] = useState(false)

  useEffect(() => {
    // Check if app is already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || ('standalone' in navigator && (navigator as any).standalone)
    if (isStandalone) {
      return
    }

    // Detect iOS Safari
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
    if (isIOSDevice) {
      setIsIOS(true);
      setIsVisible(true);
      return;
    }

    // Check if event was captured globally before component mounted
    if (window.deferredPWAInstallPrompt) {
      setDeferredPrompt(window.deferredPWAInstallPrompt)
      setIsVisible(true)
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      window.deferredPWAInstallPrompt = e;
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setIsVisible(true)
    }

    const handleAppInstalled = () => {
      setIsVisible(false)
      setDeferredPrompt(null)
      setShowIOSInstructions(false)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSInstructions(true);
      return;
    }

    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      setIsVisible(false)
      window.deferredPWAInstallPrompt = null;
    }
    setDeferredPrompt(null)
  }

  if (!isVisible) return null

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[9999]">
        <button
          onClick={handleInstallClick}
          className="flex items-center gap-2 px-5 py-3 text-sm font-medium text-white bg-indigo-600/90 rounded-full shadow-xl hover:bg-indigo-700 hover:shadow-indigo-500/30 hover:-translate-y-1 transition-all duration-300 border border-indigo-500/40 backdrop-blur-md"
        >
          <svg 
            className="w-5 h-5 animate-bounce" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Install App
        </button>
      </div>

      {showIOSInstructions && (
        <div className="fixed inset-0 z-[10000] flex items-end justify-center sm:items-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-300" onClick={() => setShowIOSInstructions(false)}>
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-2xl max-w-sm w-full relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowIOSInstructions(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Install on iOS</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm leading-relaxed">
              To install TrustReview AI on your iOS device, follow these quick steps:
            </p>
            <ol className="space-y-3 text-sm text-slate-700 dark:text-slate-200 font-medium">
              <li className="flex items-center gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">1</span>
                <span>Tap the <strong>Share</strong> button at the bottom of Safari.</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">2</span>
                <span>Scroll down and tap <strong>"Add to Home Screen"</strong>.</span>
              </li>
            </ol>
            <button onClick={() => setShowIOSInstructions(false)} className="w-full mt-6 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-white rounded-xl transition-colors text-sm font-semibold">
              Got it!
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default InstallButton
