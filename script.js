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

function abrirPix(nome, valor, chave) {
    console.log("Botão clicado:", nome, valor, chave); // Debug para testar

    const modal = document.getElementById("pixModal");
    const nomePresente = document.getElementById("modalGiftName");
    const valorPresente = document.getElementById("pixValue");
    const inputPix = document.getElementById("pixKeyInput");
    const btnCopiar = document.getElementById("btn-copiar-pix");

    if (modal && nomePresente && valorPresente && inputPix) {
        // Preenche os dados
        nomePresente.innerText = nome;
        valorPresente.innerText = "Valor sugerido: R$ " + valor;
        inputPix.value = chave;

        // Reseta o botão de copiar para o estado original
        if (btnCopiar) {
            btnCopiar.innerText = "Copiar Chave Pix";
            btnCopiar.style.backgroundColor = ""; 
        }

        // Abre o modal
        modal.classList.add("ativo");
        modal.style.display = "flex"; // Força a exibição caso o CSS falhe
    } else {
        console.error("Erro: Algum elemento do modal não foi encontrado no HTML.");
    }
}

function fecharPix() {
    const modal = document.getElementById("pixModal");
    if (modal) {
        modal.classList.remove("ativo");
        modal.style.display = "none";
    }
}

// Lógica do Botão Copiar e Fechamento (Rodar após o site carregar)
document.addEventListener("DOMContentLoaded", function() {
    const btnCopiar = document.getElementById("btn-copiar-pix");
    const inputPix = document.getElementById("pixKeyInput");
    const modal = document.getElementById("pixModal");

    if (btnCopiar && inputPix) {
        btnCopiar.onclick = function() {
            inputPix.select();
            inputPix.setSelectionRange(0, 99999);
            navigator.clipboard.writeText(inputPix.value).then(() => {
                btnCopiar.innerText = "Copiado! ✔";
                btnCopiar.style.backgroundColor = "#8ca67a";
                setTimeout(() => {
                    btnCopiar.innerText = "Copiar Chave Pix";
                    btnCopiar.style.backgroundColor = "";
                }, 3000);
            });
        };
    }

    // Fecha o modal ao clicar fora dele
    window.onclick = function(event) {
        if (event.target == modal) {
            fecharPix();
        }
    };
    
    // Configura o botão de fechar (X)
    const btnFechar = document.querySelector(".close-modal");
    if(btnFechar) {
        btnFechar.onclick = fecharPix;
    }
});
