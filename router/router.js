
let HomeController = require('./../controllers/HomeController');
let ResultatController = require('./../controllers/ResultatController');
let EcurieController = require('./../controllers/EcurieController');
let PiloteController = require('./../controllers/PiloteController');
let CircuitController = require('./../controllers/CircuitController');

// Routes
module.exports = function(app){

// Main Routes
    app.get('/', HomeController.Index);

// pilotes
    app.get('/repertoirePilote', PiloteController.Repertoire);
    //Pour récuperer la variable en GET
    app.get('/repertoirePilote/:lettre', PiloteController.ListePiloteLettre);

    // On récupère les informations d'un pilote
    app.get('/detailPilote/:nom', PiloteController.InformationPilotes);

 // circuits
   app.get('/circuits', CircuitController.ListerCircuit);

// Ecuries
   app.get('/ecuries', EcurieController.ListerEcurie);

 //Résultats
   app.get('/resultats', ResultatController.ListerResultat);


// tout le reste
  app.get('*', HomeController.Index);
  app.post('*', HomeController.Index);

};
