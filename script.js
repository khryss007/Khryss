// Configuração das partículas
particlesJS("particles-js", {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#2BDEFD" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: "#2BDEFD", opacity: 0.2, width: 1 },
        move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" }
        }
    }
});

// Seletores atualizados
const elementos = {
    pergunta: document.getElementById("pergunta"),
    alternativas: document.getElementById("alternativas"),
    resultado: document.getElementById("texto-resultado"),
    statusBar: document.querySelector(".status-bar")
};

// ... (mantenha o array de perguntas original)

let atual = 0;
let perguntaAtual;
let historiaFinal = "";

function mostraPergunta() {
    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    }
    
    elementos.statusBar.textContent = `STATUS: [QUESTÃO ${atual + 1}/${perguntas.length}]`;
    perguntaAtual = perguntas[atual];
    
    // Animação de digitação para a pergunta
    typeWriter(elementos.pergunta, perguntaAtual.enunciado, () => {
        mostraAlternativas();
    });
}

function mostraAlternativas() {
    elementos.alternativas.innerHTML = "";
    
    perguntaAtual.alternativas.forEach((alternativa, index) => {
        const botao = document.createElement("button");
        botao.innerHTML = `<span class="option-number">${index + 1}.</span> ${alternativa.texto}`;
        
        botao.addEventListener("click", () => {
            // Efeito sonoro (opcional)
            const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3');
            audio.volume = 0.3;
            audio.play();
            
            respostaSelecionada(alternativa);
        });
        
        elementos.alternativas.appendChild(botao);
        
        // Animação de entrada dos botões
        gsap.from(botao, {
            opacity: 0,
            y: 20,
            duration: 0.3,
            delay: index * 0.1
        });
    });
}

function respostaSelecionada(opcaoSelecionada) {
    historiaFinal += opcaoSelecionada.afirmacao + " ";
    atual++;
    
    // Animação de saída
    gsap.to([elementos.pergunta, elementos.alternativas], {
        opacity: 0,
        y: -20,
        duration: 0.3,
        onComplete: mostraPergunta
    });
}

function mostraResultado() {
    elementos.statusBar.textContent = "STATUS: [SIMULAÇÃO COMPLETA]";
    elementos.pergunta.textContent = "EM 2049...";
    elementos.alternativas.innerHTML = "";
    
    // Animação de digitação para o resultado
    typeWriter(elementos.resultado, historiaFinal);
    
    // Efeito de glitch no título
    const title = document.querySelector(".terminal-title");
    let glitchCount = 0;
    const glitchInterval = setInterval(() => {
        title.textContent = glitchCount % 2 === 0 ? 
            ">_ SIMULAÇÃO_CONCLUÍDA.EXE" : 
            ">_ FUTURO_DA_IA.EXE";
        glitchCount++;
        if (glitchCount > 6) clearInterval(glitchInterval);
    }, 100);
}

// Função de efeito de digitação
function typeWriter(element, text, callback) {
    element.innerHTML = "";
    let i = 0;
    const speed = 20;
    
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        } else if (callback) {
            callback();
        }
    }
    
    typing();
}

// Iniciar com efeito
gsap.from(".terminal-container", {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power3.out"
});

// Iniciar a primeira pergunta com delay
setTimeout(mostraPergunta, 1000);
