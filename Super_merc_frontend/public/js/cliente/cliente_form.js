function renderForm(usuario) {
    //Se produto estiver indefinido, cria novo produto.
    if(!usuario) {
        usuario = {};
    }
    
    var str = `
    <h2>Formulario de Clientes</h2>
    <form id="formularioUser">
        <label for="txtnome">Nome:</label>
        <input type="text" id="txtnome" value="${usuario.nome ?usuario.nome : ''}">
        <br />
        <label for="txtemail">Email:</label>
        <input type="text" id="txtemail" value="${usuario.email ?usuario.email : ''}">
        <br />
        <label for="txtsenha">Senha:</label>
        <input type="text" id="txtsenha" value="${usuario.senha ?usuario.senha : ''}">
        <br />
        <br />
        <br />
        <input type="submit" id="btnsalvar" value="Salvar">
        <input type="reset" id="btncancelar" value="Cancelar">
        <br />
    </form>
    `;

    let containerForm = document.querySelector("main");
    containerForm.innerHTML = str;

    var form = document.querySelector("#formularioUser");

    form.onsubmit = function(event){
        event.preventDefault();
        onSalvar(getDataUsuario(usuario));            
    }

    form.onreset = function(event){
        event.preventDefault();
        onCancelar();
    }
    
}

function getDataUsuario(usuario){
    usuario.nome = document.querySelector("#txtnome").value;
    usuario.email = document.querySelector("#txtemail").value;
    usuario.senha = document.querySelector("#txtsenha").value;
    return usuario;
}

function limparCampos(){
    document.querySelector("#txtnome").value="";
    document.querySelector("#txtemail").value="";
    document.querySelector("#txtsenha").value="";
}

