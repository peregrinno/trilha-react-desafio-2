import React from 'react'

function Button({onClick, darkMode}) {
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
        darkMode 
          ? 'bg-github-dark border text-github-dark-text hover:bg-blue-600 focus:ring-github-dark-blue' 
          : 'bg-github-blue text-white hover:bg-github-darkBlue focus:ring-github-blue'
      }`}
    >
      Buscar
    </button>
  )
}

export default Button