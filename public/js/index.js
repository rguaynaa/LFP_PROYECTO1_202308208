document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('analyze');
    const editor = document.getElementById('editor');
    const tableBody = document.getElementById('tablebody');
    const clear = document.getElementById('clear');
    const open = document.getElementById('open');
    const save = document.getElementById('save');
    const pensums = document.getElementById('pensums');  
    const errorReportLink = document.getElementById('errorReportLink');


    clear.addEventListener('click', () => {
        editor.innerHTML = '';
       
        if(tableBody) tableBody.innerHTML = '';
    });

    open.addEventListener('click', () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.plfp';
        fileInput.addEventListener('change', e => {
            if (fileInput.files.length > 0) {
                const file = fileInput.files[0];
                const reader = new FileReader();
                reader.onload = (e) => {
                    const fileContent = e.target.result;
                    editor.innerText = fileContent;
                };
                reader.readAsText(file);
            }
            fileInput.remove();
        });
        fileInput.click();
    });

    save.addEventListener('click', () => {
        const download = document.createElement('a');
        download.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(editor.innerText);
        download.download = 'archivo.plfp';
        download.click();
    });

    button.addEventListener('click', async () => {
        localStorage.clear();
        pensums.innerHTML = '';
        console.log('Frontend: Contenido del editor antes de enviar:', editor.value);
        let response = await fetch('http://localhost:3000/analyze', {
            method: 'POST',
            headers: {
                // El backend espera text/plain
                'Content-Type': 'text/plain'
            },
            body: editor.innerText
        });

        let result = await response.json();
       
        
        let textTable = '';
        
        result.tokens.forEach((token, index) => {
            textTable += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${token.typeTokenString}</td>
                    <td>${token.lexeme}</td>
                    <td>${token.row}</td>
                    <td>${token.column}</td>
                </tr>`;
        });
        
        if(tableBody) tableBody.innerHTML = textTable;

        if (result.errors.length === 0) {
            alert('Análisis exitoso. No se encontraron errores.');
            editor.innerHTML = result.editor;
            
            result.careers.forEach((_, index) => {
                pensums.innerHTML += `<a class="btn btn-success btn_user" href="${'/pensum/' + (index + 1)}" target="_blank">${'Pensum: ' + (index + 1)}</a>\n`;
            });
            console.log(result.careers);
            result.careers.forEach((career, index) => {
                localStorage.setItem(`pensum${index + 1}`, JSON.stringify(career.html));
                
            });

        } else {
            alert('Se encontraron errores léxicos. Revisa el reporte de errores.');
            // Guardar errores para que la página de reporte los pueda leer
            localStorage.setItem('errors', JSON.stringify(result.errors));
            editor.innerHTML = result.editor; // Muestra el editor con resaltado incluso si hay errores
        }
    });

   
    if (errorReportLink) {
        errorReportLink.addEventListener('click', (e) => {
            e.preventDefault();
            const errors = localStorage.getItem('errors');
            if (errors && JSON.parse(errors).length > 0) {
                window.open('/error-report', '_blank');
            } else {
                alert('No hay errores léxicos que reportar.');
            }
        });
    }
});