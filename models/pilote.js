let db = require('../configDb');


module.exports.getLettresPilotes = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
						let sql ="SELECT DISTINCT Substring(PILNOM, 1,1) as lettre FROM pilote ORDER BY PILNOM ASC";
						//Il peut être important de loger la requête SQL dans la console
						//console.log ("getLettresPilotes : "+sql);
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
						//console.log ("getProfilPilote : "+sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }

      });
}


// Permet de récupérer les informations d'un pilote

module.exports.getInformationPilotes = function(nom, callback){

	db.getConnection(function(err, connexion){
        if(!err){

						let sql ="SELECT p.PILNOM, p.PILPRENOM, p.PILPOIDS, p.PILTAILLE, p.PILDATENAIS, p.PILTEXTE, pa.PAYNOM FROM pilote p "
						sql = sql+"INNER JOIN pays pa ON p.PAYNUM=pa.PAYNUM "
						sql = sql+"WHERE p.PILNOM='"+nom+"'";

						//Il peut être important de loger la requête SQL dans la console

            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();

						//console.log ("getInformationPilotes : "+sql);
         }
      });
}


module.exports.getListeImagesPilotes = function(nom, callback){

	db.getConnection(function(err, connexion){
        if(!err){

						let sql ="SELECT PHOADRESSE FROM photo ph "
						sql = sql+"INNER JOIN pilote p ON ph.PILNUM=p.PILNUM "
						sql = sql+"WHERE p.PILNOM='"+nom+"' AND PHONUM<>1"


						//Il peut être important de loger la requête SQL dans la console

            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
						//console.log ("getListeImagesPilotes : "+sql2);
         }
      });
}



module.exports.getSponsorPilotes = function(nom, callback){
	db.getConnection(function(err, connexion){
		if(!err){
			let sql ="SELECT sp.SPONOM,sp.SPOSECTACTIVITE FROM pilote p "
			sql = sql+"INNER JOIN sponsorise s ON s.PILNUM=p.PILNUM "
			sql = sql+"INNER JOIN sponsor sp ON s.SPONUM=sp.SPONUM "
			sql = sql+"WHERE p.PILNOM='"+nom+"'"

		//Il peut être important de loger la requête SQL dans la console

		connexion.query(sql, callback);

		// la connexion retourne dans le pool
		connexion.release();
		//console.log ("getListeImagesPilotes : "+sql2);
		}
	});
}

module.exports.getEcuriePilotes = function(nom, callback){
	db.getConnection(function(err, connexion){
		if(!err){
			let sql ="SELECT ECUNOM FROM ecurie e "
			sql = sql+"INNER JOIN pilote p ON p.ECUNUM=e.ECUNUM "
			sql = sql+"WHERE p.PILNOM='"+nom+"'"

		//Il peut être important de loger la requête SQL dans la console
		//console.log ("getEcuriePilotes : "+sql);
		
		connexion.query(sql, callback);

		// la connexion retourne dans le pool
		connexion.release();

		}
	});
}
