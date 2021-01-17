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
	vehicleBrand: {
		type: String,
		required: true
	},
	registrationDate: {
		type: Date,
		required: true,
		default: Date.now
	}
})

module.exports = mongoose.model('Registration', registrationSchema)