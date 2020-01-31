//Calculadora

var visor = window.document.querySelector("p#resposta");
var preview = window.document.querySelector("p#preview");
var resposta = "CATCHAU";

//Essa variável serve para saber se a última operação feita foi a de Raiz ou 1/X.
var operacaoComParenteses = 0;
//

//Gerador de Cores.
function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
//

//Muda as cores do site de acordo com a cor gerada na função anterior.
var cor = getRandomColor();
function mudaCor() {
    var fundo = window.document.querySelector("body");
    fundo.style.backgroundColor = cor;
    var botoes = window.document.querySelectorAll("input");
    for (let i in botoes) {
        botoes[i].style.color = cor;
    }
    
    var home = window.document.querySelector("#home");
    home.style.color = cor;
    var historico = window.document.querySelector("#default");
    historico.style.color = cor;
}
//

//OPERAÇÕES DA CALCULADORA

//Essa funçãoclimita número com muitas casas decimais à apenas 5 casas decimais.
function limitaCasasDecimais() {
    var decimal = Number(resposta);
    var casasDecimais = 0;
    var truncado = Math.trunc(resposta);
    console.log("truncado: " + truncado);
    console.log("casas decimais: " + decimal);
    if (decimal !== truncado) {
        while (decimal !== truncado) {
            truncado = Math.trunc(decimal * 10);
            decimal = decimal * 10;
            console.log("truncado: " + truncado);
            console.log("casas decimais: " + decimal);
            casasDecimais++;
            if (casasDecimais > 5) {
                break;
            }
        }
        console.log("casas decimais - tam: " + casasDecimais);
        if (casasDecimais > 5) {
            resposta = resposta.toFixed(5);
            console.log("res 5 casas: " + resposta);
        }
    }
}
//

//Guardará o número digitado quando o igual for apertado.
var lastNum;
//

//
function basicOps(num) {
    lastNum = visor.textContent;
    console.log("Ultimo numero digitado= " + lastNum);

    if (preview.textContent[preview.textContent.length - 2] === "*") {
        resposta = Number(resposta) * num;
    } else if (preview.textContent[preview.textContent.length - 2] === "/") {
        resposta = Number(resposta) / num;
    } else if (preview.textContent[preview.textContent.length - 2] === "+") {
        resposta = Number(resposta) + num;
    } else if (preview.textContent[preview.textContent.length - 2] === "-") {
        resposta = Number(resposta) - num;
    } else if (preview.textContent[preview.textContent.length - 2] === "^") {
        resposta = Math.pow(Number(resposta), num);
    }
}
//

//
var contador = 0;
var contNegado = 0;

//Guardará a operação anterior a solicitada.
var lastOperation;
//Guardará quantos cliques foi dado no Igual
var contEqual = 0;

//
function porcentagem() {
    if (preview.innerHTML === "") {
        visor.textContent = 0;
    } else {
        var porcento = Number(visor.textContent);
        porcento = (resposta * porcento) / 100;
        console.log("Porcentagem: " + porcento);
        visor.textContent = porcento;
    }
}
//

//Essa operação apaga o conteúdo apenas do visor maior.
function limpar() {
    visor.textContent = "";
}
//

//Esta operação apaga o conteúdo de todos os "visores" e as operações armazenadas.
function limparTudo() {
    preview.innerHTML = "";
    visor.textContent = "";
    resposta = "CATCHAU";
}
//

//Essa operação apaga o conteúdo apenas o último número digitado no "visor principal".
function deletaDigito() {
    var delecao = visor.textContent;
    delecao = delecao.substring(0, (delecao.length - 1));
    visor.textContent = delecao;
}
//

//Essa operação inverte o número digitado no "visor principal" (multiplica por -1).
function inverteSinal() {
    if (visor.textContent !== "") {
        var negar = Number(visor.textContent);
        negar = negar * (-1);
        if (preview.innerHTML !== "") {

            operacaoComParenteses = 0;

        } else {
            resposta = negar;
        }
        contador = 0;
        contNegado = 1;

        limitaCasasDecimais();

        visor.textContent = negar;

        lastNum = visor.textContent;
        console.log("Ultimo numero digitado= " + lastNum);
        return false;
    }
}
//

//
function umSobreXis() {
    if (visor.textContent !== "") {

        var umSobreX = Number(visor.textContent);
        console.log("1/X -> " + umSobreX);
        umSobreX = 1 / umSobreX;
        console.log("2 - 1/X -> " + umSobreX);
        if (preview.innerHTML !== "" && operacaoComParenteses === 0) {

            basicOps(umSobreX);

        } else {
            resposta = umSobreX;
        }

        limitaCasasDecimais();

        if (operacaoComParenteses > 0) {
            preview.innerHTML = `1/(${preview.innerHTML}) `;
        } else {
            preview.innerHTML += `1/(${visor.textContent}) `;
        }

        operacaoComParenteses++;
        visor.textContent = resposta;

        lastNum = visor.textContent;
        console.log("Ultimo numero digitado= " + lastNum);
    }
}
//

