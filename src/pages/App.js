import { useState } from 'react';
import gitLogoDark from '../assets/github.png'
import gitLogoLight from '../assets/github_light.png'
import Input from '../components/Input';
import Button from '../components/Button';
import ItemRepo from '../components/ItemRepo';
import { api } from '../services/api';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';

function App() {
  const { darkMode } = useTheme();
  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [lastSearch, setLastSearch] = useState('');

  const handleSearchRepo = async () => {
    if (!currentRepo.trim()) return;
    
    setLoading(true);
    setLastSearch(currentRepo);
    
    try {
      const { data } = await api.get(`search/repositories?q=${currentRepo}&page=${currentPage}&per_page=${perPage}&sort=stars&order=desc`);
      
      if (data.items.length > 0) {
        setRepos(data.items);
        setTotalCount(data.total_count);
      } else {
        alert('Nenhum repositório encontrado');
        setRepos([]);
        setTotalCount(0);
      }
    } catch (error) {
      console.error('Error fetching repositories:', error);
      alert('Erro ao buscar repositórios');
      setRepos([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }

  const handlePageChange = async (newPage) => {
    if (newPage < 1 || newPage > Math.ceil(totalCount / perPage)) return;
    
    setCurrentPage(newPage);
    if (lastSearch) {
      setLoading(true);
      try {
        const { data } = await api.get(`search/repositories?q=${lastSearch}&page=${newPage}&per_page=${perPage}&sort=stars&order=desc`);
        setRepos(data.items);
      } catch (error) {
        console.error('Error changing page:', error);
        alert('Erro ao mudar de página');
      } finally {
        setLoading(false);
      }
    }
  }

  // Function to handle per page changes
  const handlePerPageChange = (e) => {
    const newPerPage = parseInt(e.target.value);
    setPerPage(newPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
    
    if (lastSearch) {
      handleSearchRepo();
    }
  }

  const handleRemoveRepo = (id) => {
    setRepos(prev => prev.filter(repo => repo.id !== id));
  }

  // Handle Enter key press in the input field
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchRepo();
    }
  }

  // Calculate total pages
  const totalPages = Math.min(Math.ceil(totalCount / perPage), 100); // GitHub API limits to 1000 results (100 pages of 10)

  return (
    <div className={`w-full max-w-4xl mx-auto p-5 flex flex-col items-center ${darkMode ? 'dark:bg-github-dark-bg dark:text-github-dark-text' : ''}`}>
      <header className="flex flex-col items-center mb-6 w-full relative">
        <div className="absolute top-0 right-0">
          <ThemeToggle />
        </div>
        <img src={darkMode ? gitLogoDark : gitLogoLight} width={72} height={72} alt="github logo"/>
        <h1 className={`text-2xl mt-2 text-center ${darkMode ? 'dark:text-github-dark-text' : 'text-gray-800'}`}>
          Peregrinno Finder Github
        </h1>
      </header>
      
      <div className="flex flex-row items-center justify-between w-full mb-5 flex-wrap gap-2 md:flex-row sm:flex-col sm:items-stretch">
        <Input 
          value={currentRepo} 
          onChange={(e) => setCurrentRepo(e.target.value)} 
          onKeyPress={handleKeyPress}
          placeholder="Digite o nome do repositório"
          darkMode={darkMode}
        />
        <div className="flex items-center gap-2">
          <label className={`text-sm ${darkMode ? 'dark:text-github-dark-text' : 'text-gray-700'}`}>
            Itens por página:
          </label>
          <select 
            value={perPage} 
            onChange={handlePerPageChange}
            className={`p-2 rounded-lg border text-sm focus:outline-none focus:border-github-blue cursor-pointer ${
              darkMode 
                ? 'dark:bg-github-dark-card dark:text-github-dark-text dark:border-github-dark-border' 
                : 'bg-white border-gray-300'
            }`}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        <Button onClick={handleSearchRepo} darkMode={darkMode} />
      </div>
      
      {loading ? (
        <div className="flex flex-col items-center justify-center my-10">
          <div className={`w-10 h-10 border-4 rounded-full animate-spin ${
            darkMode 
              ? 'border-github-dark-card border-t-github-dark-blue' 
              : 'border-gray-200 border-t-github-blue'
          }`}></div>
          <p className={`mt-4 ${darkMode ? 'dark:text-github-dark-secondary' : 'text-github-gray'}`}>
            Carregando...
          </p>
        </div>
      ) : (
        <>
          {repos.length > 0 && (
            <div className={`w-full text-center mb-4 text-sm ${darkMode ? 'dark:text-github-dark-secondary' : 'text-github-gray'}`}>
              Mostrando {(currentPage - 1) * perPage + 1}-{Math.min(currentPage * perPage, totalCount)} de {totalCount} resultados
            </div>
          )}
          
          {repos.map(repo => (
            <ItemRepo 
              key={repo.id} 
              handleRemoveRepo={handleRemoveRepo} 
              repo={repo}
              darkMode={darkMode}
            />
          ))}
          
          {repos.length > 0 && (
            <div className="flex justify-center mt-5 gap-1 w-full">
              <button 
                onClick={() => handlePageChange(1)} 
                disabled={currentPage === 1}
                className={`px-3 py-2 border rounded-md text-sm transition-all ${
                  darkMode 
                    ? 'dark:bg-github-dark-card dark:text-github-dark-blue dark:border-github-dark-border dark:hover:border-github-dark-blue dark:disabled:text-gray-600' 
                    : 'bg-white text-github-blue border-github-border hover:bg-github-lightGray hover:border-github-blue disabled:text-gray-300'
                } disabled:cursor-not-allowed`}
              >
                &laquo;
              </button>
              <button 
                onClick={() => handlePageChange(currentPage - 1)} 
                disabled={currentPage === 1}
                className={`px-3 py-2 border rounded-md text-sm transition-all ${
                  darkMode 
                    ? 'dark:bg-github-dark-card dark:text-github-dark-blue dark:border-github-dark-border dark:hover:border-github-dark-blue dark:disabled:text-gray-600' 
                    : 'bg-white text-github-blue border-github-border hover:bg-github-lightGray hover:border-github-blue disabled:text-gray-300'
                } disabled:cursor-not-allowed`}
              >
                &lt;
              </button>
              
              {/* Display page numbers */}
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                // Show pages around current page
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button 
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-2 border rounded-md text-sm transition-all ${
                      currentPage === pageNum 
                        ? darkMode
                          ? 'dark:bg-github-dark-blue dark:text-github-dark-text dark:border-github-dark-blue'
                          : 'bg-github-blue text-white border-github-blue'
                        : darkMode
                          ? 'dark:bg-github-dark-card dark:text-github-dark-blue dark:border-github-dark-border dark:hover:border-github-dark-blue'
                          : 'bg-white text-github-blue border-github-border hover:bg-github-lightGray hover:border-github-blue'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button 
                onClick={() => handlePageChange(currentPage + 1)} 
                disabled={currentPage === totalPages || totalPages === 0}
                className={`px-3 py-2 border rounded-md text-sm transition-all ${
                  darkMode 
                    ? 'dark:bg-github-dark-card dark:text-github-dark-blue dark:border-github-dark-border dark:hover:border-github-dark-blue dark:disabled:text-gray-600' 
                    : 'bg-white text-github-blue border-github-border hover:bg-github-lightGray hover:border-github-blue disabled:text-gray-300'
                } disabled:cursor-not-allowed`}
              >
                &gt;
              </button>
              <button 
                onClick={() => handlePageChange(totalPages)} 
                disabled={currentPage === totalPages || totalPages === 0}
                className={`px-3 py-2 border rounded-md text-sm transition-all ${
                  darkMode 
                    ? 'dark:bg-github-dark-card dark:text-github-dark-blue dark:border-github-dark-border dark:hover:border-github-dark-blue dark:disabled:text-gray-600' 
                    : 'bg-white text-github-blue border-github-border hover:bg-github-lightGray hover:border-github-blue disabled:text-gray-300'
                } disabled:cursor-not-allowed`}
              >
                &raquo;
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;