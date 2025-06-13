window.onload = function () {
  const dias = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];
  const tbody = document.querySelector("#grade tbody");
  const turmaSelect = document.getElementById("turma");
  const turnoSelect = document.getElementById("turno");
  const avisosTextarea = document.getElementById("avisos");
  const salvarBtn = document.getElementById("salvarBtn");
  const salvarGradeBtn = document.getElementById("salvarGradeBtn"); // Novo botão

  // Criar células editáveis
  dias.forEach((_, i) => {
    const linha = tbody.rows[i];
    for (let j = 0; j < 6; j++) {
      const cell = document.createElement("td");
      cell.contentEditable = true;
      linha.appendChild(cell);
    }
  });

  // Função para salvar tudo (avisos + grade + turma/turno)
  function salvarDados() {
    const dados = {
      turma: turmaSelect.value,
      turno: turnoSelect.value,
      avisos: avisosTextarea.value,
      grade: []
    };

    for (let i = 0; i < 5; i++) {
      const row = tbody.rows[i];
      const rowData = [];
      for (let j = 1; j <= 6; j++) {
        rowData.push(row.cells[j].innerText);
      }
      dados.grade.push(rowData);
    }

    localStorage.setItem("gradeEscolar", JSON.stringify(dados));
  }

  // Clique no botão "Salvar Avisos"
  salvarBtn.addEventListener("click", () => {
    salvarDados();
    alert("Avisos e grade salvos com sucesso!");
  });

  // Clique no botão "Salvar Grade"
  salvarGradeBtn.addEventListener("click", () => {
    salvarDados();
    alert("Grade horária salva com sucesso!");
  });

  // Recarregar dados salvos
  const salvos = JSON.parse(localStorage.getItem("gradeEscolar"));
  if (salvos) {
    turmaSelect.value = salvos.turma;
    turnoSelect.value = salvos.turno;
    avisosTextarea.value = salvos.avisos;

    salvos.grade.forEach((linha, i) => {
      linha.forEach((conteudo, j) => {
        tbody.rows[i].cells[j + 1].innerText = conteudo;
      });
    });
  }
};
