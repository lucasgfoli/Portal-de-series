// Função para alternar o menu lateral
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

// Função para adicionar filme aos favoritos
async function addToFavorites() {
    const params = new URLSearchParams(window.location.search);
    const movieId = params.get('id');  // Obtém o ID do filme da URL

    if (!movieId) {
        alert('ID do filme não encontrado!');
        return;
    }

    const movieTitle = document.querySelector('h2').textContent;  // Título do filme
    const moviePoster = document.querySelector('.movie-poster').src;  // URL do pôster

    const movieData = {
        id: movieId,
        title: movieTitle,
        poster: moviePoster
    };

    try {
        const response = await fetch("http://localhost:3000/favoritos", { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movieData),  // Enviando o filme no corpo da requisição
        });

        if (response.ok) {
            const result = await response.json();
            alert('Filme adicionado aos favoritos com sucesso!');
        } else {
            alert('Erro ao adicionar filme aos favoritos.');
        }
    } catch (error) {
        console.error('Erro na requisição POST:', error);
        alert('Erro ao adicionar o filme aos favoritos. Tente novamente mais tarde.');
    }
}

// Função para exibir filmes favoritos
async function displayFavorites() {
    const favoritesContainer = document.getElementById('favorites-container');

    try {
        const response = await fetch('http://localhost:3000/favoritos');  // Rota para pegar os filmes favoritos
        
        if (response.ok) {
            const favorites = await response.json();  // Converte a resposta para JSON

            if (favorites.length === 0) {
                favoritesContainer.innerHTML = '<p>Você ainda não tem filmes favoritos.</p>';
                return;
            }

            // Exibindo os filmes favoritos na página
            let favoriteCards = '';
            favorites.forEach(favorite => {
                favoriteCards += `
                    <div class="favorite-card">
                        <img src="${favorite.poster}" alt="${favorite.title}" class="favorite-poster">
                        <h3>${favorite.title}</h3>
                    </div>
                `;
            });

            favoritesContainer.innerHTML = favoriteCards;
        } else {
            alert('Erro ao buscar filmes favoritos.');
        }
    } catch (error) {
        console.error('Erro ao buscar filmes favoritos:', error);
        alert('Erro ao carregar filmes favoritos. Tente novamente mais tarde.');
    }
}

// Carrega os filmes favoritos quando a página for carregada
window.onload = displayFavorites;
