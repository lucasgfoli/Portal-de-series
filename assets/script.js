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

async function fetchMovies() {
    const apiKey = "a58f10581863c369f194754e7ff135de";  // Sua chave de API
    const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=pt-BR&sort_by=popularity.desc`; // URL para buscar filmes populares
    
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

// URL da API no Replit (substitua pela URL real da sua API)
const apiUrl = "https://62e26831-fda1-4aa4-8b08-67f51fcbf6f3-00-1p5kj3rjtz911.picard.replit.dev/usuarios";  // Ajuste para o seu caminho real

// Função para buscar as informações do autor
function fetchAutorInfo() {
    const requestOptions = {
        method: 'GET',  // Usando o método GET
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            // Log para verificar a resposta da API
            console.log("Resposta da API:", data);

            // Preenche os campos com as informações do autor
            document.getElementById('autorName').textContent = data.name || 'Nome não encontrado';
            document.getElementById('curso').textContent = "Curso: " + (data.course || 'Curso não encontrado');
            document.getElementById('email').textContent = "Email: " + (data.email || 'Email não encontrado');
            document.getElementById('Instagram').textContent = "Instagram: " + (data.instagram || 'Instagram não encontrado');
            document.getElementById('Github').textContent = "GitHub: " + (data.github || 'GitHub não encontrado');
            document.getElementById('descricao').textContent = data.description || 'Descrição não encontrada';
            document.getElementById('id').textContent = "ID: " + (data.id || 'ID não encontrado');
        })
        .catch(error => {
            console.error("Erro ao buscar as informações do autor:", error);
            document.getElementById('autorName').textContent = "Erro ao carregar as informações.";
        });
}

// Chama as funções quando a página carregar
fetchMovies();
fetchAutorInfo();  // Chama a função correta para carregar os dados do autor
