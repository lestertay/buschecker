import { Request, Response } from 'express';
import Admin from './../database/Admin';

// - GET - /alladmin # returns all admin accounts
export let allAdmin = (req: Request, res: Response) => {
	let admin = Admin.find((err: any, admin: any) => {
		if (err) {
			res.send(err);
		}
		else {
			res.send(admin);
		}
	})
}

// - GET - /admin/{1} returns a admin with id of 1
export let getAdmin = (req: Request, res: Response) => {
	Admin.findById(req.params.id, (err: any, admin: any) => {
		if (err) {
			res.send(err);
		}
		else {
			res.send(admin);
		}
	})
}

// - POST - /admin # inserts a new admin into the table
export let addAdmin = (req: Request, res: Response) => {
	let admin = new Admin(req.body);

	admin.save((err: any) => {
		if (err) {
			res.send(err);
		}
		else {
			res.send(admin);
		}
	})
}

// - DELETE - /admin/{1} # deletes a admin with id of 1
export let deleteAdmin = (req: Request, res: Response) => {
	Admin.deleteOne({ _id: req.params.id }, (err: any) => {
		if (err) {
			res.send(err);
		}
		else {
			res.send("Successfully deleted admin");
		}
	})
}

// - PUT - /admin/{1} # updates a admin with id of 1
export let updateAdmin = (req: Request, res: Response) => {
	Admin.findByIdAndUpdate(req.params.id, req.body, (err: any, admim: any) => {
		if (err) {
			res.send(err);
		}
		else {
			res.send("Successfully updated admin");
		}
	})
}