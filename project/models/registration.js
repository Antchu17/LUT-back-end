const mongoose = require('mongoose')

const registrationSchema = new mongoose.Schema({
	license: {
		type: String,
		required: true
	},
	vehicleType: {
		type: String,
		required: true,
		default: "Unspecified"
	},
	registrationDate: {
		type: Date,
		required: true,
		default: Date.now
	}
})

module.exports = mongoose.model('registration', registrationSchema)