let model = require('../../models/sponsor.js');
//let pilote = require('../../models/pilote.js');
let async=require('async');


module.exports.AfficherSponsor = function(request, response){
  response.title = "Gestion des sponsors"

  model.getListeSponsor(function (err, result) {
      if (err) {
          console.log(err);
          return;
      }
        response.listeSponsors = result;
        //console.log(response.listeSponsors);
        response.render('sponsors', response)
    })
}


module.exports.AjouterSponsor = function(request, response){
  response.title = "Ajout d'un sponsor"


  model.getEcurieSponsorise(function (err, result) {
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
        response.listeEcurieSponso = result;
        response.render('ajouterSponsor', response);
    })
}



module.exports.InsertionSponsor = function(request, response){

  async.parallel([
    function(callback){
      model.ajouterSponsor(request.body, function (err, result) {callback(null,result)});
    },

    function(callback){
      model.ajoutFinance(request.body,function(err,result){callback(null,result)})
    }

  ],

  function(err,result){
    if (err){
      console.log(err);
      return;
    }
    response.title = 'insertion effectuée';
    response.nomPage = " Insertion du sponsor éffectuée"
    response.render("insertionOK", response);
  }
  );
}



module.exports.ModifierSponsor = function(request, response){
  let nom = request.params.nom;
  response.title = 'modification du sponsor '+nom;

  async.parallel([
    function(callback){
      model.getEcurieSponsorise( function (err, result) {callback(null,result)});
    },

    function(callback){
      model.sponsorAModifier(nom,function(err,result){callback(null,result)})
    }

  ],

    function(err,result){
      if (err){
        console.log(err);
        return;
      }
      response.ecurieSponsorise = result[0];


      response.infoSponsor = result[1];

      response.render('modifierSponsor', response);
    }
  );

}




module.exports.ModificationSponsor = function(request, response){
  let num = request.params.num;

  async.parallel([
    function(callback){
      model.modifierSponsor(request.body,num, function (err, result) {callback(null,result)});
    },

    function(callback){
      model.modifierFinance(request.body,num,function(err,result){callback(null,result)})
    }

  ],

    function(err,result){
      if (err){
        console.log(err);
        return;
      }

    response.title = 'modification effectuée';
    response.nomPage = " Modification du sponsor éffectuée"
    response.render("modificationOK", response);
  });

}







module.exports.SupprimerSponsor = function(request, response){
  let num = request.params.num;

  async.parallel([
    function(callback){
      model.supprimerFinance(num, function (err, result) {callback(null,result)});
    },

    function(callback){
      model.supprimerSponsorise(num,function(err,result){callback(null,result)});
    },

    function(callback){
      model.supprimerSponsor(num,function(err,result){callback(null,result)});
    }


  ],

    function(err,result){
      if (err){
        console.log(err);
        return;
      }

    response.title = 'Suppression effectuée';
    response.nomPage = " Suppression du sponsor éffectuée"
    response.render("suppressionOK", response);
  });
}
