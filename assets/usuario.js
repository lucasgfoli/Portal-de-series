// URL da API no Replit (substitua pela URL real da sua API)
const apiUrl = "https://fbfe935c-8f76-47a5-975e-c271203d4de8-00-1wnx5u0cto63m.picard.replit.dev/usuarios/1";  // A URL da API (localmente está rodando na porta 3000)

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
            document.getElementById('autorName').textContent = "Nome: " + (data.name || 'Nome não encontrado');
            document.getElementById('curso').textContent = "Curso: " + (data.course || 'Curso não encontrado');
            document.getElementById('email').textContent = "Email: " + (data.email || 'Email não encontrado');
            document.getElementById('Instagram').textContent = "Instagram: " + (data.instagram || 'Instagram não encontrado');
            document.getElementById('Github').textContent = "GitHub: " + (data.github || 'GitHub não encontrado');
            document.getElementById('descricao').textContent = "Descrição: "+(data.description || 'Descrição não encontrada');
            document.getElementById('id').textContent = "ID: " + (data.id || 'ID não encontrado');
        })
        .catch(error => {
            console.error("Erro ao buscar as informações do autor:", error);
            document.getElementById('autorName').textContent = "Erro ao carregar as informações.";
        });
}

// Chama a função para carregar as informações do autor
fetchAutorInfo();
