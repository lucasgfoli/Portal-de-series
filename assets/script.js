const apiKey = "a58f10581863c369f194754e7ff135de";
const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=pt-BR&sort_by=popularity.desc`; // URL para buscar filmes populares
const apiUrlTV = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=pt-BR&sort_by=popularity.desc`; // URL para buscar séries populares

// Função para preencher o carrossel com filmes
async function fetchMovies() {
    try {
        // Buscar filmes
        const response = await fetch(apiUrl);
        const data = await response.json();
        const movies = data.results;

        // Carregar o carrossel
        const carouselInner = document.querySelector('.carousel-inner');
        const carouselIndicators = document.querySelector('.carousel-indicators');
        carouselInner.innerHTML = ''; // Limpa o carrossel antes de adicionar novos itens
        carouselIndicators.innerHTML = ''; // Limpa os indicadores

        // Adiciona cada filme ao carrossel
        movies.forEach((movie, index) => {
            const isActive = index === 0 ? 'active' : ''; // A primeira imagem será ativa
            const movieImageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

            const carouselItem = `
                <div class="carousel-item ${isActive}">
                    <img src="${movieImageUrl}" class="d-block w-100" alt="${movie.title}">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>${movie.title}</h5>
                        <p>${movie.overview}</p>
                    </div>
                </div>
            `;
            carouselInner.innerHTML += carouselItem;

            // Criando os indicadores para cada slide
            const indicator = `
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${index}" class="${isActive}" aria-current="true" aria-label="Slide ${index + 1}"></button>
            `;
            carouselIndicators.innerHTML += indicator;
        });
    } catch (error) {
        console.error("Erro ao buscar filmes:", error);
    }
}

// Função para preencher o carrossel com séries
async function fetchTVShows() {
    try {
        // Buscar séries
        const response = await fetch(apiUrlTV);
        const data = await response.json();
        const tvShows = data.results;

        // Carregar o carrossel
        const carouselInner = document.querySelector('.carousel-inner');
        const carouselIndicators = document.querySelector('.carousel-indicators');
        carouselInner.innerHTML = ''; // Limpa o carrossel antes de adicionar novos itens
        carouselIndicators.innerHTML = ''; // Limpa os indicadores

        // Adiciona cada série ao carrossel
        tvShows.forEach((show, index) => {
            const isActive = index === 0 ? 'active' : ''; // A primeira imagem será ativa
            const showImageUrl = `https://image.tmdb.org/t/p/w500${show.poster_path}`;

            const carouselItem = `
                <div class="carousel-item ${isActive}">
                    <img src="${showImageUrl}" class="d-block w-100" alt="${show.name}">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>${show.name}</h5>
                        <p>${show.overview}</p>
                    </div>
                </div>
            `;
            carouselInner.innerHTML += carouselItem;

            // Criando os indicadores para cada slide
            const indicator = `
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${index}" class="${isActive}" aria-current="true" aria-label="Slide ${index + 1}"></button>
            `;
            carouselIndicators.innerHTML += indicator;
        });
    } catch (error) {
        console.error("Erro ao buscar séries:", error);
    }
}

// Chama as funções para buscar filmes ou séries
fetchMovies();
// Ou se quiser buscar séries, basta descomentar a linha abaixo
// fetchTVShows();
