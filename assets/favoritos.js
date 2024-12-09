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


async function addToFavorites() {
    const params = new URLSearchParams(window.location.search);
    const movieId = params.get('id');

    if (!movieId) {
        alert('ID do filme não encontrado!');
        return;
    }

    const movieTitle = document.querySelector('h2').textContent;  // Título do filme
    const moviePoster = document.querySelector('.movie-poster').src; // Poster do filme

    const movieData = {
        id: movieId,
        title: movieTitle,
        poster: moviePoster
    };

    try {
        // Envia os dados para o servidor via POST
        const response = await fetch('https://9608c490-b62a-45b1-9057-ff212b7ad74a-00-aylbp3mbq1mq.worf.replit.dev/favoritos', {  // Corrigido o endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movieData),
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

// Função para exibir os filmes favoritos a partir do servidor via GET
async function displayFavorites() {
    const favoritesContainer = document.getElementById('favorites-container');

    try {
        // Faz uma requisição GET para buscar os favoritos
        const response = await fetch('https://9608c490-b62a-45b1-9057-ff212b7ad74a-00-aylbp3mbq1mq.worf.replit.dev/favoritos');  // URL ajustada
        if (response.ok) {
            const favorites = await response.json();

            if (favorites.length === 0) {
                favoritesContainer.innerHTML = '<p>Você ainda não tem filmes favoritos.</p>';
                return;
            }

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

// Chama a função ao carregar a página para exibir os favoritos
window.onload = displayFavorites;
