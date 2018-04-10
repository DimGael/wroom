let model = require('../../models/ecurie.js');
let pilote = require('../../models/pilote.js');
let async=require('async');


module.exports.AfficherEcurie = function(request, response){
  response.title = "Gestion des ecuries"

//Utiliser une méthode qui renvoie toutes les ecuries
  model.getListeEcurie(function (err, result) {
      if (err) {
          console.log(err);
          return;
      }
        response.listeEcurie = result;
        //console.log(response.listeEcurie);
        response.render('ecuries', response)
    })
}

//  permet de lister les informations pour modifier une écurie
module.exports.AjouterEcurie = function(request, response){
  response.title = "Ajout d'une ecurie"


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

// permet d'ajouter une écurie dans la BD
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

// permet d'obtenir les infos necessaires pour modifier une écurie
module.exports.ModifierEcurie = function(request, response){
  let nom = request.params.nom;
  response.title = 'modification de l ecurie '+nom;

  async.parallel([
    function(callback){
      pilote.getNationalite( function (err, result) {callback(null,result)});
    },

    function(callback){
      model.ecurieAModifier(nom,function(err,result){callback(null,result)})
    }

  ],

    function(err,result){
      if (err){
        console.log(err);
        return;
      }
      response.nationaliteEcurie = result[0];


      response.infoEcurie = result[1];

      response.render('modifierEcurie', response);
    }
  );

}

// permet de modifier une écurie dans la BD
module.exports.ModificationEcurie = function(request, response){
  let num = request.params.num;
  model.modifierEcurie(request.body,num,function (err, result) {
    if (err) {
      // gestion de l'erreur
      console.log(err);
      return;
    }
    response.title = 'insertion effectuée';
    response.nomPage = " Modification de l'écurie éffectuée"
    response.render("modificationOK", response);
  });

}




module.exports.SupprimerEcurie = function(request, response){
  let num = request.params.num;

  async.parallel([
    function(callback){
      model.supprimerFinance(num, function (err, result) {callback(null,result)});
    },

    function(callback){
      model.supprimerPilote(num,function(err,result){callback(null,result)});
    },

    function(callback){
      model.supprimerVoiture(num,function(err,result){callback(null,result)});
    },

    function(callback){
      model.supprimerEcurie(num,function(err,result){callback(null,result)});
    },

  ],

    function(err,result){
      if (err){
        console.log(err);
        return;
      }

    response.title = 'Suppression effectuée';
    response.nomPage = " Suppression de l'écurie éffectuée"
    response.render("suppressionOK", response);
  });
}
