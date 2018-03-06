let model = require('../../models/login.js');
let async = require('async');
let crypto = require('crypto');

  // ////////////////////////////////////////////// A C C U E I L
module.exports.Index = function(request, response){
    response.title = "Admin Connexion";
    response.connecte = request.session.connecte;
    response.dans_home = true;
    response.render('connexion', response);
};


module.exports.Connexion = function(request, response){
    response.title = "Connexion en cours";

    //Pour que le contenu de la page s'affiche même lorsque l'on est pas connecté.
    response.connecte = true;

    let mdp = request.body.mdp;
    let login = request.body.login;

    let mdpCrypte = crypto.createHash('sha1')
        .update(mdp)
        .digest('hex');

    async.parallel([
      function(callback){
        model.verifierConnexion(login, mdpCrypte, function(err, result) {callback(null, result)})
      }
    ], function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.listeLogin = result[0];
        if(result[0] !== null){
          console.log("Vous êtes connecté")
          request.session.connecte = true;
        }
        else{
        request.session.connecte = false;
      }

        response.mdp = mdp;

        response.render('connexionEnCours', response);
    })

};
