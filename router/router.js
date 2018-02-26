
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

// On récupère les informations d'un circuit
   app.get('/circuits/:circuit', CircuitController.InformationCircuits);

// Ecuries
   app.get('/ecuries', EcurieController.ListerEcurie);

// On récupère les informations d'une écurie

  app.get('/ecuries/:ecurie', EcurieController.InformationEcuries);

 //Résultats
   app.get('/resultats', ResultatController.ListerResultat);

// Détails des resultats
   app.get('/resultats/:gp', ResultatController.InformationResultats);


// tout le reste
  app.get('*', HomeController.Index);
  app.post('*', HomeController.Index);

};
