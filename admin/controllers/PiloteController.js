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


module.exports.IndexAdminPilote = function(request, response){
    //Récupération du nom en paramètre
    let nom = request.params.nom;
    response.title = 'indexAdminPilote';
    response.connecte = request.session.connecte
    response.render('piloteAdmin', response)
}

module.exports.ListePiloteLettre = function(request, response){
  //Récupération de la lettre en paramètre
  let lettre = request.params.lettre;
   response.title = 'Répertoire des pilotes : récupération des lettres';


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

module.exports.InformationPilotes = function(request, response){
  //Récupération du nom en paramètre
  let nom = request.params.nom;
  response.title = 'Répertoire des pilotes : recherche d information sur un pilote';


  model.getLettresPilotes( function (err, result) {
     if (err) {
         // gestion de l'erreur
         console.log(err);
         return;
     }
  response.listeLettres = result;
  });

  model.getListeImagesPilotes(nom, function (err, result) {
    if (err) {
        // gestion de l'erreur
        console.log(err);
        return;
    }
    response.listeImagesPilotes = result;
    });

    model.getInformationPilotes(nom, function(err,result){
      if (err){
        console.log(err);
        return;
      }
      response.informationPilotes = result;

    });

    model.getSponsorPilotes(nom, function(err,result){
      if (err){
        console.log(err);
        return;
      }
      response.sponsorPilotes = result;
    });

    model.getEcuriePilotes(nom,function(err,result){
      if (err){
        console.log(err);
        return;
      }
      response.ecuriePilotes = result;
      response.render('detailPilote', response);
    });


}
