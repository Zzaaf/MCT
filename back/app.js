import express from 'express';
import routerSignup from './routers/signUp.js';
import routerSignin from './routers/signIn.js';
import routerLogout from './routers/logout.js';
import routerCitypost from './routers/addCity.js'


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/signup', routerSignup);
app.use('/signin', routerSignin);
app.use('/logout', routerLogout);
app.use('/', routerCitypost);

export default app;
