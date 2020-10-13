import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import cors = require('cors');
import * as bodyParser from 'body-parser';
import * as AdminController from './controllers/AdminController';
import * as BusController from './controllers/BusController';
import * as CommuterController from './controllers/CommuterController';
import * as TripController from './controllers/TripController';


const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
let PORT = process.env.PORT || 8000;
app.use(cors());
app.use(bodyParser.json());

const MONGODB_URL ='mongodb+srv://admin:admin@buschecker.rl9ai.mongodb.net/buschecker?retryWrites=true&w=majority'
mongoose.connect(MONGODB_URL, 
  { useNewUrlParser: true,
    useUnifiedTopology:true 
  }, () => {
  console.log('connected to DB')
})

io.on('connection', (socket: any) => {
  console.log('a user connected');
  socket.on('message', (message: any) => {
    console.log('received', message)
  })
});

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
app.get('/trips', TripController.allTrip);
app.get('/trip/:id', TripController.getTrip);
app.put('/trip', TripController.updateTrip);
app.delete('/trip/:id', TripController.deleteTrip);
app.post('/trip', TripController.addTrip);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello World12345!");
});

app.listen(PORT, () => {
  console.log("Server Started at Port, " + PORT);
});
