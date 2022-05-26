const express = require("express");
var cors = require('cors')
const path = require('path');

const emailRoutes = require("./routes/emailRoute");


const app = express();

app.use(cors())
app.use(express.json());


// user routes
app.use("/api/email", emailRoutes);

app.use(express.static(path.join('./build')));

app.get('/*', (req, res) => {
  res.sendFile(path.resolve('./build/', 'index.html'));
});

app.listen(5000, () => {
    console.log(`Server is listening on port ${5000}`);
  });
  
