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
    // 
    if (idInput) {
        idadeInput.value = " ";
        idInput.readOnly = true;
    }
};


//  --- Funções CRUD (Create, Read, Update, Delete) ---

/**
 * Salva (Adiciona ou atualiza) uma pessoa no localStorage
 *  - Se o ID estiver editável(modo Adiciona): Impede a adição se ID já existir
 *  - Se o ID não estiver editável (modo Atualizar): Atualiza o registro existente
 */
function salvar(){
    // 1. Valida o formulário primeiro
    if(!validaFormulario){
        return; //interrompe se a validação 
    }

    // 2. Obtém os valores dos campos do formulário
    const idInput = document.getElementById('id');
    const nomeInput = document.getElementById('nome');
    const idadeInput = document.getElementById('idadeInput');
    
}