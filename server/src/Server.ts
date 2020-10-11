import express, { Request, Response } from "express";
import cors from "cors";
import * as bodyParser from 'body-parser';
import * as AdminController from './controllers/AdminController';
import * as BusController from './controllers/BusController';
import * as CommuterController from './controllers/CommuterController';
import * as TripController from './controllers/TripController';

const app = express();

//Endpoints for Admin
app.get('/alladmin', AdminController.allAdmin);
app.get('/admin/:id', AdminController.getAdmin);
app.put('/admin/:id', AdminController.updateAdmin);
app.delete('/admin/:id', AdminController.deleteAdmin);
app.post('/admin', AdminController.addAdmin);

//Endpoints for Bus
app.get('/allbus', BusController.allBus);
app.get('/bus/:id', BusController.getBus);
app.put('/bus/:id', BusController.updateBus);
app.delete('/bus/:id', BusController.deleteBus);
app.post('/bus', BusController.addBus);

//Endpoints for Commuter
app.get('/allcommuter', CommuterController.allCommuters);
app.get('/commuter/:id', CommuterController.getCommuter);
app.put('/commuter/:id', CommuterController.updateCommuter);
app.delete('/commuter/:id', CommuterController.deleteCommuter);
app.post('/commuter', CommuterController.addCommuter);

//Endpoints for Trip
app.get('/alltrip', TripController.allTrip);
app.get('/trip/:id', TripController.getTrip);
app.put('/trip/:id', TripController.updateTrip);
app.delete('/trip/:id', TripController.deleteTrip);
app.post('/trip', TripController.addTrip);

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello World12345!");
});

app.listen(8000, () => {
  console.log("Server Started at Port, 8000");
});
