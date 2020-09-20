import { Request, Response } from 'express';
import Commuter from './../database/Commuter';

// - GET - /allcommuter # returns all commuters
export let allCommuters = (req: Request, res: Response) => {
	let commuters = Commuter.find((err: any, commuters: any) => {
		if (err) {
			res.send(err);
		}
		else {
			res.send(commuters);
		}
	})
}

// - GET - /commuter/{1} returns a commuter with id of 1
export let getCommuter = (req: Request, res: Response) => {
	Commuter.findById(req.params.id, (err: any, book: any) => {
		if (err) {
			res.send(err);
		}
		else {
			res.send(Commuter);
		}
	})
}

// - PUT - /commuter # inserts a new commuter into the table
export let addCommuter = (req: Request, res: Response) => {
	let commuter = new Commuter(req.body);

	commuter.save((err: any) => {
		if (err) {
			res.send(err);
		}
		else {
			res.send(commuter);
		}
	})
}

// - DELETE - /commuter/{1} # deletes a commuter with id of 1
export let deleteCommuter = (req: Request, res: Response) => {
	Commuter.deleteOne({ _id: req.params.id }, (err: any) => {
		if (err) {
			res.send(err);
		}
		else {
			res.send("Successfully deleted commuter");
		}
	})
}

// - POST - /Commuter/{1} # updates a commuter with id of 1
export let updateCommuter = ( req: Request, res: Response) => {
	Commuter.findByIdAndUpdate( req.params.id, req.body, (err: any, commuter: any) => {
		if (err) {
			res.send(err);
		}
		else {
			res.send("Successfully updated commuter");
		}
	})
}