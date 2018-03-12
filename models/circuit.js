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


module.exports.getInformationCircuits = function(circuit,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
						let sql ="SELECT c.CIRADRESSEIMAGE, c.CIRLONGUEUR, c.CIRNOM, c.CIRNBSPECTATEURS, c.CIRTEXT, p.PAYNOM FROM circuit c ";
            sql=sql+"INNER JOIN PAYS p ON p.PAYNUM=c.PAYNUM WHERE c.CIRNOM ='"+circuit+"'";
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
					 let sql ='SELECT CIRLONGUEUR, CIRNOM, CIRNBSPECTATEURS FROM circuit';
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
