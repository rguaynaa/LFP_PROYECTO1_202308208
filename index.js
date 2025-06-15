document.addEventListener('DOMContentLoaded', ()=> {

    let carreras=[
        {
            nombre: "Ingeniería en Ciencias y Sistemas",
            semestres:  [
                        { 
                        numero: 1,
                        cursos: [
                            {
                                codigo: 101,
                                nombre: "Matemática basica 1",
                                area: 4,
                                prerequisitos: []
                            }
                        ]
                    },
                    {
                        numero:2,  
                        cursos: [
                            {
                                codigo : 103,
                                nombre: "Matemática basica 2",
                                area: 4,
                                prerequisitos: [101]
                            }
                        ]   
                    },
                     {
                        numero:3,  
                        cursos: [
                            {
                                codigo : 770,
                                nombre: "IPC1",
                                area: 4,
                                prerequisitos: [103]
                            }
                        ]   
                    }
                ]

        }
    ];


    const tcabecera=document.getElementById("cabecera");

    carreras.forEach((carrera)=> {

        let semestres = carrera.semestres;
        let th='';

        semestres.forEach((semestre) => {

            th += `<th>${semestre.numero}</th>\n` ;
            });

        tcabecera.innerHTML = th;

    });

    carrera.forEach((carrera) => {
         let semestres = carrera.semestres;
         semestres.forEach((semestre) => {
            
            
            let td='';
            let tr='';
            for(let i=0; i<6 ;i++){
                tr+='<tr>';
                let td='';
                semestre.forEach((semestre) => {
                    let cursos = semestre.cursos;

                    cursos.forEach((curso)=> {

                        if(curso.area == i+1){
                            td += `<td>${curso.nombre}</td>`;
                        }else{
                            td += `<td></td>`;
                        }

                    });


                 });
                 tr += '</tr>';
            }    
            console.log(tr);
        });    
    });
});