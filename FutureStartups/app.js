// Importa a lista de startups do arquivo dados.js
import { startups } from './dados.js';

document.addEventListener("DOMContentLoaded", function() {
    // Seleciona o formulário de busca, o campo de entrada e o contêiner de resultados
    const searchForm = document.querySelector("#search-form");
    const searchInput = searchForm.querySelector("input");
    const searchResultsContainer = document.querySelector("#search-results ul");

    // Verifica se os elementos foram encontrados
    if (!searchForm || !searchResultsContainer) {
        console.error("Elementos não encontrados");
        return;
    }

    // Função para exibir os resultados da busca
    function displayResults(results) {
        // Limpa o conteúdo atual do contêiner de resultados
        searchResultsContainer.innerHTML = "";

        // Cria e adiciona elementos para cada startup encontrada
        results.forEach(startup => {
            const listItem = document.createElement("li");
            listItem.classList.add("startup-item");

            // Cria e adiciona a imagem da startup
            const image = document.createElement("img");
            image.src = startup.image;
            image.alt = startup.name;
            image.classList.add("startup-image");

            // Cria e adiciona o nome da startup
            const name = document.createElement("p");
            name.textContent = startup.name;
            name.classList.add("startup-name");

            // Cria e adiciona a descrição da startup
            const description = document.createElement("p");
            description.textContent = startup.description;
            description.classList.add("startup-description");

            // Cria e adiciona o link "Saiba mais" da startup
            const linkButton = document.createElement("a");
            linkButton.href = startup.link;
            linkButton.textContent = "Saiba mais";
            linkButton.classList.add("startup-link");
            linkButton.target = "_blank"; // Abre o link em uma nova aba

            // Adiciona todos os elementos ao item da lista
            listItem.appendChild(image);
            listItem.appendChild(name);
            listItem.appendChild(description);
            listItem.appendChild(linkButton);
            searchResultsContainer.appendChild(listItem);
        });

        // Exibe mensagem caso nenhum resultado seja encontrado
        if (results.length === 0) {
            searchResultsContainer.innerHTML = "<li>Nenhuma startup encontrada</li>";
        }
    }

    // Função para realizar a busca e exibir os resultados filtrados
    function performSearch(query) {
        // Filtra as startups com base na consulta de busca
        const filteredResults = startups.filter(startup =>
            startup.name.toLowerCase().includes(query.toLowerCase()) ||
            startup.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        );
        // Exibe os resultados filtrados
        displayResults(filteredResults);
        // Rola para a seção de resultados
        scrollToResults();
    }

    // Função para rolar suavemente até a seção de resultados
    function scrollToResults() {
        const resultsSection = document.querySelector("#search-results"); // Atualize o seletor se necessário
        if (resultsSection) {
            resultsSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Adiciona um listener para o envio do formulário de busca
    searchForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Evita o comportamento padrão do formulário

        const searchQuery = searchInput.value.trim(); // Obtém o valor da consulta de busca

        if (searchQuery) {
            performSearch(searchQuery); // Realiza a busca com a consulta fornecida
        } else {
            displayResults(startups); // Exibe todas as startups se a consulta estiver vazia
            scrollToResults(); // Rola para a seção de resultados
        }
    });

    // Adiciona listeners para os links das tags populares
    const popularTags = document.querySelectorAll(".tags-popular a");
    popularTags.forEach(tag => {
        tag.addEventListener("click", function(event) {
            event.preventDefault(); // Evita o comportamento padrão do link
            const searchTerm = this.getAttribute("data-search"); // Obtém o termo de busca associado à tag
            searchInput.value = searchTerm; // Define o valor da entrada de busca
            searchForm.dispatchEvent(new Event("submit")); // Dispara o evento de submissão do formulário
        });
    });

    // Exibe todos os resultados inicialmente
    displayResults(startups);
});
