let db = require('../configDb');

module.exports.getNationalite = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
						let sql ="SELECT PAYNAT FROM pays ORDER BY PAYNAT";
						//Il peut être important de loger la requête SQL dans la console
						//console.log ("getNationalite : "+sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();

         }
      });
};

module.exports.getAllPays = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
						let sql ="SELECT PAYNUM, PAYNOM FROM pays ORDER BY PAYNAT";
						//Il peut être important de loger la requête SQL dans la console
						//console.log ("getNationalite : "+sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();

         }
      });
};
