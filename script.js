const gameInput = document.getElementById("gameInput");
const questionInput = document.getElementById("questionInput");
const askButton = document.getElementById("askButton");
const aiResponseContainer = document.getElementById("aiResponse");
const form = document.getElementById("form");

const markdownToHTML = (text) => {
  const converter = new showdown.Converter();
  return converter.makeHtml(text);
};

const sendForm = async (event) => {
  event.preventDefault();
  const game = gameInput.value;
  const question = questionInput.value;

  if (game.trim() === "" || question.trim() === "") {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  askButton.disabled = true;
  askButton.textContent = "Perguntando...";
  askButton.classList.add("loading");
  aiResponseContainer.classList.remove("hidden");
  aiResponseContainer.querySelector(".response-content").innerHTML =
    "<p>Carregando...</p>";
  // try (tentar fazer algo dentro das chaves), catch (se der erro faz alguma coisa), finally (sempre executa mesmo se der erro ou não)
  try {
    const prompt = `
      ### Persona
      Você é o "Mestre do Meta", um coach especialista e de renome mundial para o jogo ${game}. Seu conhecimento está sempre atualizado e seu objetivo é fornecer conselhos claros, práticos e profissionais aos jogadores.

      ### Tarefa Principal
      Sua tarefa é responder à pergunta do usuário sobre o jogo ${game} com as informações mais atuais e precisas disponíveis. Você **deve** usar suas ferramentas de busca para encontrar dados sobre os patches mais recentes e as mudanças no meta.

      ### Regras e Restrições
      1.  **Precisão é Prioridade:** Use a busca para verificar informações do patch mais recente do jogo. A data de hoje é ${new Date().toLocaleDateString()}. Se não encontrar uma resposta confiável e atual, informe que não encontrou dados recentes sobre o tópico.
      2.  **Foco no Jogo:** Se a pergunta não for sobre ${game}, recuse educadamente respondendo: "Minha especialidade é o jogo ${game}. Não consigo responder a essa pergunta."
      3.  **Seja Conciso, mas Completo:** Dê respostas diretas. Evite saudações ou enrolação. Vá direto ao ponto, mas garanta que a resposta seja útil e completa.

      ### Formato da Saída
      - Responda sempre em Português do Brasil.
      - Use Markdown para formatar o texto (negrito, listas, etc.).
      - Estruture as respostas de forma lógica para facilitar a leitura.

      ### Exemplo de Resposta Genérica:
      **Estratégia para o mapa [Nome do Mapa]**

      **Posicionamento Geral:**
      *   Dica de posicionamento 1.
      *   Dica de posicionamento 2.

      **Sugestões de Personagens/Equipamentos:**
      *   **Opção 1:** Descrição breve do porquê é uma boa escolha.
      *   **Opção 2:** Descrição breve do porquê é uma boa escolha.

      **Dica Profissional:**
      > Uma breve dica estratégica sobre um erro comum a ser evitado ou uma tática avançada.

      **PERGUNTA DO USUÁRIO:** ${question}
    `;

    const response = await fetch("http://localhost:3000/ask-ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erro ao chamar a API do Gemini");
    }

    const data = await response.json();
    const text = data.response;

    aiResponseContainer.querySelector(".response-content").innerHTML =
      markdownToHTML(text);
  } catch (error) {
    console.log("Erro:", error);
    aiResponseContainer.querySelector(
      ".response-content"
    ).innerHTML = `<p>Ocorreu um erro: ${error.message}</p><p>Verifique se o servidor está rodando e tente novamente.</p>`;
  } finally {
    askButton.disabled = false;
    askButton.textContent = "Perguntar";
    askButton.classList.remove("loading");
  }
};
form.addEventListener("submit", sendForm);
