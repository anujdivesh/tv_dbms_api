var compression = require('compression');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var http = require('http');
var https = require('https');

const bcrypt = require("bcryptjs");

http.globalAgent.maxSockets = Infinity;
https.globalAgent.maxSockets = Infinity;
const app = express();
app.use(compression());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public', { maxAge: 31557600 }));
app.use(express.json({ limit: '2000mb'}));

app.use(cors());
app.use(express.urlencoded({ limit: '2000mb',extended: true }));


// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");

// Disable Sequelize logging
//db.sequelize.options.logging = false;

// db.sequelize.sync();
// force: true will drop the table if it already exists
/*db.sequelize.sync({force:true}).then(() => {
  console.log('Drop and Resync Database with { force: true }');
  initial();
});
*/

//prod
db.sequelize.sync();

// simple route
app.get("/ocean_api", (req, res) => {
  res.json({ message: "Tuvalu Data Management System secured with JWT, OpenAPI 1.0 " });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/country.routes')(app);
require('./app/routes/data_type.routes')(app);
require('./app/routes/project.routes')(app);
require('./app/routes/contact.routes')(app);
require('./app/routes/publisher.routes')(app);
require('./app/routes/keyword.routes')(app);
require('./app/routes/topic.routes')(app);
require('./app/routes/metadata.routes')(app);
require('./app/routes/dataset.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const Role = db.role;
const Country = db.country;
const User = db.user;

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "admineyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJlbWFpbCI6Im"
  });
 
  Role.create({
    id: 3,
    name: "registered"
  });
  Country.create({
    short_name:"TV",
    long_name: "Tuvalu"
  });
  /*User.create({
    first_name: "Divesh",
    last_name : "Anuj",
    email: "divesha@spc.int",
    password: "123456",
    country_id:"TV",
    roles:"admineyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJlbWFpbCI6Im"
})*/
}
/*
//FOR TESTING PURPOSES
const Country = db.country;
const Role = db.role;
const Organization = db.organization;
const User = db.user;
const Dataset = db.dataset;
const Task = db.task;
const Log = db.log;


function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "admineyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJlbWFpbCI6Im"
  });
 
  Role.create({
    id: 3,
    name: "registered"
  });
  Country.create({
    short_name:"FJ",
    long_name: "Fiji Islands",
    west_bound_longitude:"179.19377210107413",
    east_bound_longitude:"179.1978081648181",
    south_bound_latitude:"-8.522978429308308",
    north_bound_latitude:"-8.51696092405461",
    crs:"EPSG:4326"
  });
  Organization.create({
    short_name:"SPC",
    long_name: "Pacific Community",
    website:"https://www.spc.int/"
  });
  Dataset.create({
    short_name: "WaveWatch3",
    long_name:"AUSWAVE Global Ocean Waves Forecast",
    type:"outlook",
    data_provider:"Australian Bureau of Meteorology",
    data_source_url:"http://opendap.bom.gov.au:8080/thredds/catalog/nmoc/ww3_global_fc/catalog.html",
    data_download_url:"http://opendap.bom.gov.au:8080/thredds/fileServer/nmoc/ww3_global_fc/{download_file_name}",
    login_credentials_required: false,
    username:"",
    password:"",
    API_key:"",
    download_method:"opendap",
    download_file_prefix:"ww3_",
    download_file_infix:"%Y%m%d_%H",
    download_file_suffix:".R.nc",
    download_file_type:"netCDF",
    download_to_local_dir: true,
    local_directory_path:"/home/pop/ocean_portal/datasets/model/regional/ww3forecast/forecast",
    scp: false,
    scp_server_path:"",
    frequency_type:"hourly",
    frequency_hours:6,
    frequency_months:0,
    frequency_years:0,
    check_every_type: "minutes",
    check_minutes: 30,
    check_months:0,
    check_years:0,
    has_variables:true,
    variables: "sig_wave",
    subset:true,
    xmin_xmax:"-45,45",
    ymin_ymax: "100,300",
    create_latest: false
  });
  
  Task.create({
    task_name:"Download WW3 Datasets",
    class_id:"data_download",
    dataset_id:1,
    status:"Ready",
    priority:"Medium",
    duration:"Indefinitely",
    task_start_time:"2024-06-05 00:00:00",
    next_run_time:"2024-06-02T00:00:00.000Z",
    last_run_time:"2024-06-02T00:00:00.000Z",
    next_download_file: '',
    last_download_file: '',
    enabled:true,
    health:'Excellent',
    fail_count:0,
    success_count:0,
    reset_count: 0,
    attempt_count:0,
    created_by:'root',
    launched_by:'root',
    retain: false,
  });
  
  Log.create({
    task_class:"data_download",
    task_class_id:1,
    status:"success",
    details:"success"
  })
}

*/