function renderTabela(produtos){
    var str=`
    <h3>Tabela de Produtos</h3>
    <a id='novo' href="#">Novo</a>
    <div id="tabela">

    <table>
        <tr>
            <th style='text-align: left;'>Id</th>
            <th style='text-align: left;'>Nome</th>
            <th style='text-align: left;'>Preço</th>
            <th style='text-align: left;'>Categoria</th>
            <th style='text-align: left;'>Marca</th>
            <th colspan="2">Ação</th>
        </tr>`;

    for(var i in produtos){
        str+=`<tr id=${produtos[i].id_produto}>
                <td>${produtos[i].id_produto}</td>
                <td>${produtos[i].nome}</td>
                <td>${produtos[i].preco}</td>
                <td>${produtos[i].categoria}</td>
                <td>${produtos[i].marca}</td>
                <td><a class="edit" href="#" 
                    data-id="${produtos[i].id_produto}">Editar</a></td>
                <td><a class="delete" href="#" 
                    data-id="${produtos[i].id_produto}">Deletar</a></td>
            </tr>`;
            
    } 
    str+= `
    </table>
    </div>`;

    var tabela = document.querySelector("main");
    tabela.innerHTML = str;

    var linkNovo = document.querySelector("#novo");
    linkNovo.onclick = function(event){
        carregarForm();
    }

    const linksEdit = document.querySelectorAll(".edit");
    for(let linkEdit of linksEdit) {
        linkEdit.onclick = function(event){
            onEdit(event.target.getAttribute("data-id"));
        }
    }

    const linksDelete = document.querySelectorAll(".delete");
    for(let linkDelete of linksDelete) {
        linkDelete.onclick = function(event){
            onDeletar(event.target.getAttribute("data-id"));
        }
    }

}