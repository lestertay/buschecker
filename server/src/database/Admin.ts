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

export const AdminSchema = new mongoose.Schema({
	login: { type: String, required: true },
	password: { type: String, required: true }
})

const Admin = mongoose.model('Admin', AdminSchema);
export default Admin;