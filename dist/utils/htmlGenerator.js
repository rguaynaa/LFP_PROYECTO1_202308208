import { KEYWORDS, TOKEN_TYPES } from '../analizador/tokens';
export class HtmlGenerator {
    generateTokensHtml(tokens) {
        let htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Tabla de Tokens</title>
                <style>
                    body { font-family: sans-serif; margin: 20px; }
                    h1 { color: #333; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    th { background-color: #f2f2f2; }
                    tr:nth-child(even) { background-color: #f9f9f9; }
                </style>
            </head>
            <body>
                <h1>Tabla de Tokens</h1>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Fila</th>
                            <th>Columna</th>
                            <th>Lexema</th>
                            <th>Token</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        tokens.forEach(token => {
            htmlContent += `
                        <tr>
                            <td>${token.numero}</td>
                            <td>${token.fila}</td>
                            <td>${token.columna}</td>
                            <td>${token.lexema}</td>
                            <td>${token.tipo}</td>
                        </tr>
            `;
        });
        htmlContent += `
                    </tbody>
                </table>
            </body>
            </html>
        `;
        return htmlContent;
    }
    // Esta función construirá los objetos de Carrera, Semestre, Curso
    // directamente de los tokens lexemeados.
    buildPensumStructure(tokens) {
        const carreras = [];
        let currentCarrera = null;
        let currentSemestre = null;
        let currentCurso = null;
        // Una forma sencilla de manejar el estado esperado, aunque un parser completo usaría una pila
        let expecting = null;
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            if (token.tipo === TOKEN_TYPES.PALABRA_RESERVADA) {
                switch (token.lexema) {
                    case KEYWORDS.CARRERA:
                        if (currentCarrera) {
                            // Si estamos terminando una carrera, guardar el semestre/curso actual si existe
                            if (currentSemestre) {
                                if (currentCurso) {
                                    currentSemestre.cursos.push(currentCurso);
                                    currentCurso = null;
                                }
                                currentCarrera.semestres.push(currentSemestre);
                                currentSemestre = null;
                            }
                            carreras.push(currentCarrera);
                        }
                        currentCarrera = { nombre: "", semestres: [] };
                        expecting = 'carrera_nombre';
                        break;
                    case KEYWORDS.SEMESTRE:
                        if (currentCarrera) {
                            if (currentSemestre) {
                                if (currentCurso) { // Si hay un curso en el semestre anterior, agregarlo
                                    currentSemestre.cursos.push(currentCurso);
                                    currentCurso = null;
                                }
                                currentCarrera.semestres.push(currentSemestre);
                            }
                            currentSemestre = { numero: 0, cursos: [] };
                            expecting = 'semestre_numero';
                        }
                        break;
                    case KEYWORDS.CURSO:
                        if (currentSemestre) {
                            if (currentCurso) { // Si hay un curso en el semestre anterior, agregarlo
                                currentSemestre.cursos.push(currentCurso);
                            }
                            currentCurso = { codigo: 0, nombre: "", area: 0, prerequisitos: [] };
                            expecting = 'curso_codigo';
                        }
                        break;
                    case KEYWORDS.NOMBRE:
                        if (currentCurso)
                            expecting = 'curso_nombre';
                        break;
                    case KEYWORDS.AREA:
                        if (currentCurso)
                            expecting = 'curso_area';
                        break;
                    case KEYWORDS.PRERREQUISITOS:
                        if (currentCurso)
                            expecting = 'prerrequisitos_lista';
                        break;
                }
            }
            else if (token.tipo === TOKEN_TYPES.CADENA_TEXTO) {
                const cleanText = token.lexema.substring(1, token.lexema.length - 1);
                if (expecting === 'carrera_nombre' && currentCarrera) {
                    currentCarrera.nombre = cleanText;
                    expecting = null;
                }
                else if (expecting === 'curso_nombre' && currentCurso) {
                    currentCurso.nombre = cleanText;
                    expecting = null;
                }
            }
            else if (token.tipo === TOKEN_TYPES.NUMERO_ENTERO) {
                const numValue = parseInt(token.lexema);
                if (expecting === 'semestre_numero' && currentSemestre) {
                    currentSemestre.numero = numValue;
                    expecting = null;
                }
                else if (expecting === 'curso_codigo' && currentCurso) {
                    currentCurso.codigo = numValue;
                    expecting = null;
                }
                else if (expecting === 'curso_area' && currentCurso) {
                    currentCurso.area = numValue;
                    expecting = null;
                }
                else if (expecting === 'prerrequisitos_lista' && currentCurso) {
                    // Esperamos una lista de números. Necesitamos consumir números hasta que veamos ')'
                    let j = i;
                    while (tokens[j + 1] && tokens[j + 1].tipo !== TOKEN_TYPES.PARENTESIS_CERRAR) {
                        j++;
                        if (tokens[j].tipo === TOKEN_TYPES.NUMERO_ENTERO) {
                            currentCurso.prerequisitos.push(parseInt(tokens[j].lexema));
                        }
                        else if (tokens[j].tipo !== TOKEN_TYPES.COMA) {
                            // Manejar error si no es número ni coma
                            break; // Salir si encontramos algo inesperado
                        }
                    }
                    i = j; // Ajustar el índice para que el bucle principal continúe después de la lista
                    expecting = null; // Terminamos de procesar la lista
                }
            }
            else if (token.tipo === TOKEN_TYPES.LLAVE_CERRAR) {
                // Esto podría indicar el fin de un curso, semestre o carrera.
                // Aquí se necesitaría una lógica de pila más compleja para asegurar el anidamiento.
                // Por ahora, simplemente intentamos cerrar el nivel actual si está abierto.
                if (currentCurso) {
                    if (currentSemestre) {
                        currentSemestre.cursos.push(currentCurso);
                    }
                    currentCurso = null;
                }
                else if (currentSemestre) {
                    if (currentCarrera) {
                        currentCarrera.semestres.push(currentSemestre);
                    }
                    currentSemestre = null;
                }
                // Nota: El cierre de Carrera '[' ... ']' no está explícitamente en tu gramática
                // Pero tu ejemplo de datos tiene la carrera como un objeto general, no dentro de []
                // Si Carrera fuera `Carrera: "Nombre" [ semestres ]` entonces necesitaríamos manejar `[` y `]`.
            }
        }
        // Asegurarse de añadir la última carrera/semestre/curso al final del análisis
        if (currentCarrera) {
            if (currentSemestre) {
                if (currentCurso) {
                    currentSemestre.cursos.push(currentCurso);
                }
                currentCarrera.semestres.push(currentSemestre);
            }
            carreras.push(currentCarrera);
        }
        return carreras;
    }
    generatePensumHtml(tokens) {
        const carreras = this.buildPensumStructure(tokens);
        let htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Pensum Interactivo</title>
                <link rel="stylesheet" href="pensum.css">
            </head>
            <body>
                <h1>Pensum Interactivo</h1>
        `;
        if (carreras.length === 0) {
            htmlContent += `<p>No se pudo generar el pensum. Verifique la sintaxis del archivo de entrada.</p>`;
        }
        else {
            carreras.forEach(carrera => {
                htmlContent += `
                    <div class="carrera-container">
                        <h2>${carrera.nombre}</h2>
                        <table class="tbl" border="1">
                            <thead id="cabecera-${carrera.nombre.replace(/\s/g, '-')}-head">
                                <tr>
                `;
                // Generar los encabezados de los semestres
                const maxSemestres = Math.max(...carrera.semestres.map(s => s.numero));
                for (let i = 1; i <= maxSemestres; i++) {
                    htmlContent += `<th>Semestre ${i}</th>`;
                }
                htmlContent += `
                                </tr>
                            </thead>
                            <tbody id="cuerpo-${carrera.nombre.replace(/\s/g, '-')}-body">
                `;
                // Generar filas para cada área (suponemos 6 áreas, como es común)
                const numAreas = 6; // O el número máximo de área que encuentres en los datos
                for (let areaIndex = 1; areaIndex <= numAreas; areaIndex++) {
                    htmlContent += `<tr>`;
                    for (let semestreIndex = 1; semestreIndex <= maxSemestres; semestreIndex++) {
                        const semestre = carrera.semestres.find(s => s.numero === semestreIndex);
                        let cursoEnCelda = false;
                        if (semestre) {
                            const cursosEnArea = semestre.cursos.filter(curso => curso.area === areaIndex);
                            if (cursosEnArea.length > 0) {
                                // Puedes elegir cómo mostrar múltiples cursos en la misma celda si existen
                                htmlContent += `<td>`;
                                cursosEnArea.forEach(curso => {
                                    htmlContent += `
                                        <div class="curso-item" data-codigo="${curso.codigo}" data-prerequisitos="${curso.prerequisitos.join(',')}" id="curso-${curso.codigo}">
                                            <span class="codigo">${curso.codigo}</span>
                                            <span>${curso.nombre}</span>
                                            ${curso.prerequisitos.length > 0 ? `<span class="pre"><p>${curso.prerequisitos.join('</p><p>')}</p></span>` : ''}
                                        </div>
                                    `;
                                });
                                htmlContent += `</td>`;
                                cursoEnCelda = true;
                            }
                        }
                        if (!cursoEnCelda) {
                            htmlContent += `<td></td>`; // Celda vacía si no hay cursos en esa área/semestre
                        }
                    }
                    htmlContent += `</tr>`;
                }
                htmlContent += `
                            </tbody>
                        </table>
                    </div>
                `;
            });
        }
        htmlContent += `
                <script>
                    document.querySelectorAll('.curso-item').forEach(item => {
                        item.addEventListener('click', function() {
                            // Limpiar selecciones anteriores en TODO el documento
                            document.querySelectorAll('.curso-item').forEach(c => {
                                c.classList.remove('selected');
                                c.classList.remove('prerequisite');
                            });

                            this.classList.add('selected');
                            const prerequisites = this.dataset.prerequisitos ? this.dataset.prerequisitos.split(',').map(Number) : [];

                            prerequisites.forEach(prereqCode => {
                                const prereqElement = document.querySelector(\`[data-codigo="\${prereqCode}"]\`);
                                if (prereqElement) {
                                    prereqElement.classList.add('prerequisite');
                                }
                            });
                        });
                    });
                </script>
            </body>
            </html>
        `;
        return htmlContent;
    }
}
