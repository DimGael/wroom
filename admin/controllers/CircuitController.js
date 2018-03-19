let model = require('../../models/circuit.js');
let modelPays = require('../../models/pays.js');
let async=require('async');


module.exports.GestionCircuits = function(request, response){
  response.title = "Gestion des circuits"

//Utiliser une méthode qui renvoie TOUT les circuits
  model.getAllCircuits(function (err, result) {
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
        response.listeCircuit = result
        response.render('circuits', response)
    })
}

module.exports.AjouterCircuit = function(request, response){
  modelPays.getAllPays(function(err, result){
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
      response.title = "Ajouter un circuit"
      response.listePays = result
      response.render('ajouterCircuit', response)
  })
}

module.exports.AjoutCircuit = function(request, response){
  model.ajouterCircuit(request.body, function(err, result){
    if (err) {
        // gestion de l'erreur
        console.log(err);
        return;
    }
    response.title = "Ajout en cours"
    response.render('ajoutCircuit', response)
  })
}

module.exports.ModifierCircuit = function(request, response){
  response.title = "Modification d'un circuit"
  let circuit_nom = request.params.nom;
  response.nomCircuit = circuit_nom

  async.parallel(
    [
      function(callback){
        model.getInformationCircuits(circuit_nom, callback)
      },
      function(callback){
        modelPays.getAllPays(callback)
      }
    ],

    function(err, result){
      if(err){
        console.log(err);
        return
      }
      let listePays = result[1][0];
      response.listePays = new Array();

      response.circuit = result[0][0][0];
      let pays = response.circuit.PAYNOM;

      //faire en sorte que le pays du circuit soit enlevé
      for(let i = 0; i<listePays.length; i++){
        if(listePays[i] !== response.circuit.PAYNOM){
            response.listePays.push(listePays[i])
        }
      }
      response.render('modifierCircuit', response)
    }
  )
}

module.exports.ModificationCircuit = function(request, response){
  response.title = "Modification d'un circuit";
}

module.exports.SupprimerCircuit = function(request, response){
  response.title = "Supression d'un circuit"
  let circuit_nom = request.params.nom;

  model.supprimerCircuit(circuit_nom, function(err, result){
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
      response.nomPage = "Suppression du circuit "+circuit_nom+" finie !"
      response.render('insertionOK', response);
  })
}
