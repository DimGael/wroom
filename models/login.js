let db = require('../configDb');


module.exports.verifierConnexion = function (login, mdpCrypte, callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
						let sql ="SELECT login, passwd FROM login WHERE login = '" + login + "' AND passwd = '"+ mdpCrypte +"'";
						//Il peut être important de loger la requête SQL dans la console
						console.log ("verifierConnexion : "+sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};
