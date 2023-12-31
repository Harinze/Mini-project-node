import dotenv from 'dotenv';  
import createError, {HttpError} from 'http-errors';
import express, {Request, Response, NextFunction}  from 'express';
import path from 'path';
import cookieParser  from 'cookie-parser';
import logger from 'morgan';

dotenv.config({path: __dirname + '/.env'});

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const connectDB = require('./config/dbConn');

connectDB();

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/decadev', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function(err: HttpError, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;


// {
//   "firstName": "King",
//     "lastName": "Ibe",
//     "squadNumber": "SQ16",
//     "stack": "nodejs",
//     "linkedinLink": "https://www.linkedin.com",
//     "email": "kingsleyi@decagon.com",
//     "password": "Password1"
//     }