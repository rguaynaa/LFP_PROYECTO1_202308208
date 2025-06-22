export enum Type {
    RESERVED_WORD = "Palabra Reservada",
    STRING = "Cadena de Texto",
    NUMBER = "Numero",
    BRA_OPEN = "Corchete Apertura",
    BRA_CLOSE = "Corchete Cierre",
    KEY_OPEN = "Llave Apertura",
    KEY_CLOSE = "Llave Cierre",
    PAR_OPEN = "Parentesis Apertura",
    PAR_CLOSE = "Parentesis Cierre",
    COLON = "Dos Puntos",
    SEMICOLON = "Punto y Coma",
    COMMA = "Coma",
    UNKNOWN = "Desconocido"
}

export class Token {
    public typeToken: Type;
    public lexeme: string;
    public row: number;
    public column: number;

    constructor(type: Type, lexeme: string, row: number, column: number) {
        this.typeToken = type;
        this.lexeme = lexeme;
        this.row = row;
        this.column = column;
    }
    
    // --- ESTA ES LA SOLUCIÓN CLAVE ---
    // El método toJSON() es usado automáticamente por JSON.stringify()
    // Aquí creamos un objeto simple (plano) con todas las propiedades
    // que el frontend necesita, incluyendo 'typeTokenString'.
    public toJSON() {
        return {
            typeTokenString: this.typeToken, // El frontend usa esta propiedad
            lexeme: this.lexeme,
            row: this.row,
            column: this.column
        };
    }

    public getTypeToken(): Type {
        return this.typeToken;
    }

    public getLexeme(): string {
        return this.lexeme;
    }
    
    public getRow(): number {
        return this.row;
    }
    
    public getColumn(): number {
        return this.column;
    }

    public toString(): string {
        return `Error Léxico: Token desconocido '${this.lexeme}' encontrado en [Fila: ${this.row}, Col: ${this.column}]`;
    }
}