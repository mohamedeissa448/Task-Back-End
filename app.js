
var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var cors=require('cors')
var bodyParser=require('body-parser')
var mongoose=require('mongoose');

var matchesRouter = require("./routes/matches-route");
var leaguesRouter = require("./routes/leagues-route");
var teamsRouter = require("./routes/teams-route");

var app = express();

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json({extended:false}));

//connect to DB
mongoose.connect("mongodb://localhost:27017/task", { useNewUrlParser: true,useUnifiedTopology:true })
.then((db)=>console.log("connected to DB"))
.catch(()=>console.log("Couldn't connect to DB"))

app.use('/matches', matchesRouter);
app.use('/leagues', leaguesRouter);
app.use('/teams', teamsRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
