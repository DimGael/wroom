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
