//Calculadora


var visor;
var preview;
var resposta = 'CATCHAU';
var operacao_com_parenteses = 0;

//Gerador de Cor
function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
//
//Teste
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

var contador = 0;
var contNegado= 0;
function operacao(op) {
    //console.log(v)

    if (op != '=') {
        contador++;
    }

    preview = window.document.querySelector("p#preview");
    visor = window.document.querySelector("p#resposta");
    if (op == 'C') {
        preview.innerHTML = ``;
        visor.textContent = '';
        resposta = 'CATCHAU';

        return false;
    }

    if (op == 'CE') {
        visor.textContent = '';

        return false;
    }
    //console.log(visor.textContent.length)

    if (op == 'DEL' && visor.textContent != '0') {
        var delecao = Number(visor.textContent) - Number(visor.textContent[visor.textContent.length - 1]);
        delecao = delecao / 10;
        if (delecao == 0) {
            visor.textContent = '0'
        } else {
            visor.textContent = delecao;
        }
        return false;
    }

    if (op == '+/-' && visor.textContent != '') {
        var negar = Number(visor.textContent);
        negar = negar * (-1);
        operacao_com_parenteses++;
        
        if (preview.innerHTML != '') {
            if (preview.textContent[preview.textContent.length - 2] == '*') {
                resposta = resposta * negar;
            } else if (preview.textContent[preview.textContent.length - 2] == '/') {
                resposta = resposta / negar;
            } else if (preview.textContent[preview.textContent.length - 2] == '+') {
                resposta = resposta + negar;
            } else if (preview.textContent[preview.textContent.length - 2] == '-') {
                resposta = resposta - negar;
            } else if (preview.textContent[preview.textContent.length - 2] == '%') {
                resposta = resposta % negar;
            } else if (preview.textContent[preview.textContent.length - 2] == '^') {
                resposta = Math.pow(resposta, negar);
            }
            operacao_com_parenteses = 0;
        }else{
            resposta = negar;
        }
        contador = 0;
        contNegado = 1;
        /*
        preview.innerHTML += `${visor.textContent} * (-1) `;
        */
        visor.textContent = negar;

        return false;
    }

    if (op == '1/X' && visor.textContent != '') {
        var um_sobre_x = Number(visor.textContent);
        um_sobre_x = 1 / um_sobre_x;
        operacao_com_parenteses++;
        if (preview.innerHTML != '') {
            if (preview.textContent[preview.textContent.length - 2] == '*') {
                resposta = resposta * um_sobre_x;
            } else if (preview.textContent[preview.textContent.length - 2] == '/') {
                resposta = resposta / um_sobre_x;
            } else if (preview.textContent[preview.textContent.length - 2] == '+') {
                resposta = resposta + um_sobre_x;
            } else if (preview.textContent[preview.textContent.length - 2] == '-') {
                resposta = resposta - um_sobre_x;
            } else if (preview.textContent[preview.textContent.length - 2] == '%') {
                resposta = resposta % um_sobre_x;
            } else if (preview.textContent[preview.textContent.length - 2] == '^') {
                resposta = Math.pow(resposta, um_sobre_x);
            }
            operacao_com_parenteses = 0;
        }else{
            resposta = um_sobre_x;
        }
        preview.innerHTML += `1/(${visor.textContent}) `;
        visor.textContent = resposta;
        return false;
    }

    if (op == 'sqrt' && visor.textContent != '') {
        var raizQ = Number(visor.textContent);
        raizQ = Math.sqrt(raizQ);
        operacao_com_parenteses++;

        if (preview.innerHTML != '') {
            if (preview.textContent[preview.textContent.length - 2] == '*') {
                resposta = resposta * raizQ;
            } else if (preview.textContent[preview.textContent.length - 2] == '/') {
                resposta = resposta / raizQ;
            } else if (preview.textContent[preview.textContent.length - 2] == '+') {
                resposta = resposta + raizQ;
            } else if (preview.textContent[preview.textContent.length - 2] == '-') {
                resposta = resposta - raizQ;
            } else if (preview.textContent[preview.textContent.length - 2] == '%') {
                resposta = resposta % raizQ;
            } else if (preview.textContent[preview.textContent.length - 2] == '^') {
                resposta = Math.pow(resposta, raizQ);
            }
            operacao_com_parenteses = 0;
        }else{
            resposta = raizQ;
        }

        preview.innerHTML = `sqrt(${visor.textContent}) `;
        visor.textContent = resposta;
        return false;
    }

    if (op == ',' && visor.textContent != '') {
        visor.textContent += '.';
        contador = 0;
        return false;
    }

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

    /* A PROCENTAGEM ESTÁ ERRADA */

    // Para Raiz e 1/X
    if (preview.textContent[preview.textContent.length - 2] == ')') {
        operacao_com_parenteses = 0;
        preview.innerHTML += `${op} `;
        return false;
    }
    //

    if (resposta != 'CATCHAU') {
        console.log("OP")
        if (preview.textContent[preview.textContent.length - 2] == '*') {
            resposta = resposta * Number(visor.textContent);
        } else if (preview.textContent[preview.textContent.length - 2] == '/') {
            resposta = resposta / Number(visor.textContent);
        } else if (preview.textContent[preview.textContent.length - 2] == '+') {
            resposta = resposta + Number(visor.textContent);
        } else if (preview.textContent[preview.textContent.length - 2] == '-') {
            resposta = resposta - Number(visor.textContent);
        } else if (preview.textContent[preview.textContent.length - 2] == '%') {
            resposta = resposta % Number(visor.textContent);
        } else if (preview.textContent[preview.textContent.length - 2] == '^') {
            resposta = Math.pow(resposta, Number(visor.textContent));
        }

    }
    console.log(preview.textContent[preview.textContent.length - 2])
    console.log(resposta)
    if (op == '=' && preview.textContent != '' && visor.textContent != '') {

        var decimal = resposta;
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
        } else {
            resposta = resposta.toFixed(0)
        }
        preview.innerHTML = ``;
        visor.textContent = resposta;
        resposta = 'CATCHAU';
        return false;
    }
    if (preview.textContent[preview.textContent.length - 2] == ')') {
        preview.innerHTML += `${op} `;
    } else {
        preview.innerHTML += `${visor.textContent} ${op} `;
    }
    visor.textContent = resposta;
}

var tamanho_num;

function numero(n) {
    visor = window.document.querySelector("p#resposta");
    tamanho_num = visor.textContent.length;
    
    if (operacao_com_parenteses > 0  && contNegado == 0) {
        preview.innerHTML = ``;
        visor.textContent = '';
        operacao_com_parenteses = 0;
        contNegado = 0;
    }
    
    //console.log()
    if (tamanho_num <= 5) {
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
//console.log(tamanho_num)
function colorirNum(n) {
    //console.log("HI")
    //console.log(tamanho_num)
    var bloco = window.document.querySelector("input#" + n);
    bloco.style.background = '#ddddcc';
}

function descolorirNum(n) {
    //console.log("HI")
    var bloco = window.document.querySelector("input#" + n);
    bloco.style.background = '#ffffff';
}

function colorirOp(op) {
    //console.log("HI")
    var bloco = window.document.querySelector("input#" + op);
    bloco.style.background = cor;
    bloco.style.color = '#ffffff'
}

function descolorirOp(op) {
    //console.log("HI")
    var bloco = window.document.querySelector("input#" + op);
    bloco.style.background = '#ffffff';
    bloco.style.color = cor
}



//Histórico

