function renderForm(produto) {
    //Se produto estiver indefinido, cria novo produto.
    if(!produto) {
        produto = {};
    }
    
    var str = `
    <h2>Formulario de Produtos</h2>
    <form id="formulario">
        <label for="txtnome">Nome:</label>
        <input type="text" id="txtnome" value="${produto.nome ?produto.nome : ''}">
        <br />
        <label for="txtuso">Preço:</label>
        <input type="text" id="txtpreco" value="${produto.preco ?produto.preco : ''}">
        <br />
        <label for="txtnome">Categoria:</label>
        <input type="text" id="txtcategoria" value="${produto.categotia ?produto.categoria : ''}">
        <br />
        <label for="txtnome">Marca:</label>
        <input type="text" id="txtmarca" value="${produto.marca ?produto.marca : ''}">
        <br />
        <br />
        <br />
        <input type="submit" id="btnsalvar" value="Salvar">
        <input type="reset" value="Cancelar">
        <br />
    </form>
    `;

    let containerForm = document.querySelector("main");
    containerForm.innerHTML = str;

    var form = document.querySelector("#formulario");

    form.onsubmit = function(event){
        event.preventDefault();
        onSalvar(getDataProduto(produto));            
    }

    form.onreset = function(event){
        event.preventDefault();
        onCancelar();
    }
    
}

function getDataProduto(produto){
    produto.nome = document.querySelector("#txtnome").value;
    produto.preco = document.querySelector("#txtpreco").value;
    produto.categoria = document.querySelector("#txtcategoria").value;
    produto.marca = document.querySelector("#txtmarca").value;
    return produto;
}

function limparCampos(){
    document.querySelector("#txtnome").value="";
    document.querySelector("#txtpreco").value="";
    document.querySelector("#txtcategoria").value="";
    document.querySelector("#txtmarca").value="";
}
