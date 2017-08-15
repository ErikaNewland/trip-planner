// require all node module stuff
const express = require('express')
const nunjucks = require('nunjucks')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')

// require my code (e.g. db and routes)
const db = require('./models').db;
const routes = require('./routes')

// make an app instance of express
const app = express()

// do middleware
// logging
app.use(morgan('dev'))
// bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// set up template engine
nunjucks.configure('views', {noCache: true})
app.set('view engine', 'html')
app.engine('html', nunjucks.render)

app.use(express.static(path.join(__dirname + '/public')))
app.use(express.static(path.join(__dirname + '/node_modules/bootstrap/dist/')))
app.use(express.static(path.join(__dirname + '/node_modules/jquery/dist')))
// app.use(express.static('public'));


// do routes
app.use(routes)

//creating your own error
app.use((req, res, next)=>{
	const err = new Error('new Findy')
	next(err)
})

//building error handling middleware
app.use((err, req, res, next)=>{
	console.log(err)
	res.render('error', err);
})

// do app.listen (inside a db.sync)
db.sync()
	.then(function(){
		app.listen(3000, function(){
			console.log('keeping it 3000')
		})
	})
