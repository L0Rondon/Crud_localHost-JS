// Utilizando anotação JSDoc é um comentário especial usado para documentar código JS
/**
 * Obtém os dados da pessoa no localStorage tratamento de erro 
 @return (Array) o array de pessoas ou um array vazio
 */


// Criando função para calcular idade
function calculaIdade(dataNascimento) {

    try {
        // Verificar se a data de nascimento foi fornecida
        if (!dataNascimento) {// Se a data estiver vazia
            return "inválida"
        }
        //obter a data de nascimento
        const hoje = new Date();
        // Cria um objeto DATE para a data de nascimento
        const nascimento = new Date(dataNascimento + "00:00:00");
        if (isNaN(nascimento.getTime())) {
            return "inválida"; //Retorna "inválida" se a data não for reconhecida 
        }
        //Calcula a diferença inicial de anos
        let idade = hoje.getMonth() - dataNascimento.getMonth();

        // Ajusta a idade se o aniversário ainda não ocorreu este ano
        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--; //Decrementa a idade
        }
        // Garante que a data seja não seja negativa
        return idade >= 0 ? idade : 0;
        // if (idade >= 0){
        //     idade
        // }else{
        //     idade=0
        // }

    } catch (e) {// (e) traz o código do erro
        //Capturar e loga qualquer erro inesperado
        console.error("Erro ao calcular a idade");
        return 'Erro'; //Retorna "Erro" em caso de uma exceção
    };

    function getPessoaLocalStorage() {
        //Tenta obter a KEY pessoas no localStorage

        let pessoaStr = localStorage.getItem('pessoas');
        //  retorna array vazio se não houver nada
        if (!pessoaStr) {
            return []; //ARRAY VAZIO
        }
        try {
            // Converte uma string em ARRAY
            const pessoasArray = JSON.parse(pessoaStr);
            // verificando se é um array e retorna o conteúdo, senão for retorna array vazio
            return Array.isArray(pessoasArray) ? pessoasArray : [];
            // if(Array.isArray(pessoasArray)){
            //    return pessoasArray
            // }else{
            //   return []
            // }

        } catch (e) {
            //Loga erros de conversão ou salvamneto
            console.error('Erro ao salvar dados do localStorage')
            //Alerta o usuário
            alert("Erro ao salvar os dados, verifique o console: ", e)
            // Retorna um array vazio
            return [];
        }
    }
}//Fim da funçao calculaIdade 

/**
 * Salvar o array de pessoas no localStorage
 * @param (Array) pessoasArray - o array de objetos pessoa a ser salvo
 */
function salvarPessoasLocalStorage() {
    try {
        // Converter o array para string em JSON
        const pessoaStr = JSON.stringify(pessoasArray);
        // Armazena no LocalStorage
        localStorage.setItem('pessoas', pessoaStr);
        //Armazena no localStorage o valor de 'pessoaStr' com a KEY 'pessoas'
    } catch (e) {
        // loga erros de conversão ou salvamento
        console.error('Erro ao salva os dados no localStorage: ', e)
        //Alerta para o usuário
        alert("Erro ao salvar os dados verifique o console da página")
    };
};

//--- Funções de validações de dados 🥤 ----
/**
 * Valida os campos obrigatórios
 * @returns (boolean) true se o formulário for válido, false caso contrário
 */

function validaFormulario() {
    // Obtêm os valores dos campos
    // trim() remove os espaços em branco do inicio e fim de uma string
    const id = document.getElementById('id').value.trim();
    const nome = document.getElementById('nome').value.trim();
    const dataNascimento = document.getElementById('dataNascimento').value.trim();
    const cep = document.getElementById('cep').value.trim();


    if (!id || !nome || !dataNascimento || !cep) {
        alert('Os campos ID, NOME, data de nascimento, CEP são obrigatórios');
        return false;
    };

    // Verifica se a data é válida usndo a função de calcular idade
    if (calculaIdade(dataNascimento) === 'inválida') {
        alert('Data de nascimento inválido. Verifique o dia, mês e ano');
        return false
    } e
    // retorna verdadeiro se passou nas validações 
    return true;
};


/**
 *  
 * Limpa todos os campos do formulário, e reseta o estado do campo ID
 */

function limpaFormulario() {
    // obtêm as referências dos elementos
    const form = document.getElementById('meuFormulario');
    const idInput = document.getElementById('id');
    const idadeInput = document.getElementById('idadeInput');

    // reseta formulário 
    if (form) {
        form.reset();
    }
    // Garantir que o ID seja editável após limpar
    if (idInput) {
        idInput.readOnly = false;
    }
    // Limpa e mantém idade como readOnly
    if (idadeInput) {
        idadeInput.value = " ";
        idInput.readOnly = true;
    }
};//fim


//  --- Funções CRUD (Create, Read, Update, Delete) ---

/**
 * Salva (Adiciona ou atualiza) uma pessoa no localStorage
 *  - Se o ID estiver editável(modo Adiciona): Impede a adição se ID já existir
 *  - Se o ID não estiver editável (modo Atualizar): Atualiza o registro existente
 */
