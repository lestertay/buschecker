import { Request, Response } from 'express';
import Bus from './../database/Bus';

// - GET - /allbus # returns all buses
export let allBus = (req: Request, res: Response) => {
	let bus = Bus.find((err: any, commuters: any) => {
		if (err) {
			res.send(err);
		}
		else {
			res.send(bus);
		}
	})
}

// - GET - /bus/{1} returns a bus with id of 1
export let getBus = (req: Request, res: Response) => {
	Bus.findById(req.params.id, (err: any, book: any) => {
		if (err) {
			res.send(err);
		}
		else {
			res.send(Bus);
		}
	})
}

// - PUT - /bus # inserts a new bus into the table
export let addBus = (req: Request, res: Response) => {
	let bus = new Bus(req.body);

	bus.save((err: any) => {
		if (err) {
			res.send(err);
		}
		else {
			res.send(bus);
		}
	})
}

// - DELETE - /bus/{1} # deletes a bus with id of 1
export let deleteBus = (req: Request, res: Response) => {
	Bus.deleteOne({ _id: req.params.id }, (err: any) => {
		if (err) {
			res.send(err);
		}
		else {
			res.send("Successfully deleted bus");
		}
	})
}

// - POST - /bus/{1} # updates a bus with id of 1
export let updateBus = (req: Request, res: Response) => {
	Bus.findByIdAndUpdate(req.params.id, req.body, (err: any, commuter: any) => {
		if (err) {
			res.send(err);
		}
		else {
			res.send("Successfully updated bus");
		}
	})
}