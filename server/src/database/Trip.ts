import * as mongoose from 'mongoose';

const uri: string = 'mongodb://127/0/0/01:27017/local';

mongoose.connect(uri, (err: any) => {
	if (err) {
		console.log(err.message);
	}
	else {
		console.log("Successfully connected to MongoDB");
	}
})

export const TripSchema = new mongoose.Schema({
	commuterMatric: { type: String, required: true },
	busDriver: { type: String, required: true },
	busPlate: { type: String, required: true },
	startTime: { type: String, required: true },
	startLoc: { type: String, required: true },
	stopTime: { type: String, required: true },
	stopLoc: { type: String, required: true }
})

const Trip = mongoose.model('Trip', TripSchema);
export default Trip;