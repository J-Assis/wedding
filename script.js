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
        document.getElementById("countdown").innerHTML = "É HOJE! ✨";
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

function abrirPix(nome, valor){

    const nomePresente = document.getElementById("pixGiftName");
    const valorPresente = document.getElementById("pixValue");
    const modal = document.getElementById("pixModal");

    if(nomePresente && valorPresente && modal){

        nomePresente.innerText = nome;
        valorPresente.innerText = "Valor sugerido: R$ " + valor;

        modal.style.display = "flex";
    }
}

function fecharPix(){

    const modal = document.getElementById("pixModal");

    if(modal){
        modal.style.display = "none";
    }
}
