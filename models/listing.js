const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
	businessName: {
		type : String, 
		required : true
	},
	businessType: {
		type : String,
		default: 'other'
	},
	email: {
		type: String,
		required: false
	},
	phone: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: false
	},
	address2: {
		type: String,
		required: false
	},
	city: {
		type: String,
		required: true
	},
	state: {
		type: String,
		required: true
	},
	zipcode: {
		type: String,
		required: true
	}
	// selectedImage: {
	// 	type: String,
	// 	required: true
	// }
});

module.exports = mongoose.model('Listing', listingSchema);
