let vendas = [];
let id = 1;

function cadastrarVenda() {

    const nomeInput = document.getElementById("nome-vendedor");
    const valorInput = document.getElementById("valor");

    const vendedor = nomeInput.value
    .trim()
    .replace(/\s+/g, " ");

    const valor = parseFloat(valorInput.value);

    if (!vendedor) {
        alert("Digite o nome do vendedor!");
        nomeInput.focus();
        return;
    }

    if (/^[A-Za-zÀ-ÿ]{2,}(?:\s+[A-Za-zÀ-ÿ]{2,})+$/.test(vendedor)) {
        alert("Digite nome e sobrenome (apenas letras).");
        nomeInput.focus();
        return;
    }

    if (isNaN(valor) || valor <= 0) {
        alert("Digite um valor válido maior que 0!");
        valorInput.focus();
        return;
    }

    if (valor > 10000000) {
        alert("Valor muito alto!");
        valorInput.focus();
        return;
    }

    const desconto = valor * 0.10;
    const valorFinal = valor - desconto;

    const newVenda = {
        id: id++,
        vendedor: formatarNome(vendedor),
        valor: valor,
        desconto: desconto,
        valorFinal: valorFinal,
        data: new Date().toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        })
    };

    vendas.push(newVenda);

    nomeInput.value = "";
    valorInput.value = "";
    nomeInput.focus();

    atualizarTabela();
}

function formatarNome(nome) {
    return nome
        .toLowerCase()
        .split(" ")
        .filter(p => p)
        .map(p => p.charAt(0).toUpperCase() + p.slice(1))
        .join(" ");
}

function atualizarTabela() {
    const tabela = document.getElementById("tabela");
    tabela.innerHTML = "";

    vendas.forEach(venda => {
        tabela.innerHTML += `
        <tr>
            <td>${venda.id}</td>
            <td>${venda.vendedor}</td>
            <td>R$ ${venda.valor.toFixed(2)}</td>
            <td>10%</td>
            <td>R$ ${venda.valorFinal.toFixed(2)}</td>
            <td>${venda.data}</td>
            <td><button onclick="removerVenda(${venda.id})">Excluir</button></td>
        </tr>
        `;
    });
}

function removerVenda(idVenda) {
    vendas = vendas.filter(v => v.id !== idVenda);
    atualizarTabela();
}

function limparLista() {
    if (confirm("Tem certeza que deseja limpar tudo?")) {
        vendas = [];
        atualizarTabela();
    }
}