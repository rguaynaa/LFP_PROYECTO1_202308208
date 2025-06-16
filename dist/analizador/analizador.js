import { KEYWORDS, TOKEN_TYPES } from './tokens';
export class Lexer {
    constructor(errorHandler) {
        this.input = '';
        this.position = 0;
        this.row = 1;
        this.col = 1;
        this.tokens = [];
        this.errorHandler = errorHandler;
        this.tokenCount = 0;
    }
    analyze(text) {
        this.input = text;
        this.position = 0;
        this.row = 1;
        this.col = 1;
        this.tokens = [];
        this.tokenCount = 0;
        this.errorHandler.clearErrors(); // Limpia errores anteriores
        while (this.position < this.input.length) {
            let char = this.input[this.position];
            let startCol = this.col; // Columna de inicio del lexema
            // Manejo de espacios en blanco, saltos de línea y tabulaciones
            if (/\s/.test(char)) {
                if (char === '\n') {
                    this.row++;
                    this.col = 1;
                }
                else {
                    this.col++;
                }
                this.position++;
                continue; // Ignorar espacios, saltos de línea y tabulaciones
            }
            // Comentarios de línea (//)
            if (char === '/' && this.peek() === '/') {
                this.position += 2;
                this.col += 2;
                while (this.position < this.input.length && this.input[this.position] !== '\n') {
                    this.position++;
                    this.col++;
                }
                continue;
            }
            // Comentarios Multilínea (/* ... */)
            if (char === '/' && this.peek() === '*') {
                let startCommentCol = this.col;
                this.position += 2; // Avanzar después de "/*"
                this.col += 2;
                let foundEnd = false;
                while (this.position < this.input.length) {
                    if (this.input[this.position] === '*' && this.peek() === '/') {
                        this.position += 2; // Avanzar después de "*/"
                        this.col += 2;
                        foundEnd = true;
                        break;
                    }
                    if (this.input[this.position] === '\n') {
                        this.row++;
                        this.col = 1;
                    }
                    else {
                        this.col++;
                    }
                    this.position++;
                }
                if (!foundEnd) {
                    this.errorHandler.addError(this.row, startCommentCol, "Comentario multilínea no cerrado");
                }
                continue;
            }
            // Números Enteros
            if (/\d/.test(char)) {
                let lexema = '';
                while (this.position < this.input.length && /\d/.test(this.input[this.position])) {
                    lexema += this.input[this.position];
                    this.position++;
                    this.col++;
                }
                this.addToken(lexema, TOKEN_TYPES.NUMERO_ENTERO, startCol);
                continue;
            }
            // Cadenas de Texto (entre comillas dobles "")
            if (char === '"') {
                let lexema = '"';
                this.position++;
                this.col++;
                let startStringCol = this.col;
                while (this.position < this.input.length && this.input[this.position] !== '"' && this.input[this.position] !== '\n') {
                    lexema += this.input[this.position];
                    this.position++;
                    this.col++;
                }
                if (this.input[this.position] === '"') {
                    lexema += '"';
                    this.position++;
                    this.col++;
                    this.addToken(lexema, TOKEN_TYPES.CADENA_TEXTO, startCol);
                }
                else {
                    this.errorHandler.addError(this.row, startStringCol, "Cadena de texto no cerrada");
                    // Opcional: podrías añadir el fragmento como un token de error
                }
                continue;
            }
            // Palabras Reservadas e Identificadores (simples, no hay identificadores en el lenguaje definido excepto palabras reservadas)
            if (/[a-zA-Z]/.test(char)) {
                let lexema = '';
                while (this.position < this.input.length && /[a-zA-Z0-9_]/.test(this.input[this.position])) {
                    lexema += this.input[this.position];
                    this.position++;
                    this.col++;
                }
                let tokenTipo = TOKEN_TYPES.OTROS; // Por defecto
                // Verificar si el lexema es una palabra reservada
                for (const key in KEYWORDS) {
                    if (KEYWORDS[key] === lexema) {
                        tokenTipo = TOKEN_TYPES.PALABRA_RESERVADA;
                        break;
                    }
                }
                this.addToken(lexema, tokenTipo, startCol);
                continue;
            }
            // Símbolos (operadores y delimitadores)
            switch (char) {
                case '(':
                    this.addToken(char, TOKEN_TYPES.PARENTESIS_ABRIR, startCol);
                    break;
                case ')':
                    this.addToken(char, TOKEN_TYPES.PARENTESIS_CERRAR, startCol);
                    break;
                case '{':
                    this.addToken(char, TOKEN_TYPES.LLAVE_ABRIR, startCol);
                    break;
                case '}':
                    this.addToken(char, TOKEN_TYPES.LLAVE_CERRAR, startCol);
                    break;
                case '[':
                    this.addToken(char, TOKEN_TYPES.CORCHETE_ABRIR, startCol);
                    break;
                case ']':
                    this.addToken(char, TOKEN_TYPES.CORCHETE_CERRAR, startCol);
                    break;
                case ';':
                    this.addToken(char, TOKEN_TYPES.PUNTO_COMA, startCol);
                    break;
                case ',':
                    this.addToken(char, TOKEN_TYPES.COMA, startCol);
                    break;
                case ':':
                    this.addToken(char, TOKEN_TYPES.DOS_PUNTOS, startCol);
                    break;
                default:
                    // Carácter desconocido
                    this.errorHandler.addError(this.row, startCol, `Carácter desconocido: '${char}'`);
                    this.addToken(char, TOKEN_TYPES.ERROR, startCol); // Añadir como token de error
                    break;
            }
            this.position++;
            this.col++;
        }
        return this.tokens;
    }
    peek() {
        if (this.position + 1 < this.input.length) {
            return this.input[this.position + 1];
        }
        return '\0'; // Carácter nulo para indicar fin de entrada
    }
    addToken(lexema, tipo, startCol) {
        this.tokenCount++;
        this.tokens.push({
            numero: this.tokenCount,
            fila: this.row,
            columna: startCol,
            lexema: lexema,
            tipo: tipo
        });
    }
}
