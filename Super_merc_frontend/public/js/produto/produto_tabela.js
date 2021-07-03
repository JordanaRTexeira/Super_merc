function renderTabela(produtos){
    var str=`
    <h3>Tabela de Produtos</h3>
    <div id="tabela">

    <table>
    
    
     `;
    
    for(var i in produtos){
        
        str+=`<tr id=${produtos[i].id}>

                <td>${produtos[i].nome}</td>
                <td>R$${produtos[i].preco}</td>
                <td>${produtos[i].marca}</td>
              
            </tr>`;
            
    } 
    str+= `
    </table>
    </div>`;

    var tabela = document.querySelector("main");
    tabela.innerHTML = str;

}