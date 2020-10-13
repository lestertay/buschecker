import mongoose = require('mongoose');

// const uri: string = 'mongodb://localhost/buschecker';

// mongoose.connect(uri, (err: any) => {
// 	if (err) {
// 		console.log(err.message);
// 	}
// 	else {
// 		console.log("Successfully connected to MongoDB, admin");
// 	}
// })

export const AdminSchema = new mongoose.Schema({
	login: { type: String, required: true },
	password: { type: String, required: true }
})

const Admin = mongoose.model('Admin', AdminSchema);
export default Admin;