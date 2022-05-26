const express = require("express");
var cors = require('cors')
const path = require('path');

const emailRoutes = require("./routes/emailRoute");


const app = express();

app.use(cors())
app.use(express.json());


// user routes
app.use("/api/", emailRoutes);

app.use(express.static(path.join('./build')));

app.get('/*', (req, res) => {
  res.sendFile(path.resolve('./build/', 'index.html'));
});

app.listen(process.env.PORT || 5000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
  
