// Variables
let output  = document.getElementById('txtOutput');
let result  = document.getElementById('txtResult');
let equals_triggered = true;
let ops = ['+', '-', '*', '/'];

// Keyboard Listeners
document.addEventListener('keyup', (e) => {
    if (e.code === 'Numpad1') handle_write('1');
    if (e.code === 'Numpad2') handle_write('2');
    if (e.code === 'Numpad3') handle_write('3');
    if (e.code === 'Numpad4') handle_write('4');
    if (e.code === 'Numpad5') handle_write('5');
    if (e.code === 'Numpad6') handle_write('6');
    if (e.code === 'Numpad7') handle_write('7');
    if (e.code === 'Numpad8') handle_write('8');
    if (e.code === 'Numpad9') handle_write('9');
    if (e.code === 'Numpad0') handle_write('0');
    if (e.code === 'NumpadAdd') handle_write('+');
    if (e.code === 'NumpadSubtract') handle_write('-');
    if (e.code === 'NumpadMultiply') handle_write('*');
    if (e.code === 'NumpadDivide') handle_write('/');
    if (e.code === 'NumpadEnter') equals();
    if (e.code === 'Backspace') erase();
    
});

// Functions
// Handles the writing of 'txt' on the 'Output' container
function handle_write(txt) {
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

// Clears the 'Result' container and sets 'Output' container to 0
function clear_text(txt_out='' , txt_res='') {
    output.value = txt_out;
    result.value = txt_res;
    fill_0();
}

// Handles the different 
function process_text(txt) {
    // Pattern: [num][operator][num]
    let pattern1  = /([-]?\d+[\+\-\*\/]\d+)/;
    let str1      = output.value.match(pattern1);

    // Pattern: [num][operator][num][operator]
    let pattern2  = /([-]?\d+[\+\-\*\/]\d+[\+\-\*\/])/;
    let str2      = output.value.match(pattern2);

    if (str2 != null){
        str = result.value + txt;
        clear_text();
        output.value = str;
    } else if (str1 != null) {
        str = str1[0];
        console.log('process_operation(' + str + ')');
        result.value = process_operation(str);
    } 
} 

function process_operation(txt) {
    let result;
    let num_pat1 = /[-]?\d+/; // Signal + Number
    let num_pat2 = /\d+/g; // Number
    let op_pat   = /[\+\-\*\/]/g; // Operator

    // RegEx matching
    let num1     = txt.match(num_pat1);
    let num2     = txt.match(num_pat2)[1];
    let op       = txt.match(op_pat);
    
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

// Checks if 'txt' is an operation: + - * /
function is_operation(txt) {
    if (ops.indexOf(txt) >= 0) {
        return true;
    } 
    return false;
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

