// Função para buscar detalhes do filme e exibir na página
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
    } catch (error) {
        console.error("Erro ao buscar detalhes do filme:", error);
        alert('Erro ao carregar detalhes do filme. Tente novamente mais tarde.');
    }
}

// Chama a função para obter os detalhes ao carregar a página
window.onload = getMovieDetails;
