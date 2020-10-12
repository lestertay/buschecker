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

export const BusSchema = new mongoose.Schema({
	driver: { type: String, required: true },
	plate: { type: String, required: true }
})

const Bus = mongoose.model('Bus', BusSchema);
export default Bus;