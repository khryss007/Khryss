// Dados do questionário
const perguntas = [
    {
        enunciado: "Você está em uma rua escura quando vê um robô sendo atacado por humanos. O robô parece assustado. O que você faz?",
        alternativas: [
            {
                texto: "Intervenho para proteger o robô - todos os seres sencientes merecem compaixão.",
                afirmacao: "Você demonstra empatia por seres sintéticos, uma característica rara em humanos."
            },
            {
                texto: "Observo de longe - não é problema meu.",
                afirmacao: "Você age com cautela, típico de quem vive em Los Angeles 2049."
            }
        ]
    },
    {
        enunciado: "Um replicante implora por mais tempo de vida, alegando ter encontrado amor verdadeiro. Você:",
        alternativas: [
            {
                texto: "Acredita que amor transcende a natureza biológica.",
                afirmacao: "Sua visão romântica sugere humanidade profunda."
            },
            {
                texto: "Lembra que replicantes têm prazo de validade por razões.",
                afirmacao: "Pragmatismo típico de agentes da Tyrell Corporation."
            }
        ]
    },
    {
        enunciado: "Ao encontrar uma fotografia de infância, você:",
        alternativas: [
            {
                texto: "Sente uma onda de nostalgia autêntica.",
                afirmacao: "Memórias vívidas indicam experiências humanas reais."
            },
            {
                texto: "Questiona se são memórias implantadas.",
                afirmacao: "Ceticismo sobre identidade é sintomático em replicantes."
            }
        ]
    }
];

// Sistema de renderização
class BladeRunnerTerminal {
    constructor() {
        this.terminal = document.getElementById('terminal-body');
        this.currentQuestion = 0;
        this.history = [];
        
        this.init();
    }
    
    init() {
        this.typeWriter(
            "INICIANDO TESTE DE EMPATIA VOIGHT-KAMPFF 2.1\n\n" +
            "OBJETIVO: DETERMINAR SUA CAPACIDADE DE EMPATIA\n" +
            "EM RELAÇÃO A INTELIGÊNCIAS ARTIFICIAIS\n\n" +
            "PREPARE-SE...", 
            () => this.showQuestion(),
            50
        );
    }
    
    showQuestion() {
        if (this.currentQuestion >= perguntas.length) {
            this.showResults();
            return;
        }
        
        const q = perguntas[this.currentQuestion];
        let html = `
            <div class="question">${q.enunciado}</div>
            <div class="options" id="options"></div>
        `;
        
        this.terminal.innerHTML = html;
        
        const optionsContainer = document.getElementById('options');
        q.alternativas.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerHTML = `<span class="option-num">${i+1}.</span> ${opt.texto}`;
            btn.addEventListener('click', () => this.selectOption(opt));
            optionsContainer.appendChild(btn);
            
            // Animação de entrada
            setTimeout(() => {
                btn.style.opacity = '1';
                btn.style.transform = 'translateY(0)';
            }, i * 100);
        });
    }
    
    selectOption(option) {
        this.history.push(option.afirmacao);
        this.currentQuestion++;
        
        // Efeito de transição
        this.terminal.style.animation = 'glitch 0.5s';
        setTimeout(() => {
            this.terminal.style.animation = '';
            this.showQuestion();
        }, 500);
    }
    
    showResults() {
        const resultText = this.history.join(' ');
        
        this.terminal.innerHTML = `
            <div class="result-screen">
                <div class="question">ANÁLISE CONCLUÍDA</div>
                <div class="result-text"></div>
                <div class="verdict">VEREDITO: ${this.calculateVerdict()}</div>
            </div>
        `;
        
        // Efeito de digitação
        this.typeWriter(resultText, null, 30, document.querySelector('.result-text'));
    }
    
    calculateVerdict() {
        const score = this.history.length > 0 ? 
            this.history.join(' ').length % 100 : 50;
        
        if (score > 70) return "HUMANO - EMPÁTICO";
        if (score > 30) return "HUMANO - TÍPICO";
        return "REPLICANTE? INVESTIGAR...";
    }
    
    typeWriter(text, callback, speed = 30, target = null) {
        const element = target || this.terminal;
        element.innerHTML = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else if (callback) {
                callback();
            }
        }
        
        type();
    }
}

// Iniciar a experiência quando a janela carregar
window.onload = () => {
    // Efeito de inicialização
    document.body.style.opacity = '1';
    new BladeRunnerTerminal();
    
    // Efeito sonoro (usando Web Audio API)
    if (window.AudioContext) {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = 440;
        
        const gain = ctx.createGain();
        gain.gain.value = 0.1;
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
    }
};
