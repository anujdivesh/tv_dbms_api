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
require('./app/routes/bounding_box.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const Role = db.role;
const Country = db.country;
const User = db.user;
const BoundingBox = db.bounding_box;
const Contact = db.contact;
const data_type = db.data_type;
const keyword = db.keyword;
const project = db.project;
const publisher = db.publisher;
const topic = db.topic;


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
    long_name: "Tuvalu",
    west_bound_longitude: "176.7",
    east_bound_longitude: "180.0",
    south_bound_latitude:"-12.7",
    north_bound_latitude: "-5.4",
    crs:"EPSG:4326"
  });
  BoundingBox.create({
    name: "Vaitupu",
    west_bound_longitude: "178.657179",
    east_bound_longitude: "178.703629",
    south_bound_latitude:"-7.5049558",
    north_bound_latitude: "-7.4517058",
    crs:"EPSG:4326"
  });
  BoundingBox.create({
    name: "Nukulaelae",
    west_bound_longitude: "179.794028",
    east_bound_longitude: "179.877978",
    south_bound_latitude:"-9.44151925",
    north_bound_latitude: "-9.34026925",
    crs:"EPSG:4326"
  });
  BoundingBox.create({
    name: "Nukufetau",
    west_bound_longitude: "178.30143600000002",
    east_bound_longitude: "178.439636",
    south_bound_latitude:"-8.07930722",
    north_bound_latitude: "-7.92595722",
    crs:"EPSG:4326"
  });
  BoundingBox.create({
    name: "Nui",
    west_bound_longitude: "177.133902",
    east_bound_longitude: "177.171902",
    south_bound_latitude:"-7.26071275",
    north_bound_latitude: "-7.18126275",
    crs:"EPSG:4326"
  });
  BoundingBox.create({
    name: "Niutao",
    west_bound_longitude: "177.32527199999998,",
    east_bound_longitude: "177.359022",
    south_bound_latitude:"-6.11994835",
    north_bound_latitude: "-6.09734835",
    crs:"EPSG:4326"
  });
  BoundingBox.create({
    name: "Niulakita",
    west_bound_longitude: "179.44626100000002",
    east_bound_longitude: "179.499661",
    south_bound_latitude:"-10.8132493",
    north_bound_latitude: "-10.7647493",
    crs:"EPSG:4326"
  });
  BoundingBox.create({
    name: "Nanumea",
    west_bound_longitude: "176.05230600000002",
    east_bound_longitude: "176.144355999977",
    south_bound_latitude:"-5.70847427",
    north_bound_latitude: "-5.635624270000171",
    crs:"EPSG:4326"
  });
  BoundingBox.create({
    name: "Nanumaga",
    west_bound_longitude: "176.30535600000002",
    east_bound_longitude: "176.33400599999297",
    south_bound_latitude:"-6.30874506",
    north_bound_latitude: "-6.2661450600001",
    crs:"EPSG:4326"
  });
  BoundingBox.create({
    name: "Funafuti",
    west_bound_longitude: "179.014025",
    east_bound_longitude: "179.209125",
    south_bound_latitude:"-8.64960458",
    north_bound_latitude: "-8.41945458",
    crs:"EPSG:4326"
  });
  Contact.create({
    first_name: "Divesh",
    last_name: "Anuj",
    position:"Senior Systems Developer",
    email: "divesha@spc.int"
  })
  data_type.create({
    datatype_code: "raster",
    datatype_name:"raster"
  })
  data_type.create({
    datatype_code: "vector",
    datatype_name:"vector"
  })
  keyword.create({
    name:"Ocean"
  })
  keyword.create({
    name:"UAV"
  })
  keyword.create({
    name:"Lidar"
  })
  project.create({
    project_code: "TCAP",
    project_name:"Tuvalu Coastal Adaptation Project"
  })
  publisher.create({
    name:"Tuvalu Meteorological Service",
    website:"https://tuvmet.tv/"
  })
  topic.create({
    name:"Ocean Science"
  })
 
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