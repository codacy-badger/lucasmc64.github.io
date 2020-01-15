//Calculadora



var visor;
var preview;
var resposta = 'CATCHAU';



//Essa variável serve para saber se a última operação feita foi a de Raiz ou 1/X.
var operacao_com_parenteses = 0;
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
    var i;
    for (i = 0; i < botoes.length; i++) {
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
function limita_casas_decimais() {
    var decimal = Number(resposta);
    var casas_decimais = 0;
    var truncado = Math.trunc(resposta);
    console.log("truncado: " + truncado);
    console.log(resposta);
    console.log("casas decimais: " + decimal);
    if (decimal != truncado) {
        while (decimal != truncado) {
            truncado = Math.trunc(decimal * 10);
            decimal = decimal * 10;
            console.log("truncado: " + truncado);
            console.log("casas decimais: " + decimal);
            casas_decimais++;
            if (casas_decimais > 5) {
                break;
            }
        }
        console.log("casas decimais - tam: " + casas_decimais);
        if (casas_decimais > 5) {
            resposta = resposta.toFixed(5)
            console.log("res 5 casas: " + resposta)
        }
    }
}
//



//
function basic_ops(num) {
    last_num = visor.textContent;
    console.log("Ultimo numero digitado= " + last_num);

    if (preview.textContent[preview.textContent.length - 2] == '*') {
        resposta = Number(resposta) * num;
    } else if (preview.textContent[preview.textContent.length - 2] == '/') {
        resposta = Number(resposta) / num;
    } else if (preview.textContent[preview.textContent.length - 2] == '+') {
        resposta = Number(resposta) + num;
    } else if (preview.textContent[preview.textContent.length - 2] == '-') {
        resposta = Number(resposta) - num;
    } else if (preview.textContent[preview.textContent.length - 2] == '^') {
        resposta = Math.pow(Number(resposta), num);
    }
}
//



var contador = 0;
var contNegado = 0;
//guardará o número digitado quando o igual for apertado.
var last_num;



function operacao(op) {



    //Esse contador serve para...
    if (op != '=') {
        contador++;
    }
    //



    //Esses são os "visores" da calculadora.
    preview = window.document.querySelector("p#preview");
    visor = window.document.querySelector("p#resposta");
    //



    //
    if (op == '%') {
        /*
        if (preview.innerHTML == ``) {
            visor.textContent = 0;
        }
        */
       return false;
    }
    //



    //Esta operação apaga o conteúdo de todos os "visores" e as operações armazenadas.
    if (op == 'C') {
        preview.innerHTML = ``;
        visor.textContent = '';
        resposta = 'CATCHAU';
        return false;
    }
    //



    //Essa operação apaga o conteúdo apenas do visor maior.
    if (op == 'CE') {
        visor.textContent = '';
        return false;
    }
    //



    //Essa operação apaga o conteúdo apenas o último número digitado no "visor principal".
    if (op == 'DEL' && visor.textContent != '0') {
        var delecao = visor.textContent;
        delecao = delecao.substring(0, (delecao.length - 1));
        visor.textContent = delecao;
        return false;
    }
    //



    //Essa operação inverte o número digitado no "visor principal" (multiplica por -1).
    if (op == '+/-' && visor.textContent != '') {
        var negar = Number(visor.textContent);
        negar = negar * (-1);
        //operacao_com_parenteses++;
        if (preview.innerHTML != '') {

            operacao_com_parenteses = 0;

        } else {
            resposta = negar;
        }
        contador = 0;
        contNegado = 1;

        limita_casas_decimais();

        /*
        preview.innerHTML += `${visor.textContent} * (-1) `;
        */

        visor.textContent = negar;

        last_num = visor.textContent;
        console.log("Ultimo numero digitado= " + last_num);
        return false;
    }
    //



    //
    if (op == '1/X' && visor.textContent != '') {
        
        var um_sobre_x = Number(visor.textContent);
        console.log("1/X -> " + um_sobre_x);
        um_sobre_x = 1 / um_sobre_x;
        console.log("2 - 1/X -> " + um_sobre_x);
        if (preview.innerHTML != '' && operacao_com_parenteses == 0) {

            basic_ops(um_sobre_x);

        } else {
            resposta = um_sobre_x;
        }

        limita_casas_decimais();

        if(operacao_com_parenteses > 0){
            preview.innerHTML = `1/(${preview.innerHTML}) `;
        }else{
            preview.innerHTML += `1/(${visor.textContent}) `;
        }
        
        operacao_com_parenteses++;
        visor.textContent = resposta;

        last_num = visor.textContent;
        console.log("Ultimo numero digitado= " + last_num);
        return false;
    }
    //



    //
    if (op == 'sqrt' && visor.textContent != '') {
        var raizQ = Number(visor.textContent);
        raizQ = Math.sqrt(raizQ);

        if (preview.innerHTML != '' && operacao_com_parenteses == 0) {

            basic_ops(raizQ);

        } else {
            resposta = raizQ;
        }

        limita_casas_decimais();

        if(operacao_com_parenteses > 0){
            preview.innerHTML = `sqrt(${preview.innerHTML}) `;
        }else{
            preview.innerHTML += `sqrt(${visor.textContent}) `;
        }

        operacao_com_parenteses++;
        visor.textContent = resposta;

        last_num = visor.textContent;
        console.log("Ultimo numero digitado= " + last_num);
        return false;
    }
    //



    //
    if (op == ',' && visor.textContent != '') {
        visor.textContent += '.';
        contador = 0;
        return false;
    }
    //



    //
    if (visor.textContent == undefined || visor.textContent == '' || visor.textContent == null || visor.textContent == 0) {
        return false;
    } else {
        if (resposta == 'CATCHAU') {
            if (op != '=') {
                //console.log("ERROOOOOU")
                resposta = Number(visor.textContent);
                preview.innerHTML += `${visor.textContent} ${op} `;
                /*visor.textContent = '';*/
                contador++;
            }

            return false;
        }
    }
    //



    // Para Raiz e 1/X
    if (preview.textContent[preview.textContent.length - 2] == ')' && op != '=') {
        operacao_com_parenteses = 0;
        preview.innerHTML += `${op} `;
        return false;
    }
    //



    //
    if (resposta != 'CATCHAU') {
        console.log("OP")

        basic_ops(Number(visor.textContent));

        limita_casas_decimais();

    }
    //



    //
    console.log(preview.textContent[preview.textContent.length - 2])
    console.log(resposta)
    //



    //
    if (op == '=' && preview.textContent != '' && visor.textContent != '') {

        last_num = visor.textContent;
        console.log("Ultimo numero digitado= " + last_num);

        limita_casas_decimais();

        preview.innerHTML = ``;
        visor.textContent = resposta;
        resposta = 'CATCHAU';
        return false;
    }
    //



    //
    if (preview.textContent[preview.textContent.length - 2] == ')' && op != '=') {
        preview.innerHTML += `${op} `;
    } else {
        preview.innerHTML += `${visor.textContent} ${op} `;
    }
    //



    //
    visor.textContent = resposta;
    //



}
// Fim função operação

var tamanho_num;

function numero(n) {
    visor = window.document.querySelector("p#resposta");
    tamanho_num = visor.textContent.length;

    if (operacao_com_parenteses > 0 && contNegado == 0) {
        preview.innerHTML = ``;
        visor.textContent = '';
        operacao_com_parenteses = 0;
        contNegado = 0;
    }

    //console.log()
    if (tamanho_num <= 7) {
        if (visor.textContent == '0' || contador > 0) {
            visor.innerHTML = n;
            contador = 0;
        } else {
            visor.innerHTML += n;
        }
    } else {
        alert("Número grande demais!");
    }

}

function colorirNum(n) {
    var bloco = window.document.querySelector("input#" + n);
    bloco.style.background = '#ddddcc';
}



function descolorirNum(n) {
    var bloco = window.document.querySelector("input#" + n);
    bloco.style.background = '#ffffff';
}



function colorirOp(op) {
    var bloco = window.document.querySelector("input#" + op);
    bloco.style.background = cor;
    bloco.style.color = '#ffffff'
}



function descolorirOp(op) {
    var bloco = window.document.querySelector("input#" + op);
    bloco.style.background = '#ffffff';
    bloco.style.color = cor
}
