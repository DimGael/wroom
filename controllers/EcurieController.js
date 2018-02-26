let model = require('../models/ecurie.js');

   // //////////////////////// L I S T E R  E C U R I E S
   //ListerEcurie est le nom de la fonction
module.exports.ListerEcurie = function(request, response){
   response.title = 'Liste des écuries';
    model.getListeEcurie( function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        //listeEcurie est une variable pour listerEcurie.handlebars
        response.listeEcurie = result;
        response.render('listerEcurie', response);
});
}

module.exports.InformationEcuries=function(request, response){
  let ecurie = request.params.ecurie;
  response.title = 'Liste des écuries : détail d une écurie';

  async.parallel([
    function(callback){
      model.getListeEcurie(function (err, result) {callback(null,result)});
    },

    function(callback){
      model.getInformationEcuries(ecurie,function (err, result) {callback(null,result)});
    }
  ],

    function(err,result){
      if (err){
        console.log(err);
        return;
      }
      response.getListeEcurie = result[0];

      response.getInformationEcuries = result[1];

      response.render('listerEcurie', response);
    }
  );
