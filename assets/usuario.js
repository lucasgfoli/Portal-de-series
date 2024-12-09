// URL da API no Replit (substitua pela URL real da sua API)
const apiUrl = "https://9608c490-b62a-45b1-9057-ff212b7ad74a-00-aylbp3mbq1mq.worf.replit.dev/usuario";  // A URL da API (localmente está rodando na porta 3000)

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

            // Adiciona os links do Instagram e GitHub de forma clicável
            document.getElementById('Instagram').innerHTML = `Instagram: <a href="${data.Instagram}" target="_blank">${data.Instagram}</a>`;
            document.getElementById('Github').innerHTML = `GitHub: <a href="${data.Github}" target="_blank">${data.Github}</a>`;

            document.getElementById('descricao').textContent = "Descrição: " + (data.description || 'Descrição não encontrada');
            document.getElementById('id').textContent = "ID: " + (data.id || 'ID não encontrado');
        })
        .catch(error => {
            console.error("Erro ao buscar as informações do autor:", error);
            document.getElementById('autorName').textContent = "Erro ao carregar as informações.";
        });
}

// Chama a função para carregar as informações do autor
fetchAutorInfo();
