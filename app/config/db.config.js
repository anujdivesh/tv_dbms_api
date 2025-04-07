
module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "Oceanportal2017*",
  //PASSWORD: "Passworld02",
  DB: "tv_dbms",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

//////////FOR PROD
/*
module.exports = {
  HOST: "postgres",
  USER: "postgres",
  PASSWORD: "Oceanportal2017*",
  DB: "tv_dbms",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};*/