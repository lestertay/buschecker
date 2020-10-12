import mongoose = require("mongoose");

const uri: string = 'mongodb://localhost/buschecker';

mongoose.connect(uri, (err: any) => {
	if (err) {
		console.log(err.message);
	}
	else {
		console.log("Successfully connected to MongoDB");
	}
})

export const TripSchema = new mongoose.Schema({
	commuterName: { type: String, required: true},
	busDriver: { type: String, required: true },
	busPlate: { type: String, required: true },
	startTime: { type: String, required: true },
	startLoc: { type: String, required: true },
	stopTime: { type: String, required: false},
	stopLoc: { type: String, required: false }
})

const Trip = mongoose.model('Trip', TripSchema);
export default Trip;