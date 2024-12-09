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

async function getMovieDetails() {
    // Obtém os parâmetros da URL
    const params = new URLSearchParams(window.location.search);
    const movieId = params.get('id'); // Obtém o ID do filme

    // Verifica se o ID do filme foi passado na URL
    if (!movieId) {
        alert('ID do filme não encontrado!');
        return;
    }

    const apiKey = 'a58f10581863c369f194754e7ff135de'; // Sua chave da API
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=pt-BR`; // URL da API para detalhes do filme

    try {
        // Realiza a requisição para buscar os detalhes do filme
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Verifica se a resposta da API contém os dados do filme
        if (!data || data.status_code === 34) {
            alert('Filme não encontrado!');
            return;
        }

        // Preencher os detalhes na página
        const movieDetails = document.getElementById('movie-details');
        const imageUrl = data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : 'https://via.placeholder.com/500x750?text=Imagem+Indisponível';
        const title = data.title || 'Sem título';
        const overview = data.overview || 'Sem descrição disponível';
        const releaseDate = data.release_date || 'Data não disponível';
        const genre = data.genres.map(g => g.name).join(', ') || 'Gênero não disponível';

        // Atualiza o HTML da página com os detalhes do filme
        movieDetails.innerHTML = `
            <div class="movie-card">
                <img src="${imageUrl}" alt="${title}" class="movie-poster">
                <h2>${title}</h2>
                <p><strong>Data de Lançamento:</strong> ${releaseDate}</p>
                <p><strong>Gênero:</strong> ${genre}</p>
                <p><strong>Descrição:</strong> ${overview}</p>
            </div>
        `;

        // Chama a função para obter o elenco do filme
        getMovieCast(movieId);

    } catch (error) {
        console.error("Erro ao buscar detalhes do filme:", error);
        alert('Erro ao carregar detalhes do filme. Tente novamente mais tarde.');
    }
}

// Função para buscar o elenco do filme
async function getMovieCast(movieId) {
    const apiKey = 'a58f10581863c369f194754e7ff135de'; // Sua chave da API
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=pt-BR`; // URL da API para buscar o elenco

    try {
        // Realiza a requisição para buscar o elenco
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Verifica se o elenco foi encontrado
        if (!data.cast || data.cast.length === 0) {
            alert('Elenco não encontrado!');
            return;
        }

        // Preenche a seção de elenco na página
        const castContainer = document.getElementById('cast-container');
        let castCards = '';

        data.cast.forEach(actor => {
            const actorName = actor.name || 'Nome não disponível';
            const actorImage = actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : 'https://via.placeholder.com/150x225?text=Imagem+Indisponível';
            
            castCards += `
                <div class="col-md-3">
                    <div class="card">
                        <img src="${actorImage}" class="card-img-top" alt="${actorName}">
                        <div class="card-body">
                            <h5 class="card-title">${actorName}</h5>
                        </div>
                    </div>
                </div>
            `;
        });

        castContainer.innerHTML = castCards; // Adiciona os cards ao container

    } catch (error) {
        console.error("Erro ao buscar elenco do filme:", error);
        alert('Erro ao carregar elenco do filme. Tente novamente mais tarde.');
    }
}

// Chama a função para obter os detalhes ao carregar a página
window.onload = getMovieDetails;