const router = require('express').Router()
const db = require('../models')
const Restaurant = db.Restaurant;
const Place = db.Place;
const Activity = db.Activity;
const Hotel = db.Hotel;

let outerScopeContainer = {};

//our code
// router.get('/', function (req, res, next) {
// 	Restaurant.findAll()
// 		.then((restaurants) => {
// 			outerScopeContainer.restaurants = restaurants;
// 			return Hotel.findAll()
// 		})
// 		.then((hotels) => {
// 			outerScopeContainer.hotels = hotels;
// 			return Activity.findAll()
// 		})
// 		.then((activities) => {
// 			res.render('index', {
// 				templateHotels: outerScopeContainer.hotels,
// 				templateRestaurants: outerScopeContainer.restaurants,
// 				templateActivities: activities
// 			})
// 		})
// 		.catch(next)
// })


//solution code:
const findingHotels=Hotel.findAll();
const findingActivities=Activity.findAll();
const findingRestaurants=Restaurant.findAll();

router.get('/',(req, res, next)=> {
	Promise.all([findingHotels, findingActivities, findingRestaurants])
		.then((resultArray)=>{
			res.render('index', {
			templateHotels: resultArray[0],
			templateRestaurants: resultArray[1],
			templateActivities: resultArray[2]
		})})
		.catch(next)
})



module.exports = router
