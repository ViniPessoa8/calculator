// Variables
let output  = document.getElementById('txtOutput');
let result  = document.getElementById('txtResult');
let equals_triggered = true;
let ops = ['+', '-', '*', '/'];

// Keyboard Listeners
document.addEventListener('keyup', (e) => {
    switch(e.code) {
        case 'Numpad1': handle_write('1'); break;
        case 'Numpad2': handle_write('2'); break;
        case 'Numpad3': handle_write('3'); break;
        case 'Numpad4': handle_write('4'); break;
        case 'Numpad5': handle_write('5'); break;
        case 'Numpad6': handle_write('6'); break;
        case 'Numpad7': handle_write('7'); break;
        case 'Numpad8': handle_write('8'); break;
        case 'Numpad9': handle_write('9'); break;
        case 'Numpad0': handle_write('0'); break;
        case 'NumpadAdd': handle_write('+'); break;
        case 'NumpadSubtract': handle_write('-'); break;
        case 'NumpadMultiply': handle_write('*'); break;
        case 'NumpadDivide': handle_write('/'); break;
        case 'NumpadEnter': equals(); break;
        case 'Backspace': equals_triggered?clear_text():erase(); break;
        default: break;
    }
    
});

// Functions
// Handles the writing of 'input' on the 'Output' container
function handle_write(input) {
    let position = output.value.length-1;
    let last_char = output.value.charAt(position);

    
    if (output.value.length < 14) { 
        // Operation
        if (is_operation(input)){ 
            equals_triggered = false;

            if (is_operation(last_char)) { // Replace
                if (last_char !== input){
                    output.value = output.value.replaceAt(output.value.length-1, input);
                }
            } else { // Append
                output.value += input;
            }
        // Number
        } else {
            if (equals_triggered){
                output.value = input;
                if (input !== '0') equals_triggered = false;
            } else {
                output.value += input;
            }
        }
        process_text(input);
    }
}

// Clears the 'Result' container and sets 'Output' container to 0
function clear_text(txt_out='' , txt_res='') {
    output.value = txt_out;
    result.value = txt_res;
    fill_0();
}

// Handles the 'Output' text
// 'input' is the argument from 'handle_write(input)'
function process_text(input) {
    // Pattern: [num][operator][num]
    let pattern1  = /([-]?\d+[\+\-\*\/]\d+)/;
    let str1      = output.value.match(pattern1);

    // Pattern: [num][operator][num][operator]
    let pattern2  = /([-]?\d+[\+\-\*\/]\d+[\+\-\*\/])/;
    let str2      = output.value.match(pattern2);

    if (str2 != null){
        str = result.value + input;
        clear_text();
        output.value = str;
    } else if (str1 != null) {
        str = str1[0];
        result.value = process_operation(str);
    } 
} 

function process_operation(input) {
    let result;
    let num_pat1 = /[-]?\d+/; // Signal + Number
    let num_pat2 = /\d+/g; // Number
    let op_pat   = /[\+\-\*\/]/g; // Operator

    // RegEx matching
    let num1     = input.match(num_pat1);
    let num2     = input.match(num_pat2)[1];
    let op       = input.match(op_pat);
    
    op = op[op.length-1]; // Gets last operator of the string (left to right)
    result = calculate(num1, num2, op); // Calculates the result

    return result;
}

// Replaces a character from a string in a certain position
String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

// Moves the 'Result' container value to the 'Output' container 
function equals() {
    if (result.value !== ''){
        answer = result.value;
        clear_text(answer);
        equals_triggered = true;
    }
}

// Erases last character of the 'Output' container
function erase() {
    str     = output.value;
    new_str = str.substr(0, str.length-1);

    clear_text(new_str);
    process_text('');
}

// Fills the 'Output' container blank with '0'
function fill_0(){
    if (output.value === ''){
        output.value = '0';
        equals_triggered = true;
    }
}

// Checks if 'input' is an operation: + - * /
function is_operation(input) {
    return ops.indexOf(input) >= 0;
}

function calculate(num1, num2, op) {
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

