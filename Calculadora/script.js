class Calculadora {
    constructor() {
        this.operacao = [];
        this.visor = window.document.getElementById("visorInfo");
        this.status = "desligado";
    }

    ligarCalculadora() {
        this.status = "ligado";
        this.operacao = [];
        this.ligarVisor();
    }

    ligarVisor() {
        this.visor.innerText = "0";
    }

    lerValores(valorDigitado) {
        if (this.status === "desligado") {
            console.error(this.status);
            return;
        }

        this.operacao.push(valorDigitado);
        this.exibeValoresDigitados(this.operacao.join(""));
    }

    exibeValoresDigitados(valor) {
        if (String(valor).length < 9) {
            this.visor.innerText = valor;
        } else {
            this.visor.innerText = String(valor).slice(0, 8) + "...";
        }
    }

    handleOperacoes(operacao) {
        try {
            let result = eval(this.operacao.join(""));
            this.exibeValoresDigitados(result);
            this.operacao = [result];
        } catch (error) {
            this.exibeValoresDigitados("Erro");
        }
    }

    apagaUltimoDigito() {
        this.operacao.pop();
        this.exibeValoresDigitados(this.operacao.join(""));
    }

    handleRaizQuadrada() {
        if (this.operacao.length === 0) {
            this.exibeValoresDigitados("Erro");
            return;
        }
        
        const ultimoValor = parseFloat(this.visor.innerText);
        if (isNaN(ultimoValor) || ultimoValor < 0) {
            this.exibeValoresDigitados("Erro");
        } else {
            const resultado = Math.sqrt(ultimoValor);
            this.exibeValoresDigitados(resultado);
            this.operacao = [resultado]; // Armazena o resultado
        }
    }

    handlePorcentagem() {
        if (this.operacao.length === 0) {
            this.exibeValoresDigitados("Erro");
            return;
        }

        // Pega o valor atual do visor
        const valorAtual = parseFloat(this.visor.innerText);
        if (isNaN(valorAtual)) {
            this.exibeValoresDigitados("Erro");
            return;
        }

        // Calcula a porcentagem (a porcentagem é considerada como 1% do valor atual)
        const resultado = valorAtual / 100; // Para calcular 1% do valor
        this.exibeValoresDigitados(resultado);
        this.operacao = [resultado]; // Armazena o resultado
    }
}

var calculadora = new Calculadora();

const listaDeNumeros = Array.from(document.getElementsByClassName('numeros'));
listaDeNumeros.forEach((element) => {
    element.addEventListener('click', (event) => {
        calculadora.lerValores(event.target.value);
    });
});

const listaOperadores = Array.from(document.getElementsByClassName('operadores'));
listaOperadores.forEach((element) => {
    element.addEventListener('click', (event) => {
        if (event.target.value === "√") {
            calculadora.handleRaizQuadrada(); // Chama a função para raiz quadrada
        } else if (event.target.value === "%") {
            calculadora.handlePorcentagem(); // Chama a função para porcentagem
        } else {
            calculadora.lerValores(event.target.value); // Para outros operadores
        }
    });
});