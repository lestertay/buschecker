import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import cors = require('cors');
const path = require('path');
import * as bodyParser from 'body-parser';
import * as AdminController from './controllers/AdminController';
import * as BusController from './controllers/BusController';
import * as CommuterController from './controllers/CommuterController';
import * as TripController from './controllers/TripController';

const app = express();
app.use(cors({
  origin: '*',
  credentials: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const http = require('http').createServer(app);
export const io = require('socket.io')(http);

let PORT = process.env.PORT || 8000;


const MONGODB_URL ='mongodb+srv://admin:admin@buschecker.rl9ai.mongodb.net/buschecker?retryWrites=true&w=majority'
mongoose.connect(MONGODB_URL, 
  { useNewUrlParser: true,
    useUnifiedTopology:true 
  }, () => {
  console.log('connected to DB')
})

io.on('connection', (socket: any) => {
  console.log('a user connected');
  
    TripController.initialSync(socket)

  socket.on('FETCH_TRIPS', () => {
    TripController.allTrip(socket);
  })

  socket.on('NEW_COMMUTER', (message: any) => {
    TripController.addTrip(io.sockets, message.data)
    
  })
  socket.on('CONTACT_TRACE', (message: any) => {
    TripController.findCovidFucker(io.sockets, message.data)
    
  })

  socket.on('EXIT_COMMUTER', (message: any) => {
    console.log('received', message.data)
    TripController.updateTrip(io.sockets, message.data)
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
app.get('/findCovid', TripController.findCovidFucker);
app.get('/', (req: Request, res: Response) => {
  res.send('hello')
})

io.listen(PORT, () => {
  console.log("Server Started at Port, " + PORT);
});
// io.listen(PORT, () => {
//   console.log("Server Started at Port, " + PORT);
// });
