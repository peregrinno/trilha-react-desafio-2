import React from 'react'

function ItemRepo({ repo, handleRemoveRepo, darkMode }) {
  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleRemoveRepo(repo.id);
  }

  return (
    <>
      <div className={`w-full border rounded-lg p-4 mb-4 flex flex-row items-start transition-all hover:translate-y-[-2px] hover:shadow-md ${darkMode
          ? 'dark:bg-github-dark-card dark:border-github-dark-border'
          : 'bg-white border-github-border'
        } sm:flex-col`}>
        <div className="mr-4 flex-shrink-0 sm:mr-0 sm:mb-4 sm:self-center">
          <img
            src={repo.owner.avatar_url}
            alt={`${repo.owner.login}'s avatar`}
            className={`w-20 h-20 rounded-full object-cover border-2 transition-all ${darkMode
                ? 'dark:border-github-dark-border hover:dark:border-github-dark-blue'
                : 'border-github-border hover:border-github-blue'
              }`}
          />
        </div>
        <div className="flex-1 flex flex-col">
          <h3 className={`text-lg font-semibold m-0 ${darkMode ? 'dark:text-github-dark-blue' : 'text-github-blue'
            }`}>
            {repo.name}
          </h3>
          <p className={`text-sm mt-1 mb-2 ${darkMode ? 'dark:text-github-dark-secondary' : 'text-github-gray'
            }`}>
            {repo.full_name}
          </p>
          <div className="flex flex-wrap gap-4 mb-2">
            <span className={`flex items-center text-sm ${darkMode ? 'dark:text-github-dark-secondary' : 'text-github-gray'
              }`}>
              ⭐ {repo.stargazers_count.toLocaleString()}
            </span>
            <span className={`flex items-center text-sm ${darkMode ? 'dark:text-github-dark-secondary' : 'text-github-gray'
              }`}>
              🍴 {repo.forks_count.toLocaleString()}
            </span>
            {repo.language && (
              <span className={`flex items-center text-sm ${darkMode ? 'dark:text-github-dark-secondary' : 'text-github-gray'
                }`}>
                🔠 {repo.language}
              </span>
            )}
          </div>
          {repo.description && (
            <p className={`my-2 text-sm leading-relaxed overflow-hidden text-ellipsis line-clamp-2 ${darkMode ? 'dark:text-github-dark-secondary' : 'text-github-gray'
              }`}>
              {repo.description}
            </p>
          )}
          <div className="flex gap-4 mt-3">
            <a
              href={repo.html_url}
              rel="noreferrer"
              target="_blank"
              className={`text-sm font-medium px-3 py-1.5 rounded-md transition-all no-underline ${darkMode
                  ? 'bg-github-dark-blue text-github-dark-text hover:bg-blue-600'
                  : 'bg-github-blue text-white hover:bg-github-darkBlue'
                }`}
            >
              Ver repositório
            </a>
            <button
              onClick={handleRemove}
              className={`text-sm font-medium px-3 py-1.5 rounded-md transition-all no-underline ${darkMode
                  ? 'bg-github-dark-card text-github-red border border-github-dark-border hover:text-github-darkRed'
                  : 'bg-white text-github-red border border-gray-200 hover:bg-github-lightGray hover:text-github-darkRed'
                }`}
              alt="Remove repository"
            >
              Remover
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ItemRepo;