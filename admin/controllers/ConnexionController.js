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

    response.connecte = true;

    let mdp = request.body.mdp;
    let login = request.body.login;

    async.parallel([
      function(callback){
        model.verifierConnexion(login, mdp, function(err, result) {callback(null, result)})
      }
    ], function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.listeLogin = result[0];

        response.render('connexionEnCours', response);
    })

};