
let HomeController = require('./../controllers/HomeController');
let ResultatController = require('./../controllers/ResultatController');
let EcurieController = require('./../controllers/EcurieController');
let PiloteController = require('./../controllers/PiloteController');
let CircuitController = require('./../controllers/CircuitController');


// Routes
module.exports = function(app){

// Main Routes
    app.get('/', HomeController.Index);

    app.get('/pilote', PiloteController.IndexAdminPilote);


// tout le reste
  app.get('*', HomeController.Index);
  app.post('*', HomeController.Index);

};
