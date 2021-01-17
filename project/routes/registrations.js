const express = require('express');
const registration = require('../models/registration');
const router = express.Router();
const Registration = require('../models/registration')

//all
router.get('/', async (req, res) => {
	try {
		const registrations = await registration.find()
		res.json(registrations)
	} catch {
		res.status(500).json({msg: err.message})
	}
})

//one by id
router.get('/:id', getRegistrationI, (req, res) => {
	res.json(res.registration)
})
//one by license
router.get('/:license', getRegistrationL, (req, res) => {
	res.json(res.registration)
})
//Search all with a certain brand
router.get('/:brand', getRegistrationB, (req, res) => {
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

async function getRegistrationI(req, res, next){
	try{
		registration = await registration.findById(req.params.id)
		if (registration == null){
			return res.status(404).json({msg: 'Cannot find registration'})
		}
	}catch (err){
		return res.status(500).json({msg: err.message})
	}

	res.registration = registration
	next()
}

async function getRegistrationL(req, res, next){
	try{
		registration = await registration.findById(req.params.license)
		if (registration == null){
			return res.status(404).json({msg: 'Cannot find registration'})
		}
	}catch (err){
		return res.status(500).json({msg: err.message})
	}

	res.registration = registration
	next()
}

async function getRegistrationB(req, res, next){
	try{
		registrations = await registration.find().where(req.params.brand).in(ids).exec()
		if (registration == null){
			return res.status(404).json({msg: 'Cannot find registration'})
		}
	}catch (err){
		return res.status(500).json({msg: err.message})
	}

	res.registration = registration
	next()
}

module.exports = router