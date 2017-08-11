// require all node module stuff
const express = require('express')
const nunjucks = require('nunjucks')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')

// require my code (e.g. db and routes)
const db = require('./models')
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

app.use(express.static(path.join(__dirname, 'public')))

// do routes
app.use(routes)

// do app.listen (inside a db.sync)
db.sync()
	.then(function(){
		app.listen(3000, function(){
			console.log('keeping it 3000')
		})
	})
