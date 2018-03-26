let db = require('../configDb');


module.exports.getListeCircuits = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
						let sql ="SELECT c.CIRNOM,p.PAYADRDRAP FROM circuit c ";
            sql=sql+"INNER JOIN pays p ON p.PAYNUM=c.PAYNUM";
						//Il peut être important de loger la requête SQL dans la console
						//console.log ("getListeCircuits : "+sql);
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};


module.exports.getInformationCircuits = function(nomCircuit,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
						let sql ="SELECT c.CIRNUM, c.CIRADRESSEIMAGE, c.CIRLONGUEUR, c.CIRNOM, c.CIRNBSPECTATEURS, c.CIRTEXT, c.PAYNUM, p.PAYNOM FROM circuit c ";
            sql=sql+"INNER JOIN PAYS p ON p.PAYNUM=c.PAYNUM WHERE c.CIRNOM ='"+nomCircuit+"'";
						//Il peut être important de loger la requête SQL dans la console
						console.log ("getListeCircuits : "+sql);
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getAllCircuits = function(callback){
 db.getConnection(function(err, connexion){
			 if(!err){
					 let sql ='SELECT CIRNUM, CIRLONGUEUR, CIRNOM, CIRNBSPECTATEURS FROM circuit';
					 //Il peut être important de loger la requête SQL dans la console
					 console.log ("getAllCircuits : "+sql);
					 connexion.query(sql, callback);
					 // la connexion retourne dans le pool
					 connexion.release();
				}
		 });
}

module.exports.ajouterCircuit = function(circuit, callback){
	db.getConnection(function(err, connexion){

	 			 if(!err){
					 console.log(circuit.nom)
	 					 let sql ="INSERT INTO circuit (paynum, cirnom, cirlongueur, cirnbspectateurs, ciradresseimage, cirtext) VALUES (";
						 sql+=""+circuit.pays+", '"+circuit.nom+"', "+circuit.longueur+", "+circuit.nb_spectateurs+", '"+circuit.image+"', '	"+circuit.description+"')";
	 			 //Il peut être important de loger la requête SQL dans la console
	 					 console.log ("ajouterCircuit : "+sql);
	 					 connexion.query(sql, callback);
	 					 // la connexion retourne dans le pool
	 					 connexion.release();
	 				}
	})
}

module.exports.supprimerCircuit = function(idCircuit, callback){
	db.getConnection(function(err, connexion){

	 			 if(!err){
	 					 let sqlGrandPrix = "DELETE FROM grandprix WHERE cirnum = "+idCircuit+";"
						 let sqlCircuit ="DELETE FROM circuit WHERE cirnum = "+idCircuit+";"

						//Il peut être important de loger la requête SQL dans la console
	 					 console.log ("supprimerCircuit, étape 1 : "+sqlGrandPrix);

	 					 connexion.query(sqlGrandPrix, function(err, row, fields){
								 if (err) throw err;

		 	 					 console.log ("supprimerCircuit, étape 2 : "+sqlCircuit);
								 connexion.query(sqlCircuit, callback);
			 					 // la connexion retourne dans le pool
			 					 connexion.release();
						 });
	 				}
	//Pour supprimer les trucs associés au circuit :DD
	//DELETE from course where GPNUM IN (SELECT GPNUM FROM grandprix WHERE CIRNUM = 11)
	})
}

module.exports.getGrandPrix = function(idCircuit, callback){
	db.getConnection(function(err, connexion){

	 			 if(!err){
	 					 let sqlGrandPrix = "SELECT gpnum FROM grandprix WHERE cirnum = "+idCircuit+";"

						//Il peut être important de loger la requête SQL dans la console
	 					 console.log ("getGrandPrix: "+sqlGrandPrix);
						 connexion.query(sqlGrandPrix, callback);
	 					 // la connexion retourne dans le pool
	 					 connexion.release();
	 				}
	})
}

module.exports.modifierCircuit = function(circuit, cirnum, callback){
		db.getConnection(function(err, connexion){
			if(!err){
				console.log("Numero fourni par le CONTROLLER : "+cirnum)
				let sql ="UPDATE circuit "
				sql+=" SET PAYNUM = "+circuit.PAYNUM+",\n "
				sql+="CIRNOM = '"+circuit.CIRNOM+"'"
				sql+=",\n CIRLONGUEUR = "+circuit.CIRLONGUEUR
				sql+=",\n CIRNBSPECTATEURS = "+circuit.CIRNBSPECTATEURS
				sql+=',\n CIRTEXT = `'+circuit.CIRTEXT+'`'

				sql+=" WHERE CIRNUM = "+cirnum
				 //Il peut être important de loger la requête SQL dans la console
				console.log ("Modifier Circuit : "+sql);
				connexion.query(sql, callback);
				// la connexion retourne dans le pool
				connexion.release();
			}
		})
}
