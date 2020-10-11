import { Request, Response } from 'express';
import Trip from './../database/Trip';

var commuterNameList: string[] = [];

// - GET - /alltrip # returns all trips
export let allTrip = (req: Request, res: Response) => {
	let trips = Trip.find((err: any, trips: any) => {
		if (err) {
			res.send(err);
		}
		else {
			res.send(trips);
		}
	})
}

// - GET - /trip/{1} returns a trip with id of 1
export let getTrip = (req: Request, res: Response) => {
	Trip.findById(req.params.id, (err: any, trip: any) => {
		if (err) {
			res.send(err);
		}
		else {
			res.send(trip);
		}
	})
}

// - POST - /Commuter # inserts a new trip into the table
export let addTrip = (req: Request, res: Response) => {
	let trip = new Trip(req.body);

	commuterNameList.forEach(function (name) {
		if (name == req.body.commuterName) {
			res.send("Commuter already boarded.");
			return;
		}
	})
	commuterNameList.push(req.body.commuterName);

	trip.save((err: any) => {
		if (err) {
			res.send(err);
		}
		else {
			res.send(trip);
		}
	})
}

// - DELETE - /trip/{1} # deletes a trip with id of 1
export let deleteTrip = (req: Request, res: Response) => {
	Trip.deleteOne({ _id: req.params.id }, (err: any) => {
		if (err) {
			res.send(err);
		}
		else {
			res.send("Successfully deleted trip");
		}
	})
}

// - PUT - /trip/{1} # updates a trip with id of 1
export let updateTrip = (req: Request, res: Response) => {
	let found: boolean = true;
	const filter = {
		commuterName: req.body.commuterName,
		busDriver: req.body.busDriver,
		busPlate: req.body.busPlate
	};
	const update = req.body;
	for (let i = 0; i < commuterNameList.length; i++) {
		if (commuterNameList[i] == req.body.commuterName) {
			found = false;
			break;
        }
	}
	if (found) {
		var index = commuterNameList.indexOf(req.body.commuterName);
		commuterNameList.splice(index, 1);
		Trip.findOneAndUpdate(filter, update, (err: any, trip: any) => {
			if (err) {
				res.send(err);
			}
			else {
				res.send("Successfully updated trip");
			}
		})
	}
	else {
		res.status(400).string("Commuter not found");
    }
}