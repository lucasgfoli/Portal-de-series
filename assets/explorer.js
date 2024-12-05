const apiKey = 'a58f10581863c369f194754e7ff135de'; // Sua chave da API
const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=pt-BR&query=`;

// Função para buscar filmes pela pesquisa
async function searchMovies() {
    const searchterm = document.getElementById('searchInput').value.trim();
    if (!searchterm) return;

    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '<p>Carregando...</p>'; // Mensagem de carregamento

    try {
        const response = await fetch(apiUrl + encodeURIComponent(searchterm));
        const data = await response.json();
        const movies = data.results;

        cardContainer.innerHTML = ''; // Limpa a mensagem de carregamento

        if (movies.length === 0) {
            cardContainer.innerHTML = '<p class="text-center">Nenhum resultado encontrado.</p>';
        } else {
            let cards = '';
            movies.forEach((movie) => {
                const imageUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=Imagem+Indisponível';
                const title = movie.title || 'Sem título';
                const overview = movie.overview ? movie.overview.substring(0, 150) + '...' : 'Sem descrição disponível';
                const movieId = movie.id; // ID do filme para redirecionamento

                cards += `
                    <div class="col">
                        <div class="card">
                            <a href="detalhes.html?id=${movieId}"> <!-- Link para a página de detalhes -->
                                <img src="${imageUrl}" class="card-img-top" alt="${title}">
                                <div class="card-body">
                                    <h5 class="card-title">${title}</h5>
                                    <p class="card-text">${overview}</p>
                                </div>
                            </a>
                        </div>
                    </div>
                `;
            });
            cardContainer.innerHTML = cards; // Adiciona todos os cards de uma vez
        }
    } catch (error) {
        console.error("Erro ao buscar filmes:", error);
        cardContainer.innerHTML = '<p class="text-center">Erro ao carregar filmes. Tente novamente mais tarde.</p>';
    }
}

// Função para preencher filmes populares ao carregar a página
async function fetchPopularMovies() {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '<p>Carregando...</p>'; // Mensagem de carregamento

    try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=pt-BR&sort_by=popularity.desc`);
        const data = await response.json();
        const movies = data.results.slice(0, 6); // Limitar para 6 filmes populares

        let cards = '';
        movies.forEach((movie) => {
            const imageUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=Imagem+Indisponível';
            const title = movie.title || 'Sem título';
            const overview = movie.overview ? movie.overview.substring(0, 150) + '...' : 'Sem descrição disponível';
            const movieId = movie.id; // ID do filme para redirecionamento

            cards += `
                <div class="col">
                    <div class="card">
                        <a href="detalhes.html?id=${movieId}"> <!-- Link para a página de detalhes -->
                            <img src="${imageUrl}" class="card-img-top" alt="${title}">
                            <div class="card-body">
                                <h5 class="card-title">${title}</h5>
                                <p class="card-text">${overview}</p>
                            </div>
                        </a>
                    </div>
                </div>
            `;
        });
        cardContainer.innerHTML = cards; // Adiciona os cards de filmes populares
    } catch (error) {
        console.error("Erro ao buscar filmes populares:", error);
        cardContainer.innerHTML = '<p class="text-center">Erro ao carregar filmes populares. Tente novamente mais tarde.</p>';
    }
}

// Chama a função para carregar filmes populares ao abrir a página
window.onload = fetchPopularMovies;
