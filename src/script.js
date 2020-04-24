// Variables
let output  = document.getElementById('txtOutput');
let result  = document.getElementById('txtResult');
let equals_triggered = true;
let ops = ['+', '-', '*', '/'];

// Keyboard Listeners
document.addEventListener('keyup', (e) => {
    if (e.code === 'Numpad1') type('1');
    if (e.code === 'Numpad2') type('2');
    if (e.code === 'Numpad3') type('3');
    if (e.code === 'Numpad4') type('4');
    if (e.code === 'Numpad5') type('5');
    if (e.code === 'Numpad6') type('6');
    if (e.code === 'Numpad7') type('7');
    if (e.code === 'Numpad8') type('8');
    if (e.code === 'Numpad9') type('9');
    if (e.code === 'Numpad0') type('0');
    if (e.code === 'NumpadAdd') type('+');
    if (e.code === 'NumpadSubtract') type('-');
    if (e.code === 'NumpadMultiply') type('*');
    if (e.code === 'NumpadDivide') type('/');
    if (e.code === 'NumpadEnter') equals();
    if (e.code === 'Backspace') erase();
    
});

// Functions

function type(txt) {
    // Operation
    if (is_operation(txt)){ 
        equals_triggered = false;
        let last_char = output.value.charAt(output.value.length-1);

        if (is_operation(last_char)) { // Replace
            if (last_char !== txt){
                output.value = output.value.replaceAt(output.value.length-1, txt);
            }
        } else { // Append
            output.value += txt;
        }
    // Number
    } else {
        if (equals_triggered) { // Replace
            output.value = txt;     
            equals_triggered = false;   
        } else { // Append
            output.value += txt;
        }
    }

    process_text(txt);
}

function clear_text(txt_out='' , txt_res='') {
    output.value = txt_out;
    result.value = txt_res;
    fill_0();
}

function process_text(txt) {
    let pattern1  = /([-]?\d+[\+\-\*\/]\d+)/;
    let pattern2  = /([-]?\d+[\+\-\*\/]\d+[\+\-\*\/])/;
    let str1      = output.value.match(pattern1);
    let str2      = output.value.match(pattern2);

    if (str2 != null){
        str = result.value + txt;
        clear_text();
        output.value = str;
    } else if (str1 != null) {
        str = str1[0];
        console.log('calculate(' + str + ')');
        result.value = calculate(str);
    } 
} 

function calculate(txt) {
    let result;
    let num_pat1 = /[-]?\d+/; // Number + signal
    let num_pat2 = /\d+/g; // Number
    let op_pat   = /[\+\-\*\/]/g; // Operator

    // RegEx matching
    let num1     = txt.match(num_pat1);
    let num2     = txt.match(num_pat2)[1];
    let op       = txt.match(op_pat);
    
    op = op[op.length-1]; // Gets last operator of the string (left to right)
    result = operate(num1, num2, op); // Calculates the result

    return result;
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

function equals() {
    if (result.value !== ''){
        answer = result.value;
        clear_text(answer);
        equals_triggered = true;
    }
}

function erase() {
    str     = output.value;
    new_str = str.substr(0, str.length-1);

    clear_text(new_str);
    process_text('');
}

function fill_0(){
    if (output.value === ''){
        output.value = '0';
        equals_triggered = true;
    }
}

function is_operation(txt) {
    if (ops.indexOf(txt) >= 0) {
        return true;
    } 
    return false;
}

function operate(num1, num2, op) {
    let output;

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

