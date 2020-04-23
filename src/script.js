let output  = document.getElementById('txtOutput');
let result  = document.getElementById('txtResult');
let ops = ['+', '-', '*', '/'];

output.addEventListener('keyup', process_text);

function set_text(txt) {
    if (ops.indexOf(txt) >= 0){ // Operation
        let last_char = output.value.charAt(output.value.length-1);

        if (ops.indexOf(last_char) >= 0) { // Replace
            if (last_char !== txt){
                output.value = output.value.replaceAt(output.value.length-1, txt);
            }
        }  else {
            output.value += txt;
        }
    } else {
        output.value += txt;
    }
    process_text(txt);
}

function clean_text() {
    output.value = '';
    result.value = '';
}

function process_text(txt) {
    let pattern1  = /([-]?\d+[\+\-\*\/]\d+)/;
    let pattern2  = /([-]?\d+[\+\-\*\/]\d+[\+\-\*\/])/;
    let str1      = output.value.match(pattern1);
    let str2      = output.value.match(pattern2);

    if (str2 != null){
        str = result.value + txt;
        clean_text();
        output.value = str;
    } else if (str1 != null) {
        str = str1[0];
        console.log('calculate(' + str + ')');
        result.value = calculate(str);
    }  
} 

function calculate(txt) {
    let num_pat1 = /[-]?\d+/;
    let num_pat2 = /\d+/g;
    let op_pat   = /[\+\-\*\/]/g;
    let num1     = txt.match(num_pat1);
    let num2     = txt.match(num_pat2)[1];
    let op       = txt.match(op_pat);
    let output;

    op = op[op.length-1];

    switch(op[0]){
        case '+':
            output = parseInt(num1) + parseInt(num2);
            break;
        case '-':
            output = parseInt(num1) - parseInt(num2);
            break;
        case '*':
            output = parseInt(num1) * parseInt(num2);
            break;
        case '/':
            output = parseInt(num1) / parseInt(num2);
            break;
        default:
            output = null;
            break;
    }

    return output;
}

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}