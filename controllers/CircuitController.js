// ////////////////////// L I S T E R     C I R C U I T S
let model = require('../models/circuit.js');

module.exports.ListerCircuit = function(request, response){
    response.title = 'Liste des circuits';

    model.getListeCircuits(function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
    response.listeCircuits = result;
    response.render('listerCircuit', response);
  });
}


module.exports.InformationCircuits = function(request, response){
    response.title = 'Liste des circuits : affichage des informations';
    let circuit = request.params.circuit;
    model.getListeCircuits(function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
    response.listeCircuits = result;
  });

  model.getInformationCircuits(circuit,function (err, result) {
      if (err) {
          // gestion de l'erreur
          console.log(err);
          return;
      }
  response.informationCircuits = result;
  response.render('listerCircuit', response);
});

}
