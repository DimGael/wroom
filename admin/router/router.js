
let ConnexionController = require('./../controllers/ConnexionController');
let PiloteController = require('./../controllers/PiloteController');
let CircuitController = require('./../controllers/CircuitController');
let EcurieController = require('./../controllers/EcurieController');
let ResultatController = require('./../controllers/ResultatController');
let SponsorController = require('./../controllers/SponsorController');
// Routes
module.exports = function(app){

// Main Routes
    //La route principale mène à la connexion au site, si la personne est connectée, n'affiche rien
    app.get('/', ConnexionController.Index);
    app.post('/connexion', ConnexionController.Connexion);
    app.get('/deconnexion', ConnexionController.Deconnexion);
    app.get('/pilotes', PiloteController.IndexAdminPilote);

    app.get('/pilotes/ajouterPilote', PiloteController.AjouterPilote);
    app.post('/pilotes/ajouterPilote/insertionOK', PiloteController.InsertionPilote);
    app.get('/pilotes/modifierPilote/:nom', PiloteController.ModifierPilote);
    app.post('/pilotes/modifierPilote/modificationOK/:num', PiloteController.ModificationPilote);
    app.get('/pilotes/supprimerPilote/:num', PiloteController.SupprimerPilote);

    app.get('/circuits', CircuitController.GestionCircuits);
    app.get('/circuits/ajouterCircuit', CircuitController.AjouterCircuit);
    app.post('/circuits/ajoutCircuit', CircuitController.AjoutCircuit);
    app.get('/circuits/modifierCircuit/:nom', CircuitController.ModifierCircuit);
    app.post('/circuits/modificationCircuit/:id', CircuitController.ModificationCircuit);
    app.get('/circuits/supprimerCircuit/:num', CircuitController.SupprimerCircuit);

    app.get('/ecuries',EcurieController.AfficherEcurie);
    app.get('/ecuries/ajouterEcurie', EcurieController.AjouterEcurie);
    app.post('/ecuries/ajouterEcurie/insertionOK', EcurieController.InsertionEcurie);
    app.get('/ecuries/modifierEcurie/:nom', EcurieController.ModifierEcurie);
    app.post('/ecuries/modifierEcurie/modificationOK/:num', EcurieController.ModificationEcurie);
    app.get('/ecuries/supprimerEcurie/:num', EcurieController.SupprimerEcurie);


    app.get('/resultats', ResultatController.AfficherGPResultat);




    app.get('/sponsors',SponsorController.AfficherSponsor);
    app.get('/sponsors/ajouterSponsor',SponsorController.AjouterSponsor);
    app.post('/sponsors/ajouterSponsor/insertionOK', SponsorController.InsertionSponsor);
    app.get('/sponsors/modifierSponsor/:nom', SponsorController.ModifierSponsor);
    app.post('/sponsors/modifierSponsor/modificationOK/:num', SponsorController.ModificationSponsor);
    app.get('/sponsors/supprimerSponsor/:num', SponsorController.SupprimerSponsor);
// tout le reste
  app.get('*', ConnexionController.Index);
  app.post('*', ConnexionController.Index);

};
