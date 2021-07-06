function iniciaClientes(){
    carregarClientes()
}

function carregarClientes() {
    listarClientes((erro, usuarios) => {
        console.log(usuarios);
        renderTabela(usuarios);
    })
}

function carregarForm(usuario){
    renderForm(usuario);
}

function salvarCliente(usuario){
    if(!usuario.id_usuario) {
        inserirCliente(usuario, (erro,usuario)=> {
            carregarClientes();
            limparCampos();
        })    
    }
    else {
        atualizarCliente(usuario.id_usuario, usuario, (erro, usuario) => {
            carregarClientes();
            limparCampos();
        })
    }
}

//Eventos
function onSalvar(usuario){
    console.log("Usuario: "+ usuario);
    salvarCliente (usuario)
}

function onCancelar(){
    carregarClientes();
}

function onDeletar(id){
    deletarCliente(id, (erro, usuario) => {
        alert(`Usuario ${usuario.nome} removido com sucesso!`);
        carregarClientes();
    });
}

function onEdit(id){
    buscarCliente(id, (erro, usuario) => {
        console.log("Carregando Usuario "+usuario.nome);
        carregarForm(usuario);
    });
}



