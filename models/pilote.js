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

						let sql ="SELECT p.PILNUM, p.PILNOM, p.PILPRENOM, p.PILPOIDS, p.PILTAILLE, p.PILDATENAIS, p.PILTEXTE, pa.PAYNOM FROM pilote p "
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
};

// Récuperation de la liste des pilotes

module.exports.getPilotes = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
						let sql ="SELECT PILNUM,PILNOM,PILPRENOM,PILDATENAIS FROM pilote ORDER BY PILNOM";
						//Il peut être important de loger la requête SQL dans la console
						//console.log ("getLettresPilotes : "+sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();

         }
      });
};


module.exports.getNationalite = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
						let sql ="SELECT PAYNUM,PAYNAT FROM pays ORDER BY PAYNAT";
						//Il peut être important de loger la requête SQL dans la console
						//console.log ("getNationalite : "+sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();

         }
      });
};

module.exports.getEcurie = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
						let sql ="SELECT ECUNUM,ECUNOM FROM ecurie ORDER BY ECUNOM";
						//Il peut être important de loger la requête SQL dans la console
						//console.log ("getNationalite : "+sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();

         }
      });
};

module.exports.ajouterPilote = function (pilote,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
						let sql ="INSERT INTO pilote(PAYNUM,PILNOM,PILPRENOM,PILDATENAIS,PILPIGISTE,PILPOINTS,PILPOIDS,PILTAILLE,PILTEXTE,ECUNUM) ";
						sql = sql + "VALUES("+pilote.PAYNUM+", '"+ pilote.PILNOM+"', '"+pilote.PILPRENOM+"', '"+pilote.PILDATENAIS+"',"+ null +","+ pilote.PILPOINTS+","+ pilote.PILPOIDS+","+ pilote.PILTAILLE+", '"+ pilote.PILTEXTE+"', "+ pilote.ECUNUM + ")"
						//Il peut être important de loger la requête SQL dans la console
						//console.log ("ajouterPilote : "+sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();

         }
      });
};


module.exports.piloteAModifier = function(nom, callback){

	db.getConnection(function(err, connexion){
        if(!err){

						let sql ="SELECT p.PILNUM,p.PILNOM, p.PILPRENOM, p.PILPOIDS, p.PILTAILLE, p.PILDATENAIS, p.PILTEXTE,p.PILPOINTS FROM pilote p "
						sql = sql+'WHERE p.PILNOM="'+nom+'"';

						//Il peut être important de loger la requête SQL dans la console

            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();

						//console.log ("piloteAModifier : "+sql);
         }
      });
};

module.exports.modifierPilote = function (pilote,id,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
						let sql ="update pilote set PILNOM='"+pilote.PILNOM+"',PILPRENOM='"+pilote.PILPRENOM+"',PILDATENAIS='"+pilote.PILDATENAIS+"',PILPOIDS="+pilote.PILPOIDS+",PILTAILLE="+pilote.PILTAILLE+',PILTEXTE="'+pilote.PILTEXTE+'"'+",PILPOINTS="+pilote.PILPOINTS+",ECUNUM="+pilote.ECUNUM+",PAYNUM="+pilote.PAYNUM;
						sql = sql + " WHERE PILNUM="+id;
						//Il peut être important de loger la requête SQL dans la console
						//console.log ("modifierPilote : "+sql);

            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();

         }
      });
};







 module.exports.supprimerCourse = function (id,callback) {
    // connection à la base
 	db.getConnection(function(err, connexion){
         if(!err){
 						let sql ="DELETE FROM course WHERE PILNUM="+id;
 						//Il peut être important de loger la requête SQL dans la console
 						//console.log ("supprimerFinance : "+sql);

             connexion.query(sql, callback);

             // la connexion retourne dans le pool
             connexion.release();

          }
       });
 };

 module.exports.supprimerSponsorise = function (id,callback) {
    // connection à la base
   db.getConnection(function(err, connexion){
         if(!err){
             let sql ="DELETE FROM sponsorise WHERE PILNUM="+id;
             //Il peut être important de loger la requête SQL dans la console
             //console.log ("supprimerSponsorise : "+sql);

             connexion.query(sql, callback);

             // la connexion retourne dans le pool
             connexion.release();

          }
       });
 };

 module.exports.supprimerEssai = function (id,callback) {
    // connection à la base
 	db.getConnection(function(err, connexion){
         if(!err){
 						let sql ="DELETE FROM essais WHERE PILNUM="+id;
 						//Il peut être important de loger la requête SQL dans la console
 						//console.log ("supprimerSponsor : "+sql);

             connexion.query(sql, callback);

             // la connexion retourne dans le pool
             connexion.release();

          }
       });
 };



  module.exports.supprimerPhoto = function (id,callback) {
     // connection à la base
    db.getConnection(function(err, connexion){
          if(!err){
              let sql ="DELETE FROM photo WHERE PILNUM="+id;
              //Il peut être important de loger la requête SQL dans la console
              //console.log ("supprimerSponsorise : "+sql);

              connexion.query(sql, callback);

              // la connexion retourne dans le pool
              connexion.release();

           }
        });
  };


	 module.exports.supprimerPilote = function (id,callback) {
	    // connection à la base
	   db.getConnection(function(err, connexion){
	         if(!err){
	             let sql ="DELETE FROM pilote WHERE PILNUM="+id;
	             //Il peut être important de loger la requête SQL dans la console
	             //console.log ("supprimerPilote : "+sql);

	             connexion.query(sql, callback);

	             // la connexion retourne dans le pool
	             connexion.release();

	          }
	       });
	 };
