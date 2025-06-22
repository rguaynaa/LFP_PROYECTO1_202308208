import { Course } from './course';
export class Semester {

    private num: number;
    private courses: Course[];
    private html: string[];

    constructor(num: number) {
        this.num = num;
        this.courses = [];
        this.html = [];
    }
    getNum(): number {
        return this.num;
    }
    addCourse(course: Course) {
        this.courses.push(course);
    }
    getCourses(): Course[] {
        return this.courses;
    }
    generateHTML() {
        for (let i=0; i<6;i++){
            this.html[i]=`
            <td>
                ${this.getCourseArea(i+1)}
            </td>
            `;

        }
    }
    private getCourseArea(area: number){
        let htmlcourse = '';
        for(const course of this.courses) {
            if(course.getArea() == area) {
                htmlcourse += `${course.getHTML()}\n`;
            }
        }
        return htmlcourse;
    }
    getHTML():string[]{
        return this.html;
    }

}
