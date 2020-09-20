import express, { Request, Response } from "express";
import cors from "cors";
import * as bodyParser from 'body-parser';
import * as BusController from './controllers/BusController';
import * as CommuterController from './controllers/CommuterController';
import * as TripController from './controllers/TripController';

const app = express();

//Endpoints for Commuter
app.get('/allcommuter', CommuterController.allCommuters);
app.get('/commuter/:id', CommuterController.getCommuter);
app.put('/commuter', CommuterController.addCommuter);
app.delete('/commuter/:id', CommuterController.deleteCommuter);
app.post('/commuter/:id', CommuterController.updateCommuter);

//Endpoints for Bus
app.get('/allbus', BusController.allBus);
app.get('/bus/:id', BusController.getBus);
app.put('/bus', BusController.addBus);
app.delete('/bus/:id', BusController.deleteBus);
app.post('/bus/:id', BusController.updateBus);

//Endpoints for Trip
app.get('/alltrip', TripController.allTrip);
app.get('/trip/:id', TripController.getTrip);
app.put('/trip', TripController.addTrip);
app.delete('/trip/:id', TripController.deleteTrip);
app.post('/trip/:id', TripController.updateTrip);

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello World12345!");
});

app.listen(8000, () => {
  console.log("Server Started at Port, 8000");
});
