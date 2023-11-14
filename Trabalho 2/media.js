const n = document.querySelector("#nome");
const n1 = document.getElementById("n1");
const n2 = document.getElementById("n2");
const n3 = document.getElementById("n3");
const botao = document.getElementById("b1");
const med = document.getElementById("me");
const r = document.getElementById("resp");
const bot2 = document.getElementById("b2")

bot2.addEventListener('click', limpar);
function limpar() {
    nome.value = "";
    n1.value = "";
    n2.value = "";
    n3.value = "";
    med.value = "";
    r.innerHTML = (`Campos limpos com sucesso!`);
}


botao.addEventListener('click', () => {
    let nomeAluno = nome.value;
    let nota1 = Number(n1.value);
    let nota2 = Number(n2.value);
    let nota3 = Number(n3.value);
    let mediaExercicios = Number(med.value);
    let mediaFinal = (nota1 + nota2 * 2 + nota3 * 3 + mediaExercicios) / 7;

   
    let alunoData = {
        nome: nomeAluno,
        nota1: nota1,
        nota2: nota2,
        nota3: nota3,
        mediaExercicios: mediaExercicios,
        mediaFinal: mediaFinal.toFixed(2)
    };

    
    let alunosCache = JSON.parse(localStorage.getItem('alunos')) || [];
    alunosCache.push(alunoData);

    
    localStorage.setItem('alunos', JSON.stringify(alunosCache));

    r.innerHTML = `${nomeAluno} suas notas foram salvas!!!!`;

    
    });
