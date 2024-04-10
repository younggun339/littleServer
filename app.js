
const express = require('express')
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
// const passport = require('passport');

const {sequelize} = require('./models');
// const passportConfig = require('./passport');

dotenv.config();
const indexRouter = require('./routes');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');


const app = express()
// passportConfig();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');

nunjucks.configure('views', {
    express : app,
    watch : true,
});
sequelize.sync({force :false})
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err)=> {
        console.error(err);
    });


app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure:false,
    },
}));
// app.use(passport.initialize());
// app.use(passport.session());

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next)=> {
    res.locals.message = err.message;
    res.locals.erro= process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
    next();
});

app.listen(app.get('port'), ()=> {
    console.log(app.get('port'),'번 포트에서 대기 중');
});