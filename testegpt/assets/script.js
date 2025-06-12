// Dados compartilhados entre todas as páginas
const turmas = ['1° DS', '2° DS', '3° DS', '1° ADM', '2° ADM', '3° ADM'];
const turnos = ['Manhã', 'Tarde', 'Noite'];
const professores = ['Prof. Silva', 'Prof. Oliveira', 'Prof. Santos', 'Prof. Souza', 'Prof. Lima'];

// Armazenamento das grades horárias e avisos (persistência durante a sessão)
let gradesHorarias = JSON.parse(localStorage.getItem('gradesHorarias')) || [];
let avisos = JSON.parse(localStorage.getItem('avisos')) || [];
let professoresFaltantes = JSON.parse(localStorage.getItem('professoresFaltantes')) || [];

// Funções compartilhadas
function salvarGrade() {
    const turma = document.getElementById('turma-grade').value;
    const turno = document.getElementById('turno-grade').value;
    
    const aulas = [];
    const linhas = document.querySelectorAll('#tabela-grade tbody tr');
    
    linhas.forEach(linha => {
        const dia = linha.cells[0].textContent;
        const aulasDia = [];
        
        for (let i = 1; i <= 6; i++) {
            aulasDia.push(linha.cells[i].querySelector('input').value);
        }
        
        aulas.push({ dia, aulas: aulasDia });
    });
    
    // Verifica se já existe grade para essa turma/turno
    const index = gradesHorarias.findIndex(g => g.turma === turma && g.turno === turno);
    
    if (index !== -1) {
        gradesHorarias[index] = { turma, turno, aulas };
    } else {
        gradesHorarias.push({ turma, turno, aulas });
    }
    
    localStorage.setItem('gradesHorarias', JSON.stringify(gradesHorarias));
    alert('Grade horária salva com sucesso!');
}

function salvarAviso() {
    const turma = document.getElementById('turma-aviso').value;
    const turno = document.getElementById('turno-aviso').value;
    const texto = document.getElementById('texto-aviso').value;
    const data = new Date().toLocaleDateString();
    
    if (!texto.trim()) {
        alert('Por favor, digite um aviso.');
        return;
    }
    
    avisos.push({ turma, turno, texto, data });
    localStorage.setItem('avisos', JSON.stringify(avisos));
    document.getElementById('texto-aviso').value = '';
    alert('Aviso salvo com sucesso!');
}

function salvarFaltas() {
    const checkboxes = document.querySelectorAll('#faltas-form input[type="checkbox"]:checked');
    const faltasHoje = Array.from(checkboxes).map(cb => cb.value);
    
    // Verifica se já temos faltas registradas hoje
    const hoje = new Date().toLocaleDateString();
    const index = professoresFaltantes.findIndex(f => f.data === hoje);
    
    if (index !== -1) {
        professoresFaltantes[index] = { data: hoje, professores: faltasHoje };
    } else {
        professoresFaltantes.push({ data: hoje, professores: faltasHoje });
    }
    
    localStorage.setItem('professoresFaltantes', JSON.stringify(professoresFaltantes));
    alert('Faltas registradas com sucesso!');
}

// Funções específicas para a página de pedagogos
function carregarAreaPedagogos() {
    const pedagogosSection = document.getElementById('pedagogos-section');
    
    if (!pedagogosSection) return; // Se não estiver na página de pedagogos, sai da função
    
    pedagogosSection.innerHTML = `
        <h2>Área dos Pedagogos</h2>
        
        <div id="grade-form">
            <h3>Cadastrar Grade Horária</h3>
            <div class="form-group">
                <label for="turma-grade">Turma:</label>
                <select id="turma-grade">
                    ${turmas.map(turma => `<option value="${turma}">${turma}</option>`).join('')}
                </select>
            </div>
            
            <div class="form-group">
                <label for="turno-grade">Turno:</label>
                <select id="turno-grade">
                    ${turnos.map(turno => `<option value="${turno}">${turno}</option>`).join('')}
                </select>
            </div>
            
            <div class="form-group">
                <label>Grade Horária:</label>
                <table id="tabela-grade">
                    <thead>
                        <tr>
                            <th>Dia/Hora</th>
                            <th>Aula 1</th>
                            <th>Aula 2</th>
                            <th>Aula 3</th>
                            <th>Aula 4</th>
                            <th>Aula 5</th>
                            <th>Aula 6</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Segunda</td>
                            ${Array(6).fill('<td><input type="text" class="aula-input"></td>').join('')}
                        </tr>
                        <tr>
                            <td>Terça</td>
                            ${Array(6).fill('<td><input type="text" class="aula-input"></td>').join('')}
                        </tr>
                        <tr>
                            <td>Quarta</td>
                            ${Array(6).fill('<td><input type="text" class="aula-input"></td>').join('')}
                        </tr>
                        <tr>
                            <td>Quinta</td>
                            ${Array(6).fill('<td><input type="text" class="aula-input"></td>').join('')}
                        </tr>
                        <tr>
                            <td>Sexta</td>
                            ${Array(6).fill('<td><input type="text" class="aula-input"></td>').join('')}
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <button id="salvar-grade">Salvar Grade</button>
        </div>
        
        <div id="avisos-form">
            <h3>Cadastrar Avisos</h3>
            <div class="form-group">
                <label for="turma-aviso">Turma:</label>
                <select id="turma-aviso">
                    ${turmas.map(turma => `<option value="${turma}">${turma}</option>`).join('')}
                </select>
            </div>
            
            <div class="form-group">
                <label for="turno-aviso">Turno:</label>
                <select id="turno-aviso">
                    ${turnos.map(turno => `<option value="${turno}">${turno}</option>`).join('')}
                </select>
            </div>
            
            <div class="form-group">
                <label for="texto-aviso">Aviso:</label>
                <textarea id="texto-aviso" rows="3"></textarea>
            </div>
            
            <button id="salvar-aviso">Salvar Aviso</button>
        </div>
        
        <div id="faltas-form">
            <h3>Registrar Faltas de Professores</h3>
            <div class="form-group">
                <label>Selecione os professores faltantes hoje:</label>
                ${professores.map(prof => `
                    <div>
                        <input type="checkbox" id="falta-${prof.replace(' ', '-')}" value="${prof}">
                        <label for="falta-${prof.replace(' ', '-')}">${prof}</label>
                    </div>
                `).join('')}
            </div>
            
            <button id="salvar-faltas">Registrar Faltas</button>
        </div>
    `;

    // Event listeners para os botões
    document.getElementById('salvar-grade')?.addEventListener('click', salvarGrade);
    document.getElementById('salvar-aviso')?.addEventListener('click', salvarAviso);
    document.getElementById('salvar-faltas')?.addEventListener('click', salvarFaltas);
}

