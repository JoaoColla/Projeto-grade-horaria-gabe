document.addEventListener('DOMContentLoaded', function(){
    const profBtn = document.getElementById('profBtn');
    const alunoBtn = document.getElementById('alunoBtn');
    const inputNome = document.getElementById('nomeTexto'); 
    const inputSenha = document.getElementById('senhaTexto'); 

    profBtn.addEventListener('click', function(){
        if (inputNome.value === 'ped@gogos' && inputSenha.value === '123'){ 
            window.location.href = './pedagogos/index.html';
        } else {
            alert('Opa, há algo de errado! Por favor, tente novamente.');
            
            inputNome.value = '';
            inputSenha.value = '';
        }
    });

    alunoBtn.addEventListener('click', function(){
        window.location.href = './alunos/index.html';
    });
});