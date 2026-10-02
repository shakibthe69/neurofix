import { MotionConfig } from 'framer-motion'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/globals.css'

const container = document.getElementById('root')
if (!container) throw new Error('Root element #root was not found in the document.')

createRoot(container).render(
  <StrictMode>
    {/*
      `reducedMotion="user"` makes every Framer Motion animation on the site
      automatically respect the visitor's operating-system preference:
      transform/opacity animations are skipped, state changes still apply.
    */}
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </StrictMode>,
)
