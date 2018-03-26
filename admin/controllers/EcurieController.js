let model = require('../../models/ecurie.js');
let pilote = require('../../models/pilote.js');
let async=require('async');


module.exports.AfficherEcurie = function(request, response){
  response.title = "Gestion des ecuries"

//Utiliser une méthode qui renvoie TOUT les circuits
  model.getListeEcurie(function (err, result) {
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
        response.listeEcurie = result;
        console.log(response.listeEcurie);
        response.render('ecuries', response)
    })
}

module.exports.AjouterEcurie = function(request, response){
  response.title = "Ajout d'une ecurie"

//Utiliser une méthode qui renvoie TOUT les circuits
  pilote.getNationalite(function (err, result) {
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
        response.listeNationalite = result;
        response.render('ajouterEcurie', response)
    })
}


module.exports.InsertionEcurie = function(request, response){

  model.ajouterEcurie(request.body,function (err, result) {
    if (err) {
        // gestion de l'erreur
        console.log(err);
        return;
    }
    response.title = 'insertion effectuée';
    response.nomPage=" Ajout de l'écurie éffectuée"
    response.render('insertionOK', response);
  });

}
