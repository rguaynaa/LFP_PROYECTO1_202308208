var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Elementos del DOM
const editor = document.getElementById('editor');
const analyzeButton = document.getElementById('analyze-button');
const clearEditorButton = document.getElementById('clear-editor-button');
const loadFileButton = document.getElementById('load-file-input');
const saveFileButton = document.getElementById('save-file-button');
const errorReportLink = document.getElementById('error-report-link');
const tokenTableBody = document.getElementById('token-table-body');
// Función para actualizar la tabla de tokens en la interfaz principal
function updateTokenTable(tokens) {
    tokenTableBody.innerHTML = ''; // Limpiar tabla
    if (!tokens || tokens.length === 0) {
        const row = tokenTableBody.insertRow();
        const cell = row.insertCell();
        cell.colSpan = 5; // Cubrir todas las columnas
        cell.textContent = "No hay tokens para mostrar o no se ha realizado el análisis.";
        cell.style.textAlign = "center";
        return;
    }
    tokens.forEach(token => {
        const row = tokenTableBody.insertRow();
        row.insertCell().textContent = token.numero.toString();
        row.insertCell().textContent = token.fila.toString();
        row.insertCell().textContent = token.columna.toString();
        row.insertCell().textContent = token.lexema;
        row.insertCell().textContent = token.tipo;
    });
}
// Función para el resaltado de sintaxis (opcional, en un `textarea` es complejo)
// Podrías usar un `div contenteditable` si quieres un resaltado real.
function applySyntaxHighlighting(text) {
    // Esta función necesita los TOKEN_COLORS y una forma de tokenizar el texto.
    // Como el lexer está en el backend, no lo tenemos disponible directamente aquí.
    // Para un resaltado en vivo, tendrías que re-implementar una versión más ligera del lexer en el frontend
    // o hacer peticiones constantes al backend, lo cual no es eficiente.
    // Por ahora, lo dejamos como una función placeholder, o podrías eliminarla si no la usas.
    // Si realmente necesitas resaltado, considera una librería de terceros como CodeMirror o Ace Editor.
    // Ejemplo muy básico si tuvieras TOKEN_COLORS y pudieras procesar el texto:
    // const divEditor = document.getElementById('code-editor-div'); // Si fuera un div contenteditable
    // if (divEditor) {
    //     // Lógica para tokenizar y aplicar spans
    //     let highlightedHtml = '';
    //     // Simulate a simple tokenizer for highlighting (not the full lexer)
    //     const keywords = Object.values(KEYWORDS); // Necesitas importar KEYWORDS si los usas aquí
    //     const lines = text.split('\n');
    //     lines.forEach(line => {
    //         let processedLine = line;
    //         for (const kw of keywords) {
    //             processedLine = processedLine.replace(new RegExp(`\\b${kw}\\b`, 'g'), `<span style="color: ${TOKEN_COLORS.PALABRA_RESERVADA}">${kw}</span>`);
    //         }
    //         // Add other basic highlighting (numbers, strings)
    //         processedLine = processedLine.replace(/"[^"]*"/g, `<span style="color: ${TOKEN_COLORS.CADENA_TEXTO}">$&</span>`);
    //         processedLine = processedLine.replace(/\b\d+\b/g, `<span style="color: ${TOKEN_COLORS.NUMERO_ENTERO}">$&</span>`);
    //         highlightedHtml += processedLine + '\n';
    //     });
    //     divEditor.innerHTML = highlightedHtml;
    // }
}
// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    var _a;
    // Evento para Home (recarga la página principal)
    (_a = document.getElementById('home-link')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.reload(); // Recarga la página actual
    });
    // Evento para el botón de Analizar
    analyzeButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
        const inputText = editor.value;
        try {
            const response = yield fetch('/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ code: inputText })
            });
            const result = yield response.json();
            if (result.success) {
                console.log(result.message);
                updateTokenTable(result.tokens); // Actualizar la tabla de tokens
                // Abrir los reportes en nuevas pestañas usando las URLs proporcionadas por el backend
                window.open(result.pensumUrl, '_blank');
                // Actualizar el href del link de errores para que apunte al archivo generado
                errorReportLink.href = result.errorsUrl;
                // Opcional: abrir el reporte de errores automáticamente
                window.open(result.errorsUrl, '_blank');
                // Opcional: abrir el reporte de tokens en una nueva pestaña
                window.open(result.tokensReportUrl, '_blank');
            }
            else {
                alert('Error en el análisis: ' + result.error);
                updateTokenTable([]); // Limpiar tabla si hay error
            }
        }
        catch (error) {
            console.error('Error al comunicarse con el servidor:', error);
            alert('Error al conectar con el servidor de análisis.');
            updateTokenTable([]); // Limpiar tabla si hay error de conexión
        }
    }));
    // Evento para Limpiar Editor
    clearEditorButton.addEventListener('click', () => {
        editor.value = '';
        updateTokenTable([]); // Limpiar la tabla de tokens
        errorReportLink.href = '#'; // Resetear el link de errores
    });
    // Evento para Cargar Archivo
    loadFileButton.addEventListener('change', (event) => {
        var _a;
        const file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                var _a;
                editor.value = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                // applySyntaxHighlighting(editor.value); // Opcional: resaltar al cargar
            };
            reader.readAsText(file);
        }
    });
    // Evento para Guardar Archivo
    saveFileButton.addEventListener('click', () => {
        const content = editor.value;
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'pensum.plfp'; // Nombre de archivo sugerido
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(a.href);
    });
    // Inicializar la tabla de tokens vacía al cargar la página
    updateTokenTable([]);
});
export {};
