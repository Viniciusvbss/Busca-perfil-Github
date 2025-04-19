import { useState } from 'react';
import githubLogo from '/images/image 1.png'

// Componente principal App
function App() {
  // Estado para armazenar o texto digitado no input
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Função que será executada quando clicar no botão
  const buscarPerfil = async () => {
    if (username.trim()) {
      setIsLoading(true);
      setError('');
      setUserData(null);

      try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) {
          throw new Error('Nenhum perfil foi encontrado com esse nome de usuário.\nTente novamente');
        }
        const data = await response.json();
        setUserData({
          name: data.name || data.login,
          avatar_url: data.avatar_url,
          bio: data.bio || 'Nenhuma biografia disponível.'
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Função para lidar com a tecla Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      buscarPerfil();
    }
  };

  return (
    // Container principal com gradiente
    <main className="min-h-screen bg-[#1F1F1F] bg-dots relative overflow-hidden flex items-center justify-center">
      {/* Efeito de gradiente azul */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600 rounded-full filter blur-[150px] opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600 rounded-full filter blur-[150px] opacity-10"></div>
      
      {/* Card principal - dimensões exatas do Figma */}
      <div className="bg-[#000000] w-[95%] sm:w-[90%] min-h-[500px] max-w-[1154px] rounded-xl shadow-2xl relative z-10 border border-gray-800 py-4 sm:py-8 px-4 sm:px-0">
        {/* Container do conteúdo centralizado */}
        <div className="w-full max-w-[800px] mx-auto flex flex-col items-center">
          {/* Logo e Título */}
          <div className="flex flex-col sm:flex-row items-center gap-2 mb-6 sm:mb-10">
            <img 
              src={githubLogo}
              alt="GitHub Logo"
              className="w-16 h-16 sm:w-14 sm:h-14"
            />
            <h1 className="text-[28px] sm:text-[40px] text-white flex items-center">
              <span className="font-light mr-2">Perfil</span>
              <span className="font-medium">GitHub</span>
            </h1>
          </div>

          {/* Campo de busca */}
          <div className="relative w-full max-w-[500px]">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite um usuário do Github"
              className="w-full pl-4 pr-16 py-2 sm:py-3 bg-white text-gray-900 rounded-lg focus:outline-none border-2 border-white/50 text-sm sm:text-base"
            />
            <button 
              onClick={buscarPerfil}
              disabled={isLoading}
              className="absolute right-0 top-0 h-full px-3 sm:px-4 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors flex items-center justify-center border-l-2 border-white/30 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              )}
            </button>
          </div>

          {/* Card de Perfil */}
          {userData && (
            <div className="mt-6 sm:mt-8 p-4 sm:p-8 bg-[#E5E5E5] rounded-lg w-full max-w-[800px] flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-8">
              {/* Foto do perfil */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden flex-shrink-0 border-4 border-blue-600">
                <img 
                  src={userData.avatar_url} 
                  alt={userData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Informações do perfil */}
              <div className="flex-1 pt-2 text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-medium text-blue-600 mb-2 sm:mb-4">
                  {userData.name}
                </h2>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  {userData.bio}
                </p>
              </div>
            </div>
          )}

          {/* Mensagem de erro */}
          {error && (
            <div className="mt-6 sm:mt-8 p-4 bg-[#E5E5E5] rounded-lg w-full max-w-[800px]">
              <p className="text-red-500 text-center text-sm whitespace-pre-line">{error}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default App; 