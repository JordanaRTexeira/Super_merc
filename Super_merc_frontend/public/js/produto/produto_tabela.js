function renderTabela(produtos){
    var str=`
    <h3>Tabela de Produtos</h3>
    <a id='novo' href="#"></a>
    <div id="tabela">
    <table>
        <tr>
            
            <th style='text-align: left;'></th>
            <th style='text-align: left;'></th>
            <th style='text-align: left;'></th>
            
        </tr>`;

    for(var i in produtos){
        str+=`<tr id=${produtos[i].id}>
                <td>${produtos[i].nome}</td>
                <td>${produtos[i].preco}</td>
                <td>${produtos[i].marca}</td>

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