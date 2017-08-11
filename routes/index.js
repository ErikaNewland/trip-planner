const router = require('express').Router()
const db = require('../models')
const Restaurant = db.Restaurant;
const Place = db.Place;
const Activity = db.Activity;
const Hotel = db.Hotel;

let outerScopeContainer = {};

router.get('/', function (req, res, next) {
	Restaurant.findAll()
		.then((restaurants) => {
			outerScopeContainer.restaurants = restaurants;
			return Hotel.findAll()
		})
		.then((hotels) => {
			outerScopeContainer.hotels = hotels;
			return Activity.findAll()
		})
		.then((activities) => {
			res.render('index', {
				templateHotels: outerScopeContainer.hotels,
				templateRestaurants: outerScopeContainer.restaurants,
				templateActivities: activities
			})
			.catch(next)
		})
	})


	// router.get('/restaurants', function (req, res, next) {
	// 	Restaurant.findAll({})
	// 		.then((result) => res.send(result))
	// })

	// router.get('/places', function (req, res, next) {
	// 	Place.findAll()
	// 		.then((result) => res.send(result))
	// })

	// router.get('/activities', function (req, res, next) {
	// 	Activity.findAll()
	// 		.then((result) => res.send(result))
	// })

	// router.get('/hotels', function (req, res, next) {
	// 	Hotel.findAll()
	// 		.then((result) => res.send(result))
	// })

	module.exports = router
