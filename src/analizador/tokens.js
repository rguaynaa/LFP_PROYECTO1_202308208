"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKEN_COLORS = exports.TOKEN_TYPES = exports.KEYWORDS = void 0;
// Palabras Reservadas
exports.KEYWORDS = {
    CARRERA: "Carrera",
    SEMESTRE: "Semestre",
    CURSO: "Curso",
    NOMBRE: "Nombre",
    AREA: "Area",
    PRERREQUISITOS: "Prerrequisitos"
};
// Tipos de Tokens
exports.TOKEN_TYPES = {
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
exports.TOKEN_COLORS = {
    [exports.TOKEN_TYPES.PALABRA_RESERVADA]: "blue",
    [exports.TOKEN_TYPES.CADENA_TEXTO]: "orange",
    [exports.TOKEN_TYPES.NUMERO_ENTERO]: "purple",
    [exports.TOKEN_TYPES.PARENTESIS_ABRIR]: "black",
    [exports.TOKEN_TYPES.PARENTESIS_CERRAR]: "black",
    [exports.TOKEN_TYPES.LLAVE_ABRIR]: "black",
    [exports.TOKEN_TYPES.LLAVE_CERRAR]: "black",
    [exports.TOKEN_TYPES.CORCHETE_ABRIR]: "black",
    [exports.TOKEN_TYPES.CORCHETE_CERRAR]: "black",
    [exports.TOKEN_TYPES.PUNTO_COMA]: "black",
    [exports.TOKEN_TYPES.COMA]: "black",
    [exports.TOKEN_TYPES.DOS_PUNTOS]: "black",
    [exports.TOKEN_TYPES.ERROR]: "red",
    [exports.TOKEN_TYPES.OTROS]: "black"
};
