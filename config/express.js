import { static } from 'express';
import handlebars from 'express-handlebars';
import { urlencoded } from 'body-parser';
import { resolve } from 'path';
import cookieParser from 'cookie-parser';
const secret = 'sssecrettt';

export default (app) => {
    app.use(urlencoded({ extended: false }));
    app.use(cookieParser(secret));
    app.engine('.hbs', handlebars({
        extname: '.hbs',
        defaultLayout: '_layout',
        layoutsDir: 'views',
        partialsDir: 'views/partials'
    }));
    app.set('views', resolve(__basedir, 'views'));
    app.use(static(resolve(__basedir, 'static')));
};