export class ErrorHandler {
    constructor() {
        this.errors = [];
        this.errorCount = 0;
    }
    addError(fila, columna, descripcion) {
        this.errorCount++;
        this.errors.push({
            numero: this.errorCount,
            fila,
            columna,
            descripcion
        });
    }
    getErrors() {
        return this.errors;
    }
    hasErrors() {
        return this.errors.length > 0;
    }
    clearErrors() {
        this.errors = [];
        this.errorCount = 0;
    }
    generateErrorHtml() {
        if (!this.hasErrors()) {
            return `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Reporte de Errores Léxicos</title>
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
                    <h1>Reporte de Errores Léxicos</h1>
                    <p>No se encontraron errores léxicos.</p>
                </body>
                </html>
            `;
        }
        let htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Reporte de Errores Léxicos</title>
                <style>
                    body { font-family: sans-serif; margin: 20px; }
                    h1 { color: #dc3545; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    th { background-color: #f8d7da; color: #721c24; }
                    tr:nth-child(even) { background-color: #fce8e6; }
                </style>
            </head>
            <body>
                <h1>Reporte de Errores Léxicos</h1>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Fila</th>
                            <th>Columna</th>
                            <th>Descripción</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        this.errors.forEach(error => {
            htmlContent += `
                        <tr>
                            <td>${error.numero}</td>
                            <td>${error.fila}</td>
                            <td>${error.columna}</td>
                            <td>${error.descripcion}</td>
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
}
