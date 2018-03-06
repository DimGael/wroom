
let ConnexionController = require('./../controllers/ConnexionController');
let PiloteController = require('./../controllers/PiloteController');


// Routes
module.exports = function(app){

// Main Routes
    //La route principale mène à la connexion au site, si la personne est connectée, n'affiche rien
    app.get('/', ConnexionController.Index);
    app.post('/connexion', ConnexionController.Connexion);

    app.get('/pilotes', PiloteController.IndexAdminPilote);

  //  app.get('/ajouterPilote', PiloteController.AjouterPilote);
    //app.post('/ajouterPilote/pilote', PiloteController.ValiderAjouterPilote);

// tout le reste
  app.get('*', ConnexionController.Index);
  app.post('*', ConnexionController.Index);

};
