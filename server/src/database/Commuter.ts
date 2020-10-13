import mongoose = require("mongoose");

// const uri: string = 'mongodb://localhost/buschecker';

// mongoose.connect(uri, (err: any) => {
// 	if (err) {
// 		console.log(err.message);
// 	}
// 	else {
// 		console.log("Successfully connected to MongoDB, comm");
// 	}
// })

export const CommuterSchema = new mongoose.Schema({
	matric: { type: String, required: true },
	name: { type: String, required: true },
	email: { type: String, required: true }
})

const Commuter = mongoose.model('Commuter', CommuterSchema);
export default Commuter;