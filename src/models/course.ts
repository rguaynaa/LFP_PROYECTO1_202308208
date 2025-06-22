export class Course {
    private code: string;
    private name: string;
    private area: number;
    private prerquisites: string[];
    private html: string ;

    constructor(code: string) {
        this.code = code;
        this.name = '';
        this.area = 0;
        this.prerquisites = [];
        this.html = '';
    }
    getCode(): string {
        return this.code;
    }
    setName(name: string){
        this.name = name;
    }
    getName(): string {
        return this.name;
    }
    setArea(area: number) {
        this.area = area;
    }

    getArea(): number {
        return this.area;
    }

    addPrerquisite(code: string) {
        this.prerquisites.push(code);
    }
    getPrerquisites(): string[] {
        return this.prerquisites;
    }

    generateHTML() {
        this.html=`
        <div id="${this.code}">
            <span class="codigo">${this.code}</span>
            <span>${this.name}</span>
            <span class="pre">
                ${this.prerquisites.map((item)=>{
                     return `<p>${item}</p>`
            }).join('\n\t')}
            </span>

        </div>
        `

    }

    getHTML(): string {
        return this.html;
    }


}