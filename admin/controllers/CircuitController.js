let model = require('../../models/circuit.js');
let modelPays = require('../../models/pays.js')


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
  console.log(request.body)
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
