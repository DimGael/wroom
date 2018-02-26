  // //////////////////////////L I S T E R    R E S U L T A T S
let model = require('../models/resultat.js');

	module.exports.ListerResultat = function(request, response){
	    response.title = 'Liste des resultats';

	    model.getListeResultats(function (err, result) {
	        if (err) {
	            // gestion de l'erreur
	            console.log(err);
	            return;
	        }
	    response.listeResultats = result;
	    response.render('listerResultat', response);
	  });
	}

	module.exports.InformationResultats = function(request, response){
	    response.title = 'Liste des resultats d un grand prix';
			let gp = request.params.gp;
	    model.getListeResultats(function (err, result) {
	        if (err) {
	            // gestion de l'erreur
	            console.log(err);
	            return;
	        }
	    response.listeResultats = result;
	  });

		model.getTexteResultats(gp,function (err, result) {
				if (err) {
						// gestion de l'erreur
						console.log(err);
						return;
				}
		response.informationTexteResultats = result;
	});

		model.getInformationResultats(gp,function (err, result) {
				if (err) {
						// gestion de l'erreur
						console.log(err);
						return;
				}
		response.informationResultats = result;
		response.render('listerResultat', response);
	});
	}
