"use strict";
/*export class LexicalAnalize {
    public scanner(input: string){

        for (let i=0;i<input.length;i++){
            switch(this.state){
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
                        if(char === '"'){
                            this.addCharacter(char);
                            this.state = 11;

            }
        }

    }
}
*/ 
