
let ConnexionController = require('./../controllers/ConnexionController');
let PiloteController = require('./../controllers/PiloteController');
let CircuitController = require('./../controllers/CircuitController');
let EcurieController = require('./../controllers/EcurieController');

// Routes
module.exports = function(app){

// Main Routes
    //La route principale mène à la connexion au site, si la personne est connectée, n'affiche rien
    app.get('/', ConnexionController.Index);
    app.post('/connexion', ConnexionController.Connexion);

    app.get('/pilotes', PiloteController.IndexAdminPilote);

    app.get('/pilotes/ajouterPilote', PiloteController.AjouterPilote);
    app.post('/pilotes/ajouterPilote/insertionOK', PiloteController.InsertionPilote);
    app.get('/pilotes/modifierPilote/:nom', PiloteController.ModifierPilote);
    app.post('/pilotes/modifierPilote/modificationOK/:num', PiloteController.ModificationPilote);

    app.get('/circuits', CircuitController.GestionCircuits);
    app.get('/circuits/ajouterCircuit', CircuitController.AjouterCircuit);
    app.post('/circuits/ajoutCircuit', CircuitController.AjoutCircuit);
    app.get('/circuits/modifierCircuit/:nom', CircuitController.ModifierCircuit);
    app.post('/circuits/modificationCircuit/:id', CircuitController.ModificationCircuit);
    app.get('/circuits/supprimerCircuit/:nom', CircuitController.SupprimerCircuit);

    app.get('/ecuries',EcurieController.AfficherEcurie);
    app.get('/ecuries/ajouterEcurie', EcurieController.AjouterEcurie);
    app.post('/ecuries/ajouterEcurie/insertionOK', EcurieController.InsertionEcurie);



  //  app.get('/ajouterPilote', PiloteController.AjouterPilote);
    //app.post('/ajouterPilote/pilote', PiloteController.ValiderAjouterPilote);

// tout le reste
  app.get('*', ConnexionController.Index);
  app.post('*', ConnexionController.Index);

};
