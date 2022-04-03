const express = require('express')
const path = require('path')
const config = require('config')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const winston = require('winston');
const expressWinston = require('express-winston');
const { combine, timestamp, label, prettyPrint } = winston.format;

const db = require('./db/index.js')
const errorMiddlaware = require('./middleware/error.middleware')
const {bot} = require('./telegram/index.js')
const state = require('./state')
const app = express()

var corsOptions = {
	credentials:true, 
	origin: 'http://localhost:3000',
	// origin: config.get("devUrl"),
	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(expressWinston.logger({
	transports: [
	  new winston.transports.File({ filename: 'error.log', level: 'error' }),
	  new winston.transports.File({ filename: 'combined.log' }),
	],
	format: combine(
		// label({ label: 'right meow!' }),
		timestamp(),
		prettyPrint()
	),
	meta: false,
	msg: "HTTP  ",
	expressFormat: true,
	colorize: true,
	ignoreRoute: function (req, res) { return false; }
}));

app.use(cookieParser())
app.use(cors(corsOptions))
app.use(express.json({extended:true}))

app.get('/state', (req, res) => res.json(state))

app.use('/static',express.static(path.resolve(__dirname, 'static')))

app.use("/auth", require('./routes/auth.routes'))
app.use("/vacancy", require('./routes/vacancy.routes'))
app.use("/resume", require('./routes/resume.routes')) 
app.use("/form", require('./routes/form.routes'))
app.use("/answer", require('./routes/answer.routes'))
app.use("/events", require('./routes/events.routes'))
app.use("/r-admin", require('./routes/admin.routes'))


app.use(errorMiddlaware)  


const PORT = config.get('port') || 5000 

async function start() {
	try {
		await db.sequelize.authenticate();

		const secretPath = `/telegraf/${bot.secretPathComponent()}`

		bot.telegram.setWebhook(`${config.get("devUrl")}${secretPath}`) 

		app.use(bot.webhookCallback(secretPath)) 

		if(process.env.NODE_ENV === 'production') {  
			app.use('/', express.static(path.join(__dirname, 'client', 'build')))
			app.use('*', (req, res) => {
				res.sendFile((path.resolve(__dirname, 'client', 'build', 'index.html')))
			})
		}
		

		app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
	} catch(e) {
		console.log('Server error ', e.message);
		process.exit(1)
	}
}

start()
