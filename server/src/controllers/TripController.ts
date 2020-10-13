import { Request, Response } from 'express';
import Trip from './../database/Trip';

var commuterNameList: string[] = [];

// - GET - /alltrip # returns all trips
export let allTrip = (req: Request, res: Response) => {
	Trip.find((err: any, trips: any) => {
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
  console.log(req.body.trip)
	let trip = new Trip(req.body);
  console.log('adding new trip', JSON.stringify(trip))
	commuterNameList.forEach(function (name) {
		if (name == req.body.commuterName) {
			res.send("Commuter already boarded.");
			return res.send(`people here ${commuterNameList}`);
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

// - PUT - /trip # updates a trip
export let updateTrip = (req: Request, res: Response) => {
	let found: boolean = true;
	const filter = {
		commuterName: req.body.commuterName,
		busDriver: req.body.busDriver,
		busPlate: req.body.busPlate,
		startTime: req.body.startTime,
		startLoc: req.body.startLoc
	};
	const update = { 
		stopTime : req.body.stopTime,
		stopLoc : req.body.stopLoc
	};

	var index = commuterNameList.indexOf(req.body.commuterName);
	commuterNameList.splice(index, 1);
	Trip.findOneAndUpdate(filter, update, (err: any) => {
		if (err) {
			res.send("Commuter not found, " + err);
		}
		else {
			res.send("Successfully updated trip");
		}
	})

}