// src/server.ts
import express from 'express';
import path from 'path';
import fs from 'fs';
// CORRECCIÓN DE RUTAS DE IMPORTACIÓN PARA server.ts DENTRO DE 'src/'
import { Lexer } from './analizador/analizador'; // Corregido: dentro de 'src/analyzator'
import { ErrorHandler } from './analizador/errorHandler'; // Corregido: dentro de 'src/analyzator'
import { HtmlGenerator } from './utils/htmlGenerator'; // Corregido: dentro de 'src/utils'
const app = express();
const port = 3000;
// Instancias de las clases
const errorHandler = new ErrorHandler();
const lexer = new Lexer(errorHandler); // Pasa errorHandler si tu Lexer lo necesita en el constructor
const htmlGenerator = new HtmlGenerator();
// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, '../public')));
// Sirve los archivos compilados de TypeScript (como index.js) desde la carpeta 'dist'
app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use(express.json());
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});
app.post('/analyze', (req, res) => {
    const inputText = req.body.code;
    if (!inputText) {
        return res.status(400).json({ error: 'No code provided for analysis.' });
    }
    const tokens = lexer.analyze(inputText);
    const errorHtml = errorHandler.generateErrorHtml();
    const pensumHtml = htmlGenerator.generatePensumHtml(tokens);
    const tokensHtml = htmlGenerator.generateTokensHtml(tokens);
    const publicPath = path.join(__dirname, '../public');
    fs.writeFileSync(path.join(publicPath, 'pensum.html'), pensumHtml);
    fs.writeFileSync(path.join(publicPath, 'errors.html'), errorHtml);
    fs.writeFileSync(path.join(publicPath, 'tokens_report.html'), tokensHtml);
    res.json({
        success: true,
        message: 'Analysis complete. HTML files generated.',
        pensumUrl: '/pensum.html',
        errorsUrl: '/errors.html',
        tokensReportUrl: '/tokens_report.html',
        tokens: tokens
    });
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Serving static files from: ${path.join(__dirname, '../public')}`);
    console.log(`Serving compiled JS from: http://localhost:${port}/dist/`);
});
