// Variables
let output  = document.getElementById('txtOutput');
let result  = document.getElementById('txtResult');
let equals_triggered = false;
let ops = ['+', '-', '*', '/'];

// output.addEventListener('keyup', process_text);

// Keyboard Listeners
document.addEventListener('keyup', (e) => {
    if (e.code == 'Numpad1') set_text('1');
    if (e.code == 'Numpad2') set_text('2');
    if (e.code == 'Numpad3') set_text('3');
    if (e.code == 'Numpad4') set_text('4');
    if (e.code == 'Numpad5') set_text('5');
    if (e.code == 'Numpad6') set_text('6');
    if (e.code == 'Numpad7') set_text('7');
    if (e.code == 'Numpad8') set_text('8');
    if (e.code == 'Numpad9') set_text('9');
    if (e.code == 'Numpad0') set_text('0');
    if (e.code == 'NumpadAdd') set_text('+');
    if (e.code == 'NumpadSubtract') set_text('-');
    if (e.code == 'NumpadMultiply') set_text('*');
    if (e.code == 'NumpadDivide') set_text('/');
    if (e.code == 'NumpadEnter') equals();
    
});

// Functions
function set_text(txt) {
    if (ops.indexOf(txt) >= 0){ // Operation
            equals_triggered = false;
        let last_char = output.value.charAt(output.value.length-1);

        if (ops.indexOf(last_char) >= 0) { // Replace
            if (last_char !== txt){
                output.value = output.value.replaceAt(output.value.length-1, txt);
            }
        } else {
            output.value += txt;
        }
    } else {
        if (equals_triggered) {
            output.value = txt;     
            equals_triggered = false;   
        } else {
            output.value += txt;
        }
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

    switch(op){
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

function equals() {
    if (result.value !== ''){
        answer = result.value;
        clean_text();
        output.value = answer;
        equals_triggered = true;
    }
}