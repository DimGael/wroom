let model = require('../models/pilote.js');
let async = require('async');
// ///////////////////////// R E P E R T O I R E    D E S    P I L O T E S

module.exports.Repertoire = function(request, response){
   response.title = 'Répertoire des pilotes';
   model.getLettresPilotes( function (err, result) {
       if (err) {
           // gestion de l'erreur
           console.log(err);
           return;
       }
   response.listeLettres = result;
   response.render('repertoirePilotes', response);
 });
}

module.exports.ListePiloteLettre = function(request, response){
  //Récupération de la lettre en paramètre
  let lettre = request.params.lettre;
   response.title = 'Répertoire des pilotes : récupération des lettres';
   async.parallel([
     function(callback){
       model.getProfilPilote(lettre, function (err, result) {callback(null,result)});
     },

     function(callback){
       model.getLettresPilotes( function (err, result) {callback(null,result)});
     }

   ],

     function(err,result){
       if (err){
         console.log(err);
         return;
       }

  response.listeLettres = result[1];
  response.listePilote = result[0];
  response.render('repertoirePilotes', response);

  });
}

module.exports.InformationPilotes = function(request, response){
  //Récupération du nom en paramètre
  let nom = request.params.nom;
  response.title = 'Répertoire des pilotes : recherche d information sur un pilote';

  async.parallel([
    function(callback){
      model.getLettresPilotes( function (err, result) {callback(null,result)});
    },

    function(callback){
      model.getListeImagesPilotes(nom, function (err, result) {callback(null,result)});
    },

    function(callback){
      model.getInformationPilotes(nom, function(err,result){callback(null,result)});
    },

    function(callback){
      model.getSponsorPilotes(nom, function(err,result){callback(null,result)});
    },

    function(callback){
      model.getEcuriePilotes(nom,function(err,result){callback(null,result)});
    }
  ],

    function(err,result){
      if (err){
        console.log(err);
        return;
      }
      response.listeLettres = result[0];

      response.listeImagesPilotes = result[1];

      response.informationPilotes = result[2];

      response.sponsorPilotes = result[3];

      response.ecuriePilotes = result[4];

      response.render('detailPilote', response);
    }
  );

}
