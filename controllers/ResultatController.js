  // //////////////////////////L I S T E R    R E S U L T A T S
let model = require('../models/resultat.js');
let async = require('async');
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

			async.parallel([
				function(callback){
					model.getListeResultats(function (err, result) {callback(null,result)});
				},

				function(callback){
					model.getTexteResultats(gp,function (err, result) {callback(null,result)});
				},

				function(callback){
					model.getInformationResultats(gp,function (err, result) {callback(null,result)});
				}
			],

				function(err,result){
					if (err){
						console.log(err);
						return;
					}
					response.listeResultats = result[0];

					response.informationTexteResultats = result[1];

					response.informationResultats = result[2];

					response.render('listerResultat', response);
				}
			);

}
