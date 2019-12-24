var visor;
var preview;
var resposta = 'CATCHAU';

function operacao(op) {
    //console.log(v)
    preview = window.document.querySelector("p#preview");
    visor = window.document.querySelector("p#resposta");
    if (op == 'C') {
        preview.innerHTML += ``;
        visor.textContent = '';
        resposta = 'CATCHAU';
        return false;
    }
    //console.log(visor.textContent.length)

    if (op == 'DEL' && visor.textContent != '') {
        var delecao = Number(visor.textContent) - Number(visor.textContent[visor.textContent.length - 1]);
        delecao = delecao / 10;
        if (delecao == 0) {
            visor.textContent = ''
        } else {
            visor.textContent = delecao;
        }
        return false;
    }

    if (op == '+/-' && visor.textContent != '') {
        var negar = Number(visor.textContent);
        negar = negar * (-1);
        visor.textContent = negar;
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
                visor.textContent = '';
            }
            return false;
        }
    }
    if (resposta != 'CATCHAU') {
        console.log("OP")
        if (op == '*') {
            resposta = resposta * Number(visor.textContent);
        } else if (op == '/') {
            resposta = resposta / Number(visor.textContent);
        } else if (op == '+') {
            resposta = resposta + Number(visor.textContent);
        } else if (op == '-') {
            resposta = resposta - Number(visor.textContent);
        }
    }
    console.log(resposta)
    if (op == '=' && preview.textContent != '' && visor.textContent != '') {
        console.log(preview.textContent[preview.textContent.length - 2])
        if (preview.textContent[preview.textContent.length - 2] == '*') {
            resposta = resposta * Number(visor.textContent);
        } else if (preview.textContent[preview.textContent.length - 2] == '/') {
            resposta = resposta / Number(visor.textContent);
        } else if (preview.textContent[preview.textContent.length - 2] == '+') {
            resposta = resposta + Number(visor.textContent);
        } else if (preview.textContent[preview.textContent.length - 2] == '-') {
            resposta = resposta - Number(visor.textContent);
        }
        var decimal = resposta;
        var casas_decimais = 0;
        var truncado = Math.trunc(resposta);
        console.log("truncado: " + truncado);
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
    preview.innerHTML += `${visor.textContent} ${op} `;
    visor.textContent = '';
}

var tamanho_num;

function numero(n) {
    visor = window.document.querySelector("p#resposta");
    tamanho_num = visor.textContent.length;
    //console.log()
    if (tamanho_num <= 5) {
        visor.innerHTML += n;
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
    bloco.style.background = '#f57f1f';
    bloco.style.color = '#ffffff'
}

function descolorirOp(op) {
    //console.log("HI")
    var bloco = window.document.querySelector("input#" + op);
    bloco.style.background = '#ffffff';
    bloco.style.color = '#f57f1f'
}