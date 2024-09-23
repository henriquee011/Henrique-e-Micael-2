let palavraAtual;
let dicaAtual;
let letrasAdivinhadas = new Set(); // Usando Set para melhor performance
const tentativasMaximas = 6;
let tentativasRestantes;

function normalizarString(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}


function iniciarJogo() {
    const indiceAleatorio = Math.floor(Math.random() * palavras.length);
    palavraAtual = palavras[indiceAleatorio];
    dicaAtual = dicas[indiceAleatorio];
    letrasAdivinhadas.clear();
    tentativasRestantes = tentativasMaximas;
    atualizarDisplayDoJogo();
    resetarBoneco ();
}

function resetarBoneco() {
    tentativasRestantes = tentativasMaximas; 
    desenharBoneco(); 
}

function atualizarDisplayDoJogo() {
    const palavraExibida = palavraAtual.split('').map(letra => 
        letrasAdivinhadas.has(letra) || letra === ' ' ? letra : '_'
    ).join('');

    document.getElementById("palavra").textContent = palavraExibida;
    document.getElementById("dica").textContent = `Dica: ${dicaAtual}`;
    document.getElementById("status").textContent = `Tentativas restantes: ${tentativasRestantes}`;
    document.getElementById("attempts").textContent = `Letras já tentadas: ${Array.from(letrasAdivinhadas).join(", ")}`;
}

function adivinharLetra() {
    const entradaAdivinhacao = document.getElementById("guess");
    const letraAdivinhada = normalizarString(entradaAdivinhacao.value);




    if (letraAdivinhada.length === 1 && /^[a-záéíóúãõç\s]+$/.test(letraAdivinhada)) {
        if (!letrasAdivinhadas.has(letraAdivinhada)) {
            letrasAdivinhadas.add(letraAdivinhada);

            if (!palavraAtual.includes(letraAdivinhada)) {
                tentativasRestantes--;
            }

            atualizarDisplayDoJogo();
            desenharBoneco();

            if (verificarVitoria()) {
                document.getElementById("status").textContent = "Você venceu!";
            } else if (tentativasRestantes <= 0) {
                document.getElementById("status").textContent = `Você perdeu! A palavra era: ${palavraAtual}`;
            }
        }
    }

    entradaAdivinhacao.value = "";
}

function verificarVitoria() {
    return palavraAtual.split('').every(letra => 
        letrasAdivinhadas.has(letra) || letra === ' '
    );
}

document.addEventListener("DOMContentLoaded", iniciarJogo);
