# 🤖 NLW Agents - Assistente de Jogos com IA

<p align="center">
  Projeto desenvolvido durante a 20ª edição do Next Level Week (NLW) da Rocketseat.
</p>

<p align="center">
  <img src="./assets/final.png" alt="Demonstração do Projeto" width="700"/>
</p

## 🎯 Sobre o Projeto

O **NLW Agents** é um assistente virtual inteligente, especializado em fornecer dicas, estratégias e as melhores _builds_ para diversos jogos online. Utilizando o poder da **API do Google Gemini**, a aplicação oferece respostas atualizadas e precisas para ajudar jogadores a melhorarem sua performance.

A interface é simples e intuitiva: basta digitar o nome do jogo, inserir sua pergunta e obter uma resposta gerada por IA em segundos, sem a necessidade de fornecer uma chave de API.

---

## ✨ Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias e ferramentas:

- **Frontend:**
  - ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
  - ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
  - ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
- **Backend:**
  - ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
  - ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
- **API:**
  - ![Google Gemini](https://img.shields.io/badge/Google_Gemini_API-4285F4?style=for-the-badge&logo=google-gemini&logoColor=white)
- **Bibliotecas:**
  - **Showdown.js:** Para converter as respostas em Markdown para HTML de forma elegante.
  - **Dotenv:** Para gerenciar as variáveis de ambiente no backend.

---

## 🚀 Como Executar o Projeto

A arquitetura do projeto foi atualizada para um modelo cliente-servidor, garantindo que sua chave de API permaneça segura. Para rodar o projeto localmente, siga os passos abaixo.

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior) e npm instalados.
- Um navegador web moderno (Chrome, Firefox, etc.).

### Passo a Passo

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/Kaueodev/NLW-20-Agents.git
    cd NLW-20-Agents
    ```

2.  **Instale as dependências do backend:**

    Navegue até a pasta do projeto e execute o comando abaixo para instalar o Express, a biblioteca do Gemini e outras dependências.

    ```bash
    npm install
    ```

3.  **Configure sua Chave de API (API Key):**

    - Acesse o **Google AI Studio**.
    - Faça login com sua conta Google.
    - Clique em "**Get API key**" e crie uma nova chave em um projeto.
    - Copie a chave gerada. Ela será necessária para usar a aplicação.

    Agora, crie um arquivo chamado `.env` na raiz do projeto e adicione sua chave de API nele, como no exemplo abaixo:

    ```
    GEMINI_API_KEY=SUA_CHAVE_SECRETA_AQUI
    ```

    > ⚠️ **Importante:** O arquivo `.env` já está no `.gitignore`, garantindo que sua chave secreta não seja enviada para o repositório.

4.  **Execute o projeto:**

    Você precisará de dois terminais abertos na pasta do projeto.

    - **No primeiro terminal, inicie o servidor backend:**

      ```bash
      node server.js
      ```

      Você verá a mensagem `Servidor rodando na porta http://localhost:3000`.

    - **No segundo terminal (ou simplesmente no seu editor), abra o frontend:**
      A forma mais simples é abrir o arquivo `index.html` diretamente no seu navegador. Para uma melhor experiência, use a extensão **Live Server** no VS Code.

5.  **Utilize a Aplicação:**
    - Com a página aberta, não é mais necessário inserir a chave de API.
    - Digite o nome do jogo desejado.
    - Digite sua pergunta.
    - Clique em "Perguntar" e aguarde a magia acontecer! ✨

---

## 🤝 Como Contribuir

Contribuições são o que tornam a comunidade de código aberto um lugar incrível para aprender, inspirar e criar. Qualquer contribuição que você fizer será **muito apreciada**.

1.  Faça um **Fork** do projeto.
2.  Crie uma nova Branch (`git checkout -b feature/sua-feature`).
3.  Faça o **Commit** das suas alterações (`git commit -m 'Adiciona nova feature'`).
4.  Faça o **Push** para a Branch (`git push origin feature/sua-feature`).
5.  Abra um **Pull Request**.

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

<p align="center">
  Feito com ❤️ por <strong>Kaue Guimarães</strong>, com a ajuda da <strong>Rocketseat</strong> 🚀
</p>
