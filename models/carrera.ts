export interface Carrera {
    nombre: string;
    semestres: Semestre[];
}

export interface Semestre {
    numero: number;
    cursos: Curso[];
}

export interface Curso {
    codigo: number;
    nombre: string;
    area: number; // Suponiendo que 'area' es un número del 1 al 6
    prerequisitos: number[];
}