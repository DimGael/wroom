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
