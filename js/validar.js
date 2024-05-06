var nome = document.querySelector("#inputName");
var nomeHelp = document.querySelector("#inputNameHelp");
var ano = document.querySelector("#inputYear");
var anoHelp = document.querySelector("#inputYearHelp");
var email = document.querySelector("#inputEmail");
var emailHelp = document.querySelector("#inputEmailHelp");
var senha = document.querySelector("#inputPassword");

// Event listener para validação de nome ao perder o foco
nome.addEventListener('focusout', validarNome);

function validarNome(e) {
    const regexNome = /^[a-zA-Z ]{7,}$/; // Ajuste para permitir espaços e exigir mais de 6 caracteres
    if (!e.target.value.trim().match(regexNome)) {
        nomeHelp.textContent = "Nome deve conter apenas letras e ser maior que 6 caracteres";
        nomeHelp.style.color = "red";
    } else {
        nomeHelp.textContent = "";
    }
}

// Event listener para validação de ano ao perder o foco
ano.addEventListener('focusout', validarAno);

function validarAno() {
    const anoValor = parseInt(ano.value.trim());
    if (isNaN(anoValor) || anoValor < 1900 || anoValor > 2022) {
        anoHelp.textContent = "Ano de nascimento deve estar entre 1900 e 2022.";
        anoHelp.style.color = "red";
    } else {
        anoHelp.textContent = "";
    }
}

// Event listener para validação de email ao perder o foco
email.addEventListener('focusout', validarEmail);

function validarEmail() {
    const regexEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.(br|com|net|org)$/;
    if (!email.value.trim().match(regexEmail)) {
        emailHelp.textContent = "Email deve seguir o formato correto (ex: exemplo@dominio.com).";
        emailHelp.style.color = "red";
    } else {
        emailHelp.textContent = "";
    }
}


// Event listener para validação de senha ao perder o foco
senha.addEventListener('focusout', validarSenha);
function validarSenha() {
    const senhaMeter = document.getElementById("passStrengthMeter");
    const senhaHelp = document.getElementById("inputPasswordHelp");

    // Reseta o medidor para o estado inicial
    senhaMeter.value = 0;
    senhaMeter.style.backgroundColor = "#ff3e3e"; // Vermelho para senha inaceitável

    // Verifica se a senha contém nome ou ano de nascimento
    if (senha.value.includes(nome.value.trim()) || senha.value.includes(ano.value.trim())) {
        senhaHelp.textContent = "Senha inválida.";
        senhaHelp.style.color = "red";
        return;
    }

    // Chama a função de classificação de senha
    classificarSenha(senha.value, senhaMeter, senhaHelp);
}

function classificarSenha(senha, senhaMeter, senhaHelp) {
    const specialChars = /[!@#%&+]/g;
    const numbers = /\d/g;
    const upperCase = /[A-Z]/g;
    
    const specialCharsCount = (senha.match(specialChars) || []).length;
    const numbersCount = (senha.match(numbers) || []).length;
    const upperCaseCount = (senha.match(upperCase) || []).length;

    if (senha.length > 12 && specialCharsCount > 1 && numbersCount > 1 && upperCaseCount > 1) {
        // Senha forte
        senhaMeter.value = 30;
        senhaMeter.style.backgroundColor = "#32CD32"; // Verde
        senhaHelp.textContent = "Força da senha: forte";
        senhaHelp.style.color = "green";
    } else if (senha.length > 8 && specialCharsCount >= 1 && numbersCount >= 1 && upperCaseCount >= 1) {
        // Senha moderada
        senhaMeter.value = 20;
        senhaMeter.style.backgroundColor = "#ffa500"; // Laranja
        senhaHelp.textContent = "Força da senha: moderada";
        senhaHelp.style.color = "green";
    } else if ((senha.length < 8 || senha.length > 8) && specialCharsCount >= 1 && numbersCount >= 1) {
        // Senha fraca
        senhaMeter.value = 10;
        senhaMeter.style.backgroundColor = "#ff3e3e"; // Vermelho
        senhaHelp.textContent = "Força da senha: fraca";
        senhaHelp.style.color = "green";
    }
}

