export class Router {
    constructor() {
        this.init();
    }
    init() {
        // En una aplicación de página única (SPA), un router manejaría las rutas del navegador.
        // Dado que estamos generando HTML y abriendo nuevas ventanas/pestañas para los reportes
        // y el pensum, este router se enfocará más en la gestión de eventos de UI
        // para disparar esas acciones, en lugar de cambiar rutas en la URL principal.
    }
    /**
     * Abre un nuevo archivo HTML en una nueva pestaña/ventana.
     * @param htmlContent El contenido HTML a mostrar.
     * @param fileName El nombre del archivo sugerido para la URL del blob.
     * @param title El título de la nueva ventana/pestaña.
     */
    openHtmlInNewTab(htmlContent, fileName, title) {
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const newWindow = window.open(url, '_blank');
        if (newWindow) {
            newWindow.document.title = title;
        }
        return newWindow;
    }
    /**
     * Navega a la página de inicio (recarga la página principal).
     */
    goToHome() {
        window.location.reload();
    }
    /**
     * Abre el reporte de errores léxicos.
     * @param errorHtml El contenido HTML del reporte de errores.
     */
    openErrorReport(errorHtml) {
        this.openHtmlInNewTab(errorHtml, 'errors.html', 'Reporte de Errores Léxicos');
    }
    /**
     * Abre el pensum interactivo.
     * @param pensumHtml El contenido HTML del pensum.
     */
    openPensum(pensumHtml) {
        this.openHtmlInNewTab(pensumHtml, 'pensum.html', 'Pensum Interactivo');
    }
}
