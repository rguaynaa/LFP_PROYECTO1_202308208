import { Token, Type } from "../Lexer/Token";
import { Career } from "../models/career";
import { Semester } from "../models/semester";
import { Course } from "../models/course";

export const getCareers = (tokens: Token[]): Career[] => {
    const careers: Career[] = [];
    let currentCareer: Career | null = null;
    let currentSemester: Semester | null = null;
    let currentCourse: Course | null = null;

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

       
        if (token.typeToken === Type.RESERVED_WORD) {
            
            const valueToken = tokens[i + 2]; 

            switch (token.lexeme) {
                case 'Carrera':
                    if (valueToken && valueToken.typeToken === Type.STRING) {
                        const careerName = valueToken.lexeme.slice(1, -1); 
                        currentCareer = new Career(careerName);
                        careers.push(currentCareer); 
                    }
                    break;
                case 'Semestre':
                    if (valueToken && valueToken.typeToken === Type.NUMBER && currentCareer) {
                        const semesterNum = Number(valueToken.lexeme);
                        currentSemester = new Semester(semesterNum);
                        currentCareer.addSemester(currentSemester);
                    }
                    break;
                case 'Curso':
                    if (valueToken && valueToken.typeToken === Type.NUMBER && currentSemester) {
                        const courseCode = valueToken.lexeme;
                        currentCourse = new Course(courseCode);
                        currentSemester.addCourse(currentCourse);
                    }
                    break;
                case 'Nombre':
                    if (valueToken && valueToken.typeToken === Type.STRING && currentCourse) {
                        currentCourse.setName(valueToken.lexeme.slice(1, -1));
                    }
                    break;
                case 'Area':
                    if (valueToken && valueToken.typeToken === Type.NUMBER && currentCourse) {
                        currentCourse.setArea(Number(valueToken.lexeme));
                    }
                    break;
                case 'Prerrequisitos':
                 
                    let j = i + 2; 
                    if (tokens[j] && tokens[j].typeToken === Type.PAR_OPEN) {
                        j++; // Moverse después de '('
                        while (tokens[j] && tokens[j].typeToken !== Type.PAR_CLOSE) {
                            if (tokens[j].typeToken === Type.NUMBER && currentCourse) {
                                currentCourse.addPrerquisite(tokens[j].lexeme);
                            }
                            j++;
                        }
                    }
                    break;
            }
        }
       
        else if (token.typeToken === Type.KEY_CLOSE && currentCourse) {
            currentCourse.generateHTML();
            currentCourse = null; 
        }
     
        else if (token.typeToken === Type.KEY_CLOSE && currentSemester) {
            currentSemester.generateHTML();
            currentSemester = null;
        }
     
        else if (token.typeToken === Type.BRA_CLOSE && currentCareer) {
            currentCareer.generateHTML();
            currentCareer = null;
        }
    }
    return careers;
};