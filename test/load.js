const {appServer, http} = require("fornetserve");

const apps = appServer();

const default_host = '0.0.0.0';
const default_port = 4040;

apps.get("/", async (req, res) => {

    res.status(200);

    res.content(JSON.stringify({"Yahooo":"asd"}));

});

const connect =http(apps, {"host": default_host,
    "port": default_port});

connect.then(() => {

    console.log("running");

}).catch( (err)=>{

    console.log(err);

})