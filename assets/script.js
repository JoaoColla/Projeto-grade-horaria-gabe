//dados compartilhados entre todas as paginas
const turmas = ['1° DS', '2° DS', '3° DS', '1° ADM', '2° ADM', '3° ADM', '1° Portos', '2° Portos', '3° Portos', '1° Bioeconomia', '2° Bioeconomia', '1° Regular', '2° Regular', '3° Regular', 'Enfermagem 1', 'Enfermagem 2', 'Segurança no Trabalho 1', 'Segurança no Trabalho 2', 'Segurança no Trabalho 3', 'Portos 1', 'Portos 2', 'Portos 3', '4° Comercio exterior'];
const turno = ['Manhã', 'Tarde', 'Noite'];
const professores = ['Gabriel E.', 'Juliana A.', 'Luciano R.', 'Estephany Z.', 'Dionata F.', 'Natasha I.', 'Marcos R.', 'Delane N.', 'Claudia A.']

//armazenamento das grades horarias e avisos 
let gradesHorarias = JSON.parse(localStorage.getItem('gradesHorarias')) || [];
let avisos = JSON.parse(localStorage.getItem('avisos')) || [];