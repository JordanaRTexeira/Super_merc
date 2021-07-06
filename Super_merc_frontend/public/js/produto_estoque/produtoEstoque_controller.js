function iniciaProdutos(){
    carregarProdutos()
}

function carregarProdutos() {
    listarProdutos((erro, produtos) => {
        console.log(produtos);
        renderTabela(produtos);
    })
}

function carregarForm(produto){
    renderForm(produto);
}

function salvarProduto(produto){
    if(!produto.id_produto) {
        inserirProduto(produto, (erro,produto)=> {
            carregarProdutos();
            limparCampos();
        })    
    }
    else {
        atualizarProduto(produto.id_produto, produto, (erro, produto) => {
            carregarProdutos();
            limparCampos();
        })
    }
}

//Eventos
function onSalvar(produto){
    console.log("Produto: "+ produto);
    salvarProduto (produto)
}

function onCancelar(){
    carregarProdutos();
}

function onDeletar(id){
    deletarProduto(id, (erro, produto) => {
        alert(`Produto ${produto.nome} removido com sucesso!`);
        carregarProdutos();
    });
}

function onEdit(id){
    buscarProduto(id, (erro, produto) => {
        console.log("Carregando Produto "+produto.nome);
        carregarForm(produto);
    });
}



