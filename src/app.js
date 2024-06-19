import express, { urlencoded, json } from 'express';
import cors from 'cors';
import router from './routers/router.js';
// import errorHandling from './error/errorHandling.js';

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(cors());
app.use(urlencoded({ extended: false}));
app.use(json());
app.use(router);
app.use((req, res, next) => {
    res.status(404).json({
        error: true,
        codigo: 404,
        message: 'Endpoint doesn\'t found'
    })
});
// app.use(errorHandling);
const listen = (port, callback) => {
    app.listen(port, callback);
};

const get = (key) => app.get(key);

export { listen, get };
export default app;
