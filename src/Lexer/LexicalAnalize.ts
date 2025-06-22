import{Token,Type} from "./Token";
export class LexicalAnalize {

    private row: number;
    private column: number;
    private state: number;
    private auxChar: string;
    private tokensList: Token[];
    private colors: string;
    private errorList: string[];
    private reservedWords: string[];

    constructor() {
        this.row = 1;
        this.column = 1;
        this.state = 0;
        this.auxChar = '';
        this.tokensList = [];
        this.colors = '';
        this.errorList = [];
        this.reservedWords = ['Carrera', 'Semestre', 'Curso', 'Nombre', 'Area', 'Prerrequisitos'];
    }

    public scanner(input: string){

        input +="#";

        let char: string;

        for (let i=0;i<input.length;i++){

            char= input[i];
            switch(this.state){
                case 0:
                    switch(char){
                        case '[':
                            this.addCharacter(char);
                            this.state = 1;
                            break;
                        case ']':
                            this.addCharacter(char);
                            this.state = 2;
                            break;
                        case '{':
                            this.addCharacter(char);
                            this.state = 3;
                            break;
                        case '}':
                            this.addCharacter(char);
                            this.state = 4;
                            break;
                        case '(':
                            this.addCharacter(char);
                            this.state = 5;
                            break;
                        case ')':
                            this.addCharacter(char);
                            this.state = 6;
                            break;
                        case ':':
                            this.addCharacter(char);
                            this.state = 7;
                            break;
                        case ';':
                            this.addCharacter(char);
                            this.state = 8;
                            break;
                        case ',':
                            this.addCharacter(char);
                            this.state = 9;
                            break;
                        case '"':
                            this.addCharacter(char);
                            this.state = 10;
                            break;
                        case ' ':
                            this.column++;
                            this.colors += `${char}`;
                            break;
                        case '\n':
                            case '\r':
                            this.row++;
                            this.column = 1;
                            this.colors += `${char}`;
                            break;
                        case '\t':
                            this.column += 4; 
                            this.colors += `${char}`;
                            break;
                            default:
                            if (/\d/.test(char)) {
                                this.addCharacter(char);
                                this.state = 12; 
                                continue;
                            }
                            if (/[a-zA-Z]/.test(char)) {
                            this.addCharacter(char);
                            this.state = 13;
                            continue;
                            }

                            if(char == '#' && i== input.length - 1){
                                console.log("Fin del archivo");
                            }else{
                                this.addError(Type.UNKNOWN, char, this.row, this.column);
                                this.column++;
                            }
                            break;
                        }
                        break;
                case 1:
                    //aceptacion
                    this.addToken(Type.BRA_OPEN, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.colors += `${this.auxChar} `;
                    this.clean();
                    i--;
                    break;
                case 2:
                    this.clean();
                    i--;
                    break;
                    case 3:
                        //aceptacion
                        this.addToken(Type.KEY_OPEN,this.auxChar,this.row,this.column-this.auxChar.length);
                        this.colors += `${this.auxChar} `;
                        this.clean();
                        i--;
                        break;
                    case 4:
                        //aceptacion
                        this.addToken(Type.KEY_CLOSE,this.auxChar,this.row,this.column-this.auxChar.length);
                        this.colors += `${this.auxChar} `;
                        this.clean();
                        i--;
                        break;
                    case 5:
                    //aceptacion
                        this.addToken(Type.PAR_OPEN,this.auxChar,this.row,this.column-this.auxChar.length);
                        this.colors += `${this.auxChar} `;
                        this.clean();
                        i--;
                        break;
                    case 6:
                        //aceptacion
                        this.addToken(Type.PAR_CLOSE,this.auxChar,this.row,this.column-this.auxChar.length);
                        this.colors += `${this.auxChar} `;
                        this.clean();
                        i--;
                        break;
                    case 7:
                        //aceptacion
                        this.addToken(Type.COLON,this.auxChar,this.row,this.column-this.auxChar.length);
                        this.colors += `${this.auxChar} `;
                        this.clean();
                        i--;
                        break;
                    case 8:
                        //aceptacion
                        this.addToken(Type.SEMICOLON,this.auxChar,this.row,this.column-this.auxChar.length);
                        this.colors += `${this.auxChar} `;
                        this.clean();
                        i--;
                        break;
                    case 9:
                        //aceptacion
                        this.addToken(Type.COMMA,this.auxChar,this.row,this.column-this.auxChar.length);
                        this.colors += `${this.auxChar} `;
                        this.clean();
                        i--;
                        break;
                    case 10:
                         if (char === '"') {
                         this.addCharacter(char);
                            this.state = 11;
                            continue;
                        }

                          if (!/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚ.,;:()\-_¿?¡!"/%&'´+=*{}[\]<>|°@#$\\]*$/.test(char)) {
    this.addError(Type.UNKNOWN, char, this.row, this.column);
    this.column++;
} else {
    this.addCharacter(char);
}

                            break;
                        
                        case 11:
                            //aceptacion
                            this.addToken(Type.STRING, this.auxChar, this.row, this.column - this.auxChar.length);
                            this.colors += `<span class="string">${this.auxChar}</span> `;
                            this.clean();
                            i--;
                            break;
                    case 12:
                        //aceptacion
                        if (/\d/.test(char)) {
                            this.addCharacter(char);
                            continue;
                        }
                            this.addToken(Type.NUMBER, this.auxChar, this.row, this.column - this.auxChar.length);
                            this.colors += `<span class="number">${this.auxChar}</span> `;
                            this.clean();
                            i--;
                        break;
                        case 13:
                            //aceptacion
                            if (/[a-zA-Z0-9_]/.test(char)) {
                                this.addCharacter(char);
                                continue;
                            }
                            if (this.reservedWords.includes(this.auxChar)) {
                                this.addToken(Type.RESERVED_WORD, this.auxChar, this.row, this.column - this.auxChar.length);
                                this.colors += `<span class="keyword">${this.auxChar}</span> `;
                                this.clean();
                                i--;
                                continue;

                            }
                            this.addError(Type.UNKNOWN, this.auxChar, this.row, this.column - this.auxChar.length);
                            this.clean();
                            i--;
                            break;


            }
        }

 }
 private addCharacter(char: string) {
    this.auxChar += char;
    this.column++;

 }
 private clean() {
    this.auxChar = '';
    this.state = 0;
 }

 private addToken(type: Type, lexeme: string, row: number, column: number) {
    this.tokensList.push(new Token(type, lexeme, row, column));
    }

 private addError(type: Type, lexeme: string, row: number, column: number) {
    this.errorList.push(new Token(type, lexeme, row, column).toString());
    }
 getTokensList(): Token[] {
    return this.tokensList;
  }
 getErrorList(): string[] {
    return this.errorList;
  }
  getColors(): string {
    return this.colors;
  }
}
