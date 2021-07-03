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







