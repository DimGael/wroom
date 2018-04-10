let model = require('../../models/resultat.js');
//let pilote = require('../../models/pilote.js');
let async=require('async');


module.exports.AfficherGPResultat = function(request, response){
  response.title = "Gestion des resultats"

//Utiliser une méthode qui renvoie toutes les ecuries
  model.getListeResultats(function (err, result) {
      if (err) {
          console.log(err);
          return;
      }
        response.listeGP = result;
        //console.log(response.listeGP);
        response.render('resultats', response)
    })
}