//
function raizQuadrada() {
    if (visor.textContent !== "") {
        var raizQ = Number(visor.textContent);
        raizQ = Math.sqrt(raizQ);

        if (preview.innerHTML !== "" && operacaoComParenteses === 0) {

            basicOps(raizQ);

        } else {
            resposta = raizQ;
        }

        limitaCasasDecimais();

        if (operacaoComParenteses > 0) {
            preview.innerHTML = `sqrt(${preview.innerHTML}) `;
        } else {
            preview.innerHTML += `sqrt(${visor.textContent}) `;
        }

        operacaoComParenteses++;
        visor.textContent = resposta;

        lastNum = visor.textContent;
        console.log("Ultimo numero digitado= " + lastNum);
    }
}
//

//
function virgula() {
    if (visor.textContent !== "") {
        visor.textContent += ".";
        contador = 0;
    }
}
//


//HISTÓRICO
var i = 0;
function historico() {
    var select = document.getElementById("memoriacalc");
    if (contEqual === 0) {
        select.removeChild(select.childNodes[1]);
        select.removeChild(select.childNodes[0]);
    }

    var optText = `${preview.innerHTML}${visor.textContent} = <br/>${resposta}`;
    console.log("Historico: " + optText);

    var opt;
    var option = window.document.createElement("option");
    option.setAttribute("value", "v" + i);
    option.setAttribute("id", "v" + i);
    select.appendChild(option);
    opt = window.document.querySelector("option#v" + i);
    opt.innerHTML = optText;
    i++;

}
//

//Operações extras
function operacao(op) {

    //Esse contador serve para...
    if (op !== "=") {
        contador++;
    }
    //

    //
    if (visor.textContent === undefined || visor.textContent === "" || visor.textContent === null || visor.textContent === 0) {
        return false;
    } else {
        if (resposta === "CATCHAU") {
            if (op !== "=") {
                resposta = Number(visor.textContent);
                preview.innerHTML += `${visor.textContent} ${op} `;
                contador++;
                lastNum = visor.textContent;
                console.log("Ultimo numero digitado= " + lastNum);
            }
            return false;
        }
    }
    //

    // Para Raiz e 1/X
    if (preview.textContent[preview.textContent.length - 2] === ")" && op !== "=") {
        operacaoComParenteses = 0;
        preview.innerHTML += `${op} `;
        return false;
    }
    //

    //
    if (resposta !== "CATCHAU") {
        console.log("OP");

        basicOps(Number(visor.textContent));

    }
    //

    //
    console.log(preview.textContent[preview.textContent.length - 2]);
    console.log(resposta);
    //

    //
    if (op === "=" && preview.textContent !== "" && visor.textContent !== "") {

        lastNum = visor.textContent;
        console.log("Ultimo numero digitado= " + lastNum);

        limitaCasasDecimais();

        //HISTÓRICO
        historico();
        //
        contEqual++;
        preview.innerHTML = "";
        visor.textContent = resposta;
        resposta = "CATCHAU";

        return false;
    }
    //

    //
    if (preview.textContent[preview.textContent.length - 2] === ")" && op !== "=") {
        preview.innerHTML += `${op} `;
    } else {
        preview.innerHTML += `${visor.textContent} ${op} `;
    }
    //

    //
    visor.textContent = resposta;
    //

    lastOperation = op;

}
// Fim função operação

//
var tamanhoNum;

function numero(n) {
    visor = window.document.querySelector("p#resposta");
    tamanhoNum = visor.textContent.length;

    if (operacaoComParenteses > 0 && contNegado === 0) {
        preview.innerHTML = "";
        visor.textContent = "";
        operacaoComParenteses = 0;
        contNegado = 0;
    }

    //console.log()
    if (tamanhoNum <= 7) {
        if (visor.textContent === "0" || contador > 0) {
            visor.innerHTML = n;
            contador = 0;
        } else {
            visor.innerHTML += n;
        }
    } else {
        alert("Número grande demais!");
    }

}

function colorirNum(bloco) {
    bloco.style.background = "#ddddcc";
}



function descolorirNum(bloco) {
    bloco.style.background = "#ffffff";
}



function colorirOp(bloco) {
    bloco.style.background = cor;
    bloco.style.color = "#ffffff";
}



function descolorirOp(bloco) {
    bloco.style.background = "#ffffff";
    bloco.style.color = cor;
}