// Funções específicas para a página de alunos
function carregarAreaAlunos() {
    const alunosSection = document.getElementById('alunos-section');
    
    if (!alunosSection) return; // Se não estiver na página de alunos, sai da função
    
    alunosSection.innerHTML = `
        <h2>Área dos Alunos</h2>
        
        <div id="turma-select">
            <div class="form-group">
                <label for="turma-aluno">Selecione sua turma:</label>
                <select id="turma-aluno">
                    <option value="">-- Selecione --</option>
                    ${turmas.map(turma => `<option value="${turma}">${turma}</option>`).join('')}
                </select>
            </div>
            
            <div class="form-group">
                <label for="turno-aluno">Turno:</label>
                <select id="turno-aluno">
                    <option value="">-- Selecione --</option>
                    ${turnos.map(turno => `<option value="${turno}">${turno}</option>`).join('')}
                </select>
            </div>
        </div>
        
        <div id="grade-container" class="hidden">
            <h3>Grade Horária</h3>
            <table id="grade-turma">
                <!-- Grade será preenchida dinamicamente -->
            </table>
        </div>
        
        <div id="avisos-container" class="hidden">
            <h3>Avisos</h3>
            <div id="lista-avisos">
                <!-- Avisos serão preenchidos dinamicamente -->
            </div>
        </div>
    `;
    
    // Event listeners para a seleção de turma
    document.getElementById('turma-aluno')?.addEventListener('change', carregarGradeAluno);
    document.getElementById('turno-aluno')?.addEventListener('change', carregarGradeAluno);
}

function carregarGradeAluno() {
    const turma = document.getElementById('turma-aluno')?.value;
    const turno = document.getElementById('turno-aluno')?.value;
    
    if (!turma || !turno) return;
    
    // Encontra a grade correspondente
    const grade = gradesHorarias.find(g => g.turma === turma && g.turno === turno);
    
    if (!grade) {
        document.getElementById('grade-container')?.classList.add('hidden');
        document.getElementById('avisos-container')?.classList.add('hidden');
        alert('Grade horária não encontrada para esta turma e turno.');
        return;
    }
    
    // Preenche a tabela da grade
    const tabela = document.getElementById('grade-turma');
    if (tabela) {
        tabela.innerHTML = `
            <thead>
                <tr>
                    <th>Dia/Hora</th>
                    <th>Aula 1</th>
                    <th>Aula 2</th>
                    <th>Aula 3</th>
                    <th>Aula 4</th>
                    <th>Aula 5</th>
                    <th>Aula 6</th>
                </tr>
            </thead>
            <tbody>
                ${grade.aulas.map(aula => {
                    // Verifica faltas de professores para hoje
                    const hoje = new Date().toLocaleDateString();
                    const faltasHoje = professoresFaltantes.find(f => f.data === hoje);
                    
                    return `
                        <tr>
                            <td>${aula.dia}</td>
                            ${aula.aulas.map((prof, i) => {
                                // Verifica se o professor está faltando hoje
                                const isFalta = faltasHoje && faltasHoje.professores.includes(prof);
                                return `<td class="${isFalta ? 'absent' : ''}">${prof || '-'}</td>`;
                            }).join('')}
                        </tr>
                    `;
                }).join('')}
            </tbody>
        `;
    }
    
    // Preenche os avisos
    const avisosTurma = avisos.filter(a => a.turma === turma && a.turno === turno);
    const listaAvisos = document.getElementById('lista-avisos');
    
    if (listaAvisos) {
        if (avisosTurma.length === 0) {
            listaAvisos.innerHTML = '<p>Não há avisos para esta turma.</p>';
        } else {
            listaAvisos.innerHTML = avisosTurma.map(aviso => `
                <div class="aviso-item">
                    <p><strong>${aviso.data}</strong></p>
                    <p>${aviso.texto}</p>
                </div>
            `).join('');
        }
    }
    
    // Mostra as seções
    document.getElementById('grade-container')?.classList.remove('hidden');
    document.getElementById('avisos-container')?.classList.remove('hidden');
}

// Inicialização automática baseada na página atual
document.addEventListener('DOMContentLoaded', () => {
    // Verifica qual página está carregando
    if (document.getElementById('pedagogos-section')) {
        carregarAreaPedagogos();
    } else if (document.getElementById('alunos-section')) {
        carregarAreaAlunos();
    }
});