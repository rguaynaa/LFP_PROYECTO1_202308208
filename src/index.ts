import express from 'express';
import path from 'path';
import appRoutes from './routes/app.route';

const app = express();
const PORT = 3000;

app.use(express.text({ type: 'text/plain' }));


app.set('view engine', 'ejs');


app.set('views', path.join(__dirname, '../views'));

app.use(express.static(path.join(__dirname, '../public')));


// Rutas de la aplicación
app.use('/', appRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});