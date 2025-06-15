export interface Token {
    numero: number;
    fila: number;
    columna: number;
    lexema: string;
    tipo: string;
}

export interface LexerError {
    numero: number;
    fila: number;
    columna: number;
    descripcion: string;
}