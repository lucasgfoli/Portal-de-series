function toggleMenu() {
    const menu = document.getElementById('side-menu');
    const body = document.body;

    if (menu.style.right === '0px') {

        menu.style.right = '-250px';
        body.classList.remove('menu-open');
    } else {

        menu.style.right = '0';
        body.classList.add('menu-open');
    }
}

async function getMovieDetails() {

    const params = new URLSearchParams(window.location.search);
    const movieId = params.get('id'); 

    if (!movieId) {
        alert('ID do filme não encontrado!');
        return;
    }

    const apiKey = 'a58f10581863c369f194754e7ff135de'; 
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=pt-BR`;

    try {

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!data || data.status_code === 34) {
            alert('Filme não encontrado!');
            return;
        }
a
        const movieDetails = document.getElementById('movie-details');
        const imageUrl = data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : 'https://via.placeholder.com/500x750?text=Imagem+Indisponível';
        const title = data.title || 'Sem título';
        const overview = data.overview || 'Sem descrição disponível';
        const releaseDate = data.release_date || 'Data não disponível';
        const genre = data.genres.map(g => g.name).join(', ') || 'Gênero não disponível';

        movieDetails.innerHTML = `
            <div class="movie-card">
                <img src="${imageUrl}" alt="${title}" class="movie-poster">
                <h2>${title}</h2>
                <p><strong>Data de Lançamento:</strong> ${releaseDate}</p>
                <p><strong>Gênero:</strong> ${genre}</p>
                <p><strong>Descrição:</strong> ${overview}</p>
            </div>
        `;

        getMovieCast(movieId);

    } catch (error) {
        console.error("Erro ao buscar detalhes do filme:", error);
        alert('Erro ao carregar detalhes do filme. Tente novamente mais tarde.');
    }
}

async function getMovieCast(movieId) {
    const apiKey = 'a58f10581863c369f194754e7ff135de'; // Sua chave da API
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=pt-BR`; 

    try {

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!data.cast || data.cast.length === 0) {
            alert('Elenco não encontrado!');
            return;
        }

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

        castContainer.innerHTML = castCards; 

    } catch (error) {
        console.error("Erro ao buscar elenco do filme:", error);
        alert('Erro ao carregar elenco do filme. Tente novamente mais tarde.');
    }
}

window.onload = getMovieDetails;