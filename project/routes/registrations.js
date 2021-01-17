const express = require('express');
const router = express.Router();
const Registration = require('../models/registration')

//all
router.get('/', async (req, res) => {
	try {
		const registrations = await Registration.find()
		res.json(registrations)
	} catch {
		res.status(500).json({msg: err.message})
	}
})

//one by id
router.get('/:id', getRegistration, (req, res) => {
	res.json(res.registration)
})

//create
router.post('/', async (req, res) => {
	const registration = new Registration({
		license: req.body.license,
		vehicleType: req.body.vehicleType,
		vehicleBrand: req.body.vehicleBrand,
		registrationDate: req.body.registrationDate
	})

	try {
		const newRegistration = await registration.save()
		res.status(201).json(newRegistration)
	}catch (err){
		res.status(400).json({msg: err.message})
	}
})

//update one

//delete one
router.delete('/:id',getRegistration, async (req, res) => {
	try{
		await res.registration.remove()
		res.json({msg: 'removed registration'})
	}catch{
		res.status(500).json({msg: err.message})
	}
})

async function getRegistration(req, res, next){
	try {
		registration = await Registration.findById(req.params.id)
		if (registration == null){
			return res.status(404).json({msg: 'Cannot find registration'})
		}
	} catch (err) {
		return res.status(500).json({msg: err.message})
	}

	res.registration = registration
	next()
}


module.exports = router