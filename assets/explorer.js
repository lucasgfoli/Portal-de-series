// Função para abrir/fechar o menu lateral
function toggleMenu() {
    const menu = document.getElementById('side-menu');
    const body = document.body;

    // Verifica o estado do menu para alternar entre aberto e fechado
    if (menu.style.right === '0px') {
        // Fecha o menu
        menu.style.right = '-250px';
        body.classList.remove('menu-open');
    } else {
        // Abre o menu
        menu.style.right = '0';
        body.classList.add('menu-open');
    }
}

const apiKey = 'a58f10581863c369f194754e7ff135de'; // API Key
const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=pt-BR&query=`;

// Função para buscar filmes pela pesquisa
async function searchMovies() {
    const searchterm = document.getElementById('searchInput').value.trim();
    if (!searchterm) return;  // Não faz nada se o campo de pesquisa estiver vazio

    try {
        const response = await fetch(apiUrl + encodeURIComponent(searchterm));
        const data = await response.json();
        const movies = data.results;

        const cardContainer = document.getElementById('card-container');
        cardContainer.innerHTML = ''; // Limpa os cards existentes

        if (movies.length === 0) {
            cardContainer.innerHTML = '<p class="text-center">Nenhum resultado encontrado.</p>';
        } else {
            movies.forEach((movie) => {
                const imageUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=Imagem+Indisponível';
                const title = movie.title || 'Sem título';
                const overview = movie.overview ? movie.overview.substring(0, 150) + '...' : 'Sem descrição disponível';

                // Cria o card para o filme
                const card = `
                    <div class="col">
                        <div class="card">
                            <img src="${imageUrl}" class="card-img-top" alt="${title}">
                            <div class="card-body">
                                <h5 class="card-title">${title}</h5>
                                <p class="card-text">${overview}</p>
                            </div>
                        </div>
                    </div>
                `;
                cardContainer.innerHTML += card;
            });
        }
    } catch (error) {
        console.error("Erro ao buscar filmes:", error);
    }
}

// Função para preencher os filmes populares ao carregar a página
async function fetchPopularMovies() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=pt-BR&sort_by=popularity.desc`);
        const data = await response.json();
        const movies = data.results.slice(0, 6); // Limitar para 6 filmes populares

        const cardContainer = document.getElementById('card-container');
        cardContainer.innerHTML = ''; // Limpa os cards existentes

        movies.forEach((movie) => {
            const imageUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=Imagem+Indisponível';
            const title = movie.title || 'Sem título';
            const overview = movie.overview ? movie.overview.substring(0, 150) + '...' : 'Sem descrição disponível';

            // Cria o card para o filme
            const card = `
                <div class="col">
                    <div class="card">
                        <img src="${imageUrl}" class="card-img-top" alt="${title}">
                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text">${overview}</p>
                        </div>
                    </div>
                </div>
            `;
            cardContainer.innerHTML += card;
        });
    } catch (error) {
        console.error("Erro ao buscar filmes populares:", error);
    }
}

// Chama a função para carregar filmes populares ao abrir a página
window.onload = fetchPopularMovies;
