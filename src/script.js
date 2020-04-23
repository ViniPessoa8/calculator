function set_text(txt) {
    document.getElementById("txtOutput").value += txt;
}

function clean_text() {
    document.getElementById("txtOutput").value = '';
}

function process_text() {  
    txt     = document.getElementById("txtOutput").value;
    pattern = /\d+[\+\-\*\/]\d+/m;
    str     = txt.match(pattern);
    
    clean_text();
    alert(txt +"\n"+ str);
} 