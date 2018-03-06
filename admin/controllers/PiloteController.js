let model = require('../../models/pilote.js');

// ///////////////////////// R E P E R T O I R E    D E S    P I L O T E S



module.exports.IndexAdminPilote = function(request, response){
    //Récupération du nom en paramètre
    let nom = request.params.nom;
    response.title = 'Pilotes';
    response.connecte = request.session.connecte
    response.render('pilotes', response)
}
