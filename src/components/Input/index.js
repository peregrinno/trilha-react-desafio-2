import React from 'react'

function Input({value, onChange, onKeyPress, placeholder, darkMode}) {
  return (
    <div className="w-full max-w-md">
      <input 
        value={value} 
        onChange={onChange} 
        onKeyPress={onKeyPress}
        placeholder={placeholder || "Digite o nome do repositório"}
        className={`w-full p-3 border rounded-lg focus:outline-none ${
          darkMode 
            ? 'bg-github-dark-card text-github-dark-text border-github-dark-border placeholder-github-dark-secondary focus:border-github-dark-blue focus:ring-1 focus:ring-github-dark-blue' 
            : 'bg-white text-gray-800 border-gray-300 focus:border-github-blue focus:ring-1 focus:ring-github-blue'
        }`}
      />
    </div>
  )
}

export default Input