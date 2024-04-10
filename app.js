
const express = require('express')
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const morgan = require('morgan');
const nunjucks = require('nunjucks');

const {sequelize} = require('./models');

dotenv.config();
const indexRouter = require('./routes');
const loginRouter = require('./routes/login');

const app = express()
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

app.use('/', indexRouter);
app.use('/login', loginRouter);

app.listen(app.get('port'), ()=> {
    console.log(app.get('port'),'번 포트에서 대기 중');
});