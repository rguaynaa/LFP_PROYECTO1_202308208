// Palabras Reservadas
export const KEYWORDS = {
    CARRERA: "Carrera",
    SEMESTRE: "Semestre",
    CURSO: "Curso",
    NOMBRE: "Nombre",
    AREA: "Area",
    PRERREQUISITOS: "Prerrequisitos"
};
// Tipos de Tokens
export const TOKEN_TYPES = {
    PALABRA_RESERVADA: "Palabra Reservada",
    CADENA_TEXTO: "Cadena de Texto",
    NUMERO_ENTERO: "Numero Entero",
    PARENTESIS_ABRIR: "Parentesis Abrir",
    PARENTESIS_CERRAR: "Parentesis Cerrar",
    LLAVE_ABRIR: "Llave Abrir",
    LLAVE_CERRAR: "Llave Cerrar",
    CORCHETE_ABRIR: "Corchete Abrir",
    CORCHETE_CERRAR: "Corchete Cerrar",
    PUNTO_COMA: "Punto y Coma",
    COMA: "Coma",
    DOS_PUNTOS: "Dos Puntos",
    ESPACIO_BLANCO: "Espacio Blanco",
    SALTO_LINEA: "Salto de Linea",
    COMENTARIO_LINEA: "Comentario de Linea",
    COMENTARIO_MULTILINEA: "Comentario Multilinea",
    ERROR: "Error Lexico",
    OTROS: "Otro"
};
export const TOKEN_COLORS = {
    [TOKEN_TYPES.PALABRA_RESERVADA]: "blue",
    [TOKEN_TYPES.CADENA_TEXTO]: "orange",
    [TOKEN_TYPES.NUMERO_ENTERO]: "purple",
    [TOKEN_TYPES.PARENTESIS_ABRIR]: "black",
    [TOKEN_TYPES.PARENTESIS_CERRAR]: "black",
    [TOKEN_TYPES.LLAVE_ABRIR]: "black",
    [TOKEN_TYPES.LLAVE_CERRAR]: "black",
    [TOKEN_TYPES.CORCHETE_ABRIR]: "black",
    [TOKEN_TYPES.CORCHETE_CERRAR]: "black",
    [TOKEN_TYPES.PUNTO_COMA]: "black",
    [TOKEN_TYPES.COMA]: "black",
    [TOKEN_TYPES.DOS_PUNTOS]: "black",
    [TOKEN_TYPES.ERROR]: "red",
    [TOKEN_TYPES.OTROS]: "black"
};
