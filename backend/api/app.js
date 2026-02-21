const express = require('express');
const mongoose = require('mongoose');


const meetingReservationRoutes = require('./routes/meetingReservationRoutes');
const meetingRoomRoutes = require('./routes/meetingRoomRoutes');
const meetingUserRoutes = require('./routes/meetingUserRoutes');
const meetingDeskRoutes = require('./routes/meetingDeskRoutes');
const meetingDeskReservationRoutes = require('./routes/meetingDeskReservationRoutes');
const meetingNotificationRoutes = require('./routes/meetingNotificationRoutes');




const app = express();
const PORT = 3000;


app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB bağlantısı başarılı"))
    .catch(err => {
        console.error("MongoDB bağlantı hatası:", err);
        process.exit(1);
    });

// mpApp
app.use('/mp/user',meetingUserRoutes);
app.use('/mp/reservation',meetingReservationRoutes);
app.use('/mp/room',meetingRoomRoutes);
app.use('/mp/desk',meetingDeskRoutes);
app.use('/mp/deskreservation',meetingDeskReservationRoutes);
app.use('/mp/notification',meetingNotificationRoutes);

app.get('/', (req, res) => {
    res.send('Selam!');
});

app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda çalışıyor`);
});
