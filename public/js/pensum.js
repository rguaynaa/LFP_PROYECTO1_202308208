document.addEventListener('DOMContentLoaded', ()=> {
    const pensum = document.getElementById('pensum');
    
    let id = pensum.classList.item(0);

    let carrera = JSON.parse(localStorage.getItem(`pensum${id}`));

    if(carrera != null){
        pensum.innerHTML = carrera;

        let cursos = pensum.querySelectorAll('div');

        const LimpiarDivs = ()=> {
            for(const curso of cursos){
                curso.classList.remove('pre_curso');
            }
        }

        const marcarcursos = (pres) => {
            if(pres.length != 0) {
                for(const pre of pres){
                    const pre_curso = document.getElementById(pre.innerText);
                    if(pre_curso) {  
                        pre_curso.classList.add('pre_curso');
                        marcarcursos(pre_curso.children[2].children);
                    }
                }
                return;
            }
        }

        const getCurso = (event) => {
            LimpiarDivs();
            const curso = event.currentTarget;
            curso.classList.add('pre_curso');

        
            const pre = curso.children[2].children;

            if(pre.length == 0) {
                alert('No tiene prerequisitos');
                return;
            }

            marcarcursos(pre);
        }

        for(const curso of cursos){
            curso.addEventListener('click', getCurso);
            let pre = curso.children[2].children;
            if(pre.length > 3){    
                curso.children[2].classList.add('pre_font');  
            }
        }
    } else {
        console.error('No se encontró el pensum en localStorage');
    }
});