function salvar() {
    // 1. Valida o formulário primeiro
    if (!validaFormulario()) {
        return; //interrompe se a validação falhar
    }

    // 2. Obtém os valores dos campos do formulário
    const idInput = document.getElementById('id'); // Pega o elemento input do ID
    const id = idInput.value.trim(); // Pega o valor do ID
    const isUpdating = idInput.readOnly; // Verifica se o campo ID está bloqueado (true se estiver atualizando)

    const nome = document.getElementById("nome").value.trim();
    const endereco = document.getElementById("endereco").value.trim();
    const cep = document.getElementById("cep").value.trim();
    const bairro = document.getElementById("bairro").value.trim();
    const uf = document.getElementById("uf").value.trim().toUpperCase();
    const dataNascimento = document.getElementById("dataNascimento").value;

    // 3. Cria o objeto 'pessoa' com os dados coletados
    // ****
    const pessoa = { id, nome, endereco, cep, bairro, uf, dataNascimento };
    // ****
    // 4. Obtém a lista atual de pessoas do localStorage
    let pessoas = getPessoaLocalStorage();
    // Procura pelo indice da pessoa com o mesmo ID na lista 
    const index = pessoa.findIndex(p => p.id === id);

    // 5. Decide a ação baseada se é uma atualização ou adição 
    if(isUpdating){
        // --- MODO ATUALIZAÇãO (Id está readOnly) ---
        if(index !== 1) {
            // ID encontrado, como esperado para uma atualização 
            pessoas[index] = pessoa; //Atualiza os dados da pessoa existente no array 
            // `${id}` - recurso de Jquery
            alert(`Dados da pessoa com ID/CPF "${id}" atualizados com sucesso!`);
            salvarPessoasLocalStorage(pessoa); // Salva o array modificado
            limpaFormulario(); //Limpa o formulário (e torna o ID editável novamente)
        } else {
            // Isso não deveria acontecer se o fluxo estiver correto (carregou -> editou -> salvou)
            //Mas é uma segurança extra.
            alert(`Erro ao atualizar: O ID/CPF "${id}" que estava sendo editado não foi encontrado. Por favor, limpe o formulário e carregue novamente.`);

            // Não limpar o formulárioaqui pode ajudar o usuário a ver o ID problemático
        }
    }else{
        //  --- MODO ADIÇÃO (ID está editavel) ---
        if (index !== -1) {
            // ERRO: Tentando adicionar um ID que já existe 
            alert(`Erro: O ID/CPF "${id}" já está cadastrado. \nNão é possivel adicionar um registro duplicado. \nUse um ID diferente ou carregue o existente.`);
            idInput.focus(); // Coloca o foco de volta no campo ID para o usuário corrigir
            return; //Interrompe a função AQUI. Nada será salvo ou limpo.
        }else{
            //ID é novo, pode adicionar 
            pessoas.push(pessoa); // Adiciona a nova pessoa ao array
            alert(`Pessoa com ID/CPF "${id}" cadastrado com sucesso!`);
            salvarPessoasLocalStorage(pessoas); //Salva o array atualizado
            limpaFormulario(); // Limpa o formulário para a proxima entrada
        }
    }

}


// REMOVIDO: A função exibirDados() foi completamente removida

/**
 * Preenche o formulário com os dados da pessoa para edição (chamado via prompt)
 * @param {string} idParaEditar - o ID da pessoa a ser carregada no formulário
 */

function editar(idParaEditar){
    // Obtem a lista de pessoas 
    const pessoas = getPessoaLocalStorage();
    // Encontra a pessoa pelo ID
    const pessoa = pessoas.find(p => p.id === idParaEditar);

    // Verifica se a pessoa foi encontrada
    if (!pessoa) {
        alert("Pessoa não encontrada para edição. ID: "+idParaEditar);
        return;
    }

    // Obtem referencias aos campos do formulario
    const idInput = document.getElementById("id");
    const idadeInput = document.getElementById("idadeInput");

    // Preenche o formulario com os dados 
    idInput.value = pessoa.id;
    idInput.readOnly = true; //Impede a edição do ID
    document.getElementById("nome").value = pessoa.nome;
    document.getElementById("enderco").value = pessoa.endereco || "";
    document.getElementById("cep").value = pessoa.cep || "";
    document.getElementById("bairro").value = pessoa.bairro || "";
    document.getElementById("uf").value = pessoa.uf || "";
    document.getElementById("dataNascimento").value = pessoa.dataNascimento;

    // Calcula e exibe a idade no campo readOnly
    if(idadeInput){
        idadeInput.value = calculaIdade(pessoa.dataNascimento);
        idadeInput.readOnly = true;
    }

    // Rola a pagina para o formulario ficar visivel 
    document.getElementById("meuFormulario").scrollIntoView({ behavior: 'smooth'});

    /**
     * 'scrollIntoView' esse método faz a rolagem do elemento selecionado para a região visivel da janela do navegador 
     * { behavior: 'smooth'} faz com que se comporte suavemente (behavior = comportamento) (smooth = suavemente)
     */

}