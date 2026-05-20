document.addEventListener('deviceready', iniciarApp, false);
document.addEventListener('DOMContentLoaded', iniciarApp, false);

let appIniciado = false;

function iniciarApp() {
    if (appIniciado) return;
    appIniciado = true;

    const display = document.getElementById('display');
    const operation = document.getElementById('operation');
    const keys = document.querySelector('.keys');

    let valorAtual = '0';
    let valorAnterior = null;
    let operadorAtual = null;
    let deveLimparDisplay = false;

    function atualizarTela() {
        display.textContent = valorAtual;
        operation.textContent = valorAnterior !== null && operadorAtual
            ? `${formatarOperacao(valorAnterior)} ${simboloOperador(operadorAtual)}`
            : '0';
    }

    function inserirNumero(numero) {
        if (numero === '.' && valorAtual.includes('.') && !deveLimparDisplay) return;

        if (deveLimparDisplay) {
            valorAtual = numero === '.' ? '0.' : numero;
            deveLimparDisplay = false;
            atualizarTela();
            return;
        }

        if (valorAtual === '0' && numero !== '.') {
            valorAtual = numero;
        } else {
            valorAtual += numero;
        }

        atualizarTela();
    }

    function escolherOperador(operador) {
        if (operadorAtual && !deveLimparDisplay) {
            calcular();
        }

        valorAnterior = parseFloat(valorAtual);
        operadorAtual = operador;
        deveLimparDisplay = true;
        atualizarTela();
    }

    function calcular() {
        if (operadorAtual === null || valorAnterior === null) return;

        const atual = parseFloat(valorAtual);
        let resultado;

        switch (operadorAtual) {
            case '+':
                resultado = valorAnterior + atual;
                break;
            case '-':
                resultado = valorAnterior - atual;
                break;
            case '*':
                resultado = valorAnterior * atual;
                break;
            case '/':
                if (atual === 0) {
                    valorAtual = 'Erro';
                    valorAnterior = null;
                    operadorAtual = null;
                    deveLimparDisplay = true;
                    atualizarTela();
                    return;
                }
                resultado = valorAnterior / atual;
                break;
            default:
                return;
        }

        valorAtual = String(Number(resultado.toFixed(8)));
        valorAnterior = null;
        operadorAtual = null;
        deveLimparDisplay = true;
        atualizarTela();
    }

    function limpar() {
        valorAtual = '0';
        valorAnterior = null;
        operadorAtual = null;
        deveLimparDisplay = false;
        atualizarTela();
    }

    function apagar() {
        if (deveLimparDisplay || valorAtual === 'Erro') {
            valorAtual = '0';
            deveLimparDisplay = false;
        } else {
            valorAtual = valorAtual.length > 1 ? valorAtual.slice(0, -1) : '0';
        }
        atualizarTela();
    }

    function simboloOperador(operador) {
        return {
            '+': '+',
            '-': '−',
            '*': '×',
            '/': '÷'
        }[operador] || operador;
    }

    function formatarOperacao(valor) {
        return Number.isInteger(valor) ? String(valor) : String(Number(valor.toFixed(8)));
    }

    keys.addEventListener('click', (event) => {
        const botao = event.target.closest('button');
        if (!botao) return;

        const numero = botao.dataset.number;
        const operador = botao.dataset.operator;
        const acao = botao.dataset.action;

        if (numero !== undefined) inserirNumero(numero);
        if (operador) escolherOperador(operador);
        if (acao === 'calculate') calcular();
        if (acao === 'clear') limpar();
        if (acao === 'backspace') apagar();
    });

    atualizarTela();
}
