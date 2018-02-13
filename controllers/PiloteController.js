let model = require('../models/pilote.js');

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
   response.title = 'Répertoire des pilotes';
   model.getLettresPilotes( function (err, result) {
       if (err) {
           // gestion de l'erreur
           console.log(err);
           return;
       }
    response.lettre = lettre;
  });

  model.getProfilPilote(lettre, function(err,result){
    if (err){
      console.log(err);
      return;
    }
    response.listePilote = result;
  })

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
