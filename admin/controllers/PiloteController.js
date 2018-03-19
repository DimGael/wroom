let model = require('../../models/pilote.js');
let async=require('async');
// ///////////////////////// R E P E R T O I R E    D E S    P I L O T E S



module.exports.IndexAdminPilote = function(request, response){
    response.title = 'Pilotes';


    model.getPilotes(function (err, result) {
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
      response.listePilote = result;
      response.render('pilotes', response);
    });

}

module.exports.AjouterPilote = function(request, response){

    response.title = 'ajouter des pilotes';

    async.parallel([
      function(callback){
        model.getNationalite( function (err, result) {callback(null,result)});
      },

      function(callback){
        model.getEcurie(function (err, result) {callback(null,result)});
      }

    ],

      function(err,result){
        if (err){
          console.log(err);
          return;
        }
        response.nationalitePilote = result[0];

        response.ecuriePilote = result[1];



        response.render('ajouterPilote', response);
      }
    );

}

module.exports.InsertionPilote = function(request, response){

  model.ajouterPilote(request.body,function (err, result) {
    if (err) {
        // gestion de l'erreur
        console.log(err);
        return;
    }
    response.title = 'insertion effectuée';
    response.nomPage=" Ajout du pilote éffectuée"
    response.render('insertionOK', response);
  });

}

module.exports.ModifierPilote = function(request, response){
  let nom = request.params.nom;
  response.title = 'modification du pilote '+nom;

  async.parallel([
    function(callback){
      model.getNationalite( function (err, result) {callback(null,result)});
    },

    function(callback){
      model.getEcurie(function (err, result) {callback(null,result)});
    },
    function(callback){
      model.piloteAModifier(nom,function(err,result){callback(null,result)})
    }

  ],

    function(err,result){
      if (err){
        console.log(err);
        return;
      }
      response.nationalitePilote = result[0];

      response.ecuriePilote = result[1];

      response.infoPilote = result[2];

      response.render('modifierPilote', response);
    }
  );

}

module.exports.ModificationPilote = function(request, response){

  model.modifierPilote(request.body,function (err, result) {
    if (err) {
        // gestion de l'erreur
        console.log(err);
        return;
    }
    response.title = 'insertion effectuée';
    response.nomPage = " Modification du pilote "+nom+" éffectuée"
    response.render('insertionOK', response);
  });

}
