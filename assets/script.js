
// Função para abrir e fechar o menu lateral
function toggleMenu() {
    const menu = document.getElementById('side-menu');
    if (menu.style.width === '0px' || menu.style.width === '') {
        menu.style.width = '250px'; // Abre o menu
    } else {
        menu.style.width = '0'; // Fecha o menu
    }
}

// Chave de API para TMDb
const apiKey = "a58f10581863c369f194754e7ff135de";  // Sua chave de API
const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=pt-BR&sort_by=popularity.desc`; // URL para buscar filmes populares

// Função para preencher o carrossel com filmes
async function fetchMovies() {
    try {

        const response = await fetch(apiUrl);
        const data = await response.json();
        const movies = data.results;

        const carouselInner = document.querySelector('#carouselInner');
        const carouselIndicators = document.querySelector('.carousel-indicators');
        const cardContainer = document.getElementById('card-container');
        carouselInner.innerHTML = ''; // Limpa o carrossel antes de adicionar novos itens
        carouselIndicators.innerHTML = ''; // Limpa os indicadores
        cardContainer.innerHTML = ''; // Limpa os cards antes de adicionar novos itens

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


            const indicator = `
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${index}" class="${isActive}" aria-current="true" aria-label="Slide ${index + 1}"></button>
            `;
            carouselIndicators.innerHTML += indicator;

            const cardHTML = `
                <div class="col">
                    <div class="card h-100">
                        <img src="${movieImageUrl}" class="card-img-top" alt="${movie.title}">
                        <div class="card-body">
                            <h5 class="card-title">${movie.title}</h5>
                            <p class="card-text">${movie.overview}</p>
                        </div>
                        <div class="card-footer">
                            <small class="text-muted">Last updated 3 mins ago</small>
                        </div>
                    </div>
                </div>
            `;
            cardContainer.innerHTML += cardHTML;
        });
    } catch (error) {
        console.error("Erro ao buscar filmes:", error);
    }
}
fetchMovies();