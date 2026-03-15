// Inicializar AOS (Animações de rolagem)
AOS.init({
    duration: 1000,
    once: true // A animação ocorre apenas uma vez
});

// --- EFEITO NAVBAR TRANSPARENTE/SÓLIDA ---
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    // Adiciona a classe 'scrolled' quando rolar mais de 80px
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// --- CONFIGURAÇÃO DO COUNTDOWN ---
// Define a data do casamento
const weddingDate = new Date("Oct 7, 2026 16:30:00").getTime();

const countdown = setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    // Atualiza o HTML apenas se os elementos existirem na tela
    const daysEl = document.getElementById("days");
    if (daysEl) {
        daysEl.innerHTML = d;
        document.getElementById("hours").innerHTML = h;
        document.getElementById("minutes").innerHTML = m;
        document.getElementById("seconds").innerHTML = s;
    }

    // Quando a data chegar
    if (distance < 0) {
        clearInterval(countdown);
        const countdownEl = document.getElementById("countdown");
        if (countdownEl) countdownEl.innerHTML = "É HOJE! ✨";
    }
}, 1000);

// --- SMOOTH SCROLL (Rolagem suave ao clicar nos links) ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});


// ----------------------------
// SISTEMA DE PRESENTES PIX
// ----------------------------

/**
 * Abre o modal de Pix com os dados do presente selecionado
 * @param {string} nome - Nome do presente
 * @param {string} valor - Valor formatado
 * @param {string} chave - A chave Pix para cópia
 */
function abrirPix(nome, valor, chave) {
    const modal = document.getElementById("pixModal");
    const nomePresente = document.getElementById("modalGiftName");
    const valorPresente = document.getElementById("pixValue");
    const inputPix = document.getElementById("pixKeyInput");
    const btnCopiar = document.getElementById("btn-copiar-pix");

    if (modal && nomePresente && valorPresente && inputPix) {
        // Preenche as informações
        nomePresente.innerText = nome;
        valorPresente.innerText = "Valor sugerido: R$ " + valor;
        inputPix.value = chave;

        // Reseta o estado do botão de copiar
        if (btnCopiar) {
            btnCopiar.innerText = "Copiar Chave Pix";
            btnCopiar.style.backgroundColor = ""; // Volta para a cor do CSS
        }

        // Adiciona a classe que dispara a animação CSS (display: flex + fade/slide)
        modal.classList.add("ativo");
    }
}

/**
 * Fecha o modal de Pix removendo a classe ativa
 */
function fecharPix() {
    const modal = document.getElementById("pixModal");
    if (modal) {
        modal.classList.remove("ativo");
    }
}

// Event Listeners Adicionais para o Modal
document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("pixModal");
    const btnFechar = document.querySelector(".close-modal");
    const btnCopiar = document.getElementById("btn-copiar-pix");
    const inputPix = document.getElementById("pixKeyInput");

    // Fecha ao clicar no 'X'
    if (btnFechar) {
        btnFechar.onclick = fecharPix;
    }

    // Fecha ao clicar fora da caixa branca (no fundo escuro)
    window.onclick = function(event) {
        if (event.target == modal) {
            fecharPix();
        }
    };

    // Lógica do botão Copiar
    if (btnCopiar && inputPix) {
        btnCopiar.onclick = function() {
            inputPix.select();
            inputPix.setSelectionRange(0, 99999); // Suporte para mobile
            
            navigator.clipboard.writeText(inputPix.value).then(() => {
                // Feedback visual de sucesso
                btnCopiar.innerText = "Copiado! ✔";
                btnCopiar.style.backgroundColor = "#8ca67a"; // Tom verde suave
                
                // Opcional: Voltar ao texto normal após 3 segundos
                setTimeout(() => {
                    btnCopiar.innerText = "Copiar Chave Pix";
                    btnCopiar.style.backgroundColor = "";
                }, 3000);
            }).catch(err => {
                console.error("Erro ao copiar: ", err);
            });
        };
    }
});
