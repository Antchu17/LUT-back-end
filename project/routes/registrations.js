const express = require('express');
const { get } = require('mongoose');
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

//one by license
router.get('/:license', getRegistrationL, (req, res) => {
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
router.patch('/:id', getRegistration, async (req, res) => {
	if (req.body.name != null) {
		res.registration.license = req.body.license
	}
	if (req.body.vehicleType != null) {
		res.registration.vehicleType = req.body.vehicleType
	}
	if (req.body.vehicleBrand != null) {
		res.registration.vehicleBrand = req.body.vehicleBrand
	}
	try {
		const updatedRegistration = await res.registration.save()
		res.json(updatedRegistration)
	} catch (err) {
		res.status(400).json({msg: err.message})
	}
})

//delete one
router.delete('/:id',getRegistration, async (req, res) => {
	try{
		await res.registration.remove()
		res.json({msg: `Removed registration for ${res.registration}`})
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

async function getRegistrationL(req, res, next){
	try {
		registration = await Registration.findById(req.params.license)
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