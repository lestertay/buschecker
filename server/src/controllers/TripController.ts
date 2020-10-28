import { Request, Response } from 'express';
import Trip from './../database/Trip';

var commuterList: string[] = [];
var busRoute: string[] = ['Hall 10', 'North Hill', 'Hall 11', 'Tamarind', 'Hall 13', 'Hall 14', 'North Spine', 'South Spine', 'Hall 7']

// - GET - /alltrip # returns all trips
export let allTrip = async (socket: any) => {
	Trip.find((err: any, trips: any) => {
		if (err) {
			return
		}
		else {
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

// - GET - /findCovid # finds that covid fucker

export let findCovidFucker = async (req: Request, res: Response) => {

	Trip.findById(req.body._id, (err: any, covidTrip: any) => {
		if(err)
			res.send(err);
		else{
			let startList: Array<string> = covidTrip.startTime.split(' ');
			let stopList: Array<string> = covidTrip.stopTime.split(' ');

			let startTimeList: Array<string> = startList[4].split(':');
			let stopTimeList: Array<string> = stopList[4].split(':');

			let startTimeNumber: number = parseInt(startTimeList[0]) * 60 * 60 + parseInt(startTimeList[1]) * 60 + parseInt(startTimeList[2]);
			let stopTimeNumber: number = parseInt(stopTimeList[0]) * 60 * 60 + parseInt(stopTimeList[1]) * 60 + parseInt(stopTimeList[2]);

			if(startList[5].localeCompare('pm') == 0){
				startTimeNumber += 12 * 60 *60;
			}

			if(stopList[5].localeCompare('pm') == 0){
				stopTimeNumber += 12 * 60 * 60;
			}

			const filter = {
				busDriver: covidTrip.busDriver,
				busPlate: covidTrip.busPlate,
				startTime: new RegExp(`${startList[1]} ${startList[2]} ${startList[3]}`)
				
			};

			Trip.find(filter, (err: any, passengers: any) => {
				if (!err){
					console.log('found,', passengers)
					for(let i = 0; i < passengers.length; i ++){
						let pStartList: Array<string> = passengers[i].startTime.split(' ');
						let pStopList: Array<string> = passengers[i].stopTime.split(' ');

						console.log('pstartlist ', pStartList)
						console.log('pstoplist', pStopList)

						let pStartTimeList: Array<string> = pStartList[4].split(':');
						let pStopTimeList: Array<string> = pStopList[4].split(':');

						console.log('pstarttimelist ', pStartTimeList)
						console.log('pstoptimelist', pStopTimeList)

						let pStartTimeNumber: number = parseInt(pStartTimeList[0]) * 60 * 60 + parseInt(pStartTimeList[1]) * 60 + parseInt(pStartTimeList[2]);
						let pStopTimeNumber: number = parseInt(pStopTimeList[0]) * 60 * 60 + parseInt(pStopTimeList[1]) * 60 + parseInt(pStopTimeList[2]);
					

						console.log(pStartList[5].localeCompare('pm'))
						console.log(pStopList[5].localeCompare('pm'))

						if(pStartList[5].localeCompare('pm') == 0){
							pStartTimeNumber = pStopTimeNumber + 12 * 60 * 60;
						}
					
						if(pStopList[5] == 'pm'){
							pStopTimeNumber = pStopTimeNumber + 12 * 60 * 60;
						}

						console.log('pstarttimenumber ', pStartTimeNumber)
						console.log('pstoptimenumber', pStopTimeNumber)

						if(pStartTimeNumber > stopTimeNumber || pStopTimeNumber < startTimeNumber){
							passengers.remove(passengers[i]);
							i--;
						}
					}

					var returnRes: string[][] = [[], [], [], [], [], [], [], [], []];
					var startIndex: number = 0;
					var stopIndex: number = 0;

					for(let i = 0; i < passengers.length; i++){
						for(let j = 0; j < busRoute.length; j++){
							if(busRoute[j] == passengers[i].startLoc){
								startIndex = j;
								break;
							}
						}
						for(let j = 0; j < busRoute.length; j++){
							if(busRoute[j] == passengers[i].stopLoc){
								stopIndex = j;
								break;
							}
						}
						if(stopIndex < startIndex){
							stopIndex += 9;
						}
						for(let j = startIndex; j <= stopIndex; j++){
							returnRes[j%9].push(passengers[i].commuterName)
						}
					}
					res.send(returnRes);
				}
			}).then(data=>data).catch(err=>err);
		}
	})
	// var index = commuterList.indexOf(data.commuterName);
  	// commuterList.splice(index, 1);
	// socket.emit('COMMUTER_COUNT_UPDATE', {data: commuterList})
	  
}