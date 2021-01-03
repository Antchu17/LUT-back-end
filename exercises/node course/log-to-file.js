const Logger = require('./logger');
const fs = require('fs');
const path = require('path');

const logger = new Logger();

fs.writeFile(path.join(__dirname, 'log-to-file', 'log.txt'), 'log\n', err => {
	if(err) throw err;
	console.log('File created');
});

logger.on('message', (data) => fs.appendFile(path.join(__dirname, '/log-to-file', 'log.txt'), JSON.stringify(data) + "\n", err => {
	if(err) throw err;
	console.log('File written to');
}));

logger.log('Jou');
logger.log('Does this work');