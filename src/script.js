let output  = document.getElementById('txtOutput');
output.addEventListener('keyup', process_text);

function set_text(txt) {
    output.value += txt;
    process_text();
}

function clean_text() {
    output.value = '';
}

function process_text() {  
    console.log("teste");
    txt     = output.value;
    pattern = /(\d+[\+\-\*\/]\d+)/;
    str     = txt.match(pattern);
    
    if (str != null) {
        alert(txt +"\n"+ str[0]);
    }
} 

