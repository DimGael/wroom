let db = require('../configDb');


module.exports.getLettresPilotes = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
						let sql ="SELECT DISTINCT Substring(PILNOM, 1,1) as lettre FROM pilote ORDER BY PILNOM ASC";
						//Il peut être important de loger la requête SQL dans la console
						console.log ("getLettresPilotes : "+sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

//rajout d'une variable lettre pour récupérer la lettre dans la requête SQL
module.exports.getProfilPilote = function(lettre, callback){
	db.getConnection(function(err, connexion){
        if(!err){
						let sql ="SELECT ph.phoadresse, pi.pilnom, pi.pilprenom FROM pilote pi "
						sql = sql+"INNER JOIN PHOTO ph ON ph.PILNUM = pi.PILNUM "
						sql = sql+"WHERE ph.PHONUM = 1 AND pi.pilnom LIKE '"+lettre+"%'";
						//Il peut être important de loger la requête SQL dans la console
						console.log ("getProfilPilote : "+sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
}
