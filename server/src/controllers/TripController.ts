import { Request, Response } from 'express';
import {io} from '../Server';
import Trip from './../database/Trip';

var commuterList: string[] = [];

// - GET - /alltrip # returns all trips
export let allTrip = async (socket: any) => {
	Trip.find((err: any, trips: any) => {
		if (err) {
			return
		}
		else {
      console.log('sendingTrips')
      socket.emit('RECEIVE_TRIPS', trips)
			return
		}
	})
}
export const initialSync = (socket: any) => {
  socket.emit('COMMUTER_COUNT_UPDATE', {data: commuterList})
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
export let addTrip = (socket: any, data: any) => {
  console.log('received', data)
	let trip = new Trip({...data, completed: false});
  console.log('adding new trip', JSON.stringify(trip))
	if(!commuterList.includes(data.commuterName)){
    commuterList.push(data.commuterName);
    console.log('people in the bus: ', commuterList)
    socket.emit('COMMUTER_COUNT_UPDATE', {data: commuterList})
    trip.save((err: any) => {if(!err) console.log('saved trip')})
  }
  
  
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
export let updateTrip = (socket: any, data: any) => {
	let found: boolean = true;
	const filter = {
		commuterName: data.commuterName,
		busDriver: data.busDriver,
		busPlate: data.busPlate,
		completed: false
	};
	const update = { 
		stopTime : data.stopTime,
    stopLoc : data.stopLoc,
    completed: true
	};

	var index = commuterList.indexOf(data.commuterName);
  commuterList.splice(index, 1);
  socket.emit('COMMUTER_COUNT_UPDATE', {data: commuterList})
	Trip.findOneAndUpdate(filter, update, (err: any) => {
		if (!err) console.log('updated successfully')
	})

}