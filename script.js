const apiKeyInput = document.getElementById("apiKey");
const gameSelect = document.getElementById("gameSelect");
const questionInput = document.getElementById("questionInput");
const askButton = document.getElementById("askButton");
const aiResponse = document.getElementById("aiResponse");
const form = document.getElementById("form");

const markdownToHTML = (text) => {
  const converter = new showdown.Converter();
  return converter.makeHtml(text);
};

const askIA = async (question, game, apiKey) => {
  const model = "gemini-2.5-flash";
  const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const pergunta = `
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
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: pergunta,
        },
      ],
    },
  ];

  const tools = [
    {
      googleSearch: {},
    },
  ];

  // (awaint) esperar
  const response = await fetch(geminiURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents,
      tools,
    }),
  });

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
};

const sendForm = async (event) => {
  event.preventDefault();
  const apiKey = apiKeyInput.value;
  const game = gameSelect.value;
  const question = questionInput.value;

  if (apiKey == "" || game == "" || question == "") {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  askButton.disabled = true;
  askButton.textContent = "Perguntando...";
  askButton.classList.add("loading");
  // try (tentar fazer algo dentro das chaves), catch (se der erro faz alguma coisa), finally (sempre executa mesmo se der erro ou não)
  try {
    const text = await askIA(question, game, apiKey);
    aiResponse.querySelector(".response-content").innerHTML =
      markdownToHTML(text);
    aiResponse.classList.remove("hidden");
  } catch (error) {
    console.log("Erro:", error);
  } finally {
    askButton.disabled = false;
    askButton.textContent = "Perguntar";
    askButton.classList.remove("loading");
  }
};
form.addEventListener("submit", sendForm);
