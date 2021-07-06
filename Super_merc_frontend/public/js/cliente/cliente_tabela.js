function renderTabela(usuarios){
    var str=`
    <h3>Tabela de Clientes</h3>
    <div id="tabela">
    
    <input type="button" id='novo' - href="#" value ="Adicionar Cliente">
    <table>
        <tr>
            <th style='text-align: center;'>Id</th>
            <th style='text-align: center;'>Nome</th>
            <th style='text-align: center;'>Email</th>
            <th style='text-align: center;'>Senha</th>
            <th colspan="2" >Ação</th>
        </tr>`;

    for(var i in usuarios){
        str+=`<tr id=${usuarios[i].id_usuario}>
                <td>${usuarios[i].id_usuario}</td>
                <td>${usuarios[i].nome}</td>
                <td>${usuarios[i].email}</td>
                <td>${usuarios[i].senha}</td>
                <td><a class="edit" href="#" 
                    data-id="${usuarios[i].id_usuario}">Editar</a></td>
                <td><a class="delete" href="#" 
                    data-id="${usuarios[i].id_usuario}">Deletar</a></td>
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