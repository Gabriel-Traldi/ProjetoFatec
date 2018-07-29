var urlApi = 'http://localhost:52481/api/Paciente/';

obterTodos();

var tabela = document.querySelector('#clientes');

var cliente = {
    nome: document.querySelector('#nome'),
    cpf: document.querySelector('#cpf'),
    historico: document.querySelector('#historico')
};

document.querySelector('.form').addEventListener('submit', function(event){
    event.preventDefault();
    
    var obj = {
        nome: cliente.nome.value,
        cpf: cliente.cpf.value,
        historico: cliente.historico.value
    };

    inserir(obj);

});

function inserir(obj){

    var request = new Request(urlApi, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(obj)
    });

    fetch(request)
        .then(function(response){
            return response.json();
        })
        .then(function(paciente){
            alert("Incluído com sucesso");
            obterTodos();
        })
        .catch(function(response){
            console.log(response);
        });

}

function obterTodos(){

    var request = new Request(urlApi, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });

    fetch(request)
        .then(function(response){
            if(response.status == 200)
                return response.json();
            alert('Sua requisição falhou.');
        })
        .then(function(pacientes){
            console.log(pacientes);
            update(pacientes);
        })
        .catch(function(response){
            console.log(response);
        });

}

function template(clientes){
    return `
    <table class="table table-hover table-bordered">
        <thead>
            <tr>
                <th>NOME</th>
                <th>CPF</th>
                <th>HISTÓRICO</th>
            </tr>
        </thead>
        <tbody>
        ${
            clientes.map(function(paciente){
                return `
                    <tr>
                        <td>${paciente.nome}</td>
                        <td>${paciente.cpf}</td>
                        <td>${paciente.historico || "Sem histórico"}</td>
                    </tr>
                `;
            }).join('')
        }
        </tbody>
    </table>
    `;
}

function update(clientes){
    tabela.innerHTML = template(clientes);
}