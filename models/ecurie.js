/*
* config.Db contient les parametres de connection à la base de données
* il va créer aussi un pool de connexions utilisables
* sa méthode getConnection permet de se connecter à MySQL
*
*/

let db = require('../configDb');

/*
* Récupérer l'intégralité les écuries avec l'adresse de la photo du pays de l'écurie
* @return Un tableau qui contient le N°, le nom de l'écurie et le nom de la photo du drapeau du pays
*/

module.exports.getListeEcurie = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT ecunum, payadrdrap, ecunom,ecunomdir,ecupoints FROM ecurie e INNER JOIN pays p ";
						sql= sql + "ON p.paynum=e.paynum ORDER BY ecunom";
						//Il peut être important de loger la requête SQL dans la console
						//console.log ("getListeEcurie : "+sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};


module.exports.getInformationEcuries = function (ecurie,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT  DISTINCT e.ECUNOM, e.ECUADRESSEIMAGE, e.ECUNOMDIR, e.ECUADRSIEGE,pa.PAYNOM, fp.FPNOM FROM ecurie e ";
						sql= sql + "INNER JOIN pays pa ON pa.PAYNUM=e.PAYNUM ";
						sql= sql + "INNER JOIN fourn_pneu fp ON fp.FPNUM=e.FPNUM ";
						sql=sql+'WHERE e.ECUNOM='+'"'+ecurie+'"';
						//Il peut être important de loger la requête SQL dans la console
						//console.log ("getListeEcurie : "+sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getPilotesEcurieDansUnGp = function (ecurie,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT  DISTINCT e.ECUNOM, p.PILNOM, p.PILPRENOM FROM ecurie e ";
						sql= sql + "INNER JOIN PILOTE p ON p.ECUNUM=e.ECUNUM ";
						sql= sql + "INNER JOIN course c ON c.PILNUM=p.PILNUM ";
						sql= sql + "INNER JOIN grandprix g ON c.GPNUM=g.GPNUM "
						sql=sql+'WHERE e.ECUNOM='+'"'+ecurie+'" AND YEAR(g.GPDATE) = YEAR(CURRENT_DATE)';
						//Il peut être important de loger la requête SQL dans la console
						//console.log ("getPilotesEcurieDansUnGp : "+sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};


module.exports.getPhotosVoituresEcuries = function (ecurie,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT  v.VOIADRESSEIMAGE FROM ecurie e ";
						sql= sql + "INNER JOIN voiture v ON v.ECUNUM=e.ECUNUM ";
						sql=sql+'WHERE e.ECUNOM='+'"'+ecurie+'"';
						//Il peut être important de loger la requête SQL dans la console
						//console.log ("getPilotesEcurieDansUnGp : "+sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};


module.exports.ajouterEcurie = function (ecurie,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
						let sql ="INSERT INTO ecurie(PAYNUM,ECUNOM,ECUNOMDIR,ECUADRSIEGE,ECUPOINTS,ECUADRESSEIMAGE,FPNUM) ";
						sql = sql + "VALUES("+ecurie.PAYNUM+", '"+ ecurie.ECUNOM+"', '"+ecurie.ECUNOMDIR+"', '"+ecurie.ECUADRSIEGE+"',"+ ecurie.ECUPOINTS +",'"+ ecurie.ECUADRESSEIMAGE+"', "+1+")"
						//Il peut être important de loger la requête SQL dans la console
						//console.log ("ajouterEcurie : "+sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();

         }
      });
};


module.exports.ecurieAModifier = function(nom, callback){

	db.getConnection(function(err, connexion){
        if(!err){

						let sql ="SELECT e.ECUNUM,e.ECUNOM, e.FPNUM, e.ECUNOMDIR, e.ECUADRSIEGE, e.ECUPOINTS, e.ECUADRESSEIMAGE FROM ecurie e "
						sql = sql+"WHERE e.ECUNOM='"+nom+"'";

						//Il peut être important de loger la requête SQL dans la console

            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();

						//console.log ("piloteAModifier : "+sql);
         }
      });
};




module.exports.modifierEcurie = function (ecurie,id,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
						let sql ="update ecurie set ECUNOM='"+ecurie.ECUNOM+"',ECUNOMDIR='"+ecurie.ECUNOMDIR+"',ECUADRSIEGE='"+ecurie.ECUADRSIEGE+"',ECUPOINTS="+ecurie.ECUPOINTS+",PAYNUM="+ecurie.PAYNUM+',ECUADRESSEIMAGE="'+ecurie.ECUADRESSEIMAGE+'"';
						sql = sql + " WHERE ECUNUM="+id;
						//Il peut être important de loger la requête SQL dans la console
						//console.log ("modifierEcurie : "+sql);

            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();

         }
      });
};







 module.exports.supprimerFinance = function (id,callback) {
    // connection à la base
 	db.getConnection(function(err, connexion){
         if(!err){
 						let sql ="DELETE FROM finance WHERE ECUNUM="+id;
 						//Il peut être important de loger la requête SQL dans la console
 						//console.log ("supprimerFinance : "+sql);

             connexion.query(sql, callback);

             // la connexion retourne dans le pool
             connexion.release();

          }
       });
 };

 module.exports.supprimerVoiture = function (id,callback) {
    // connection à la base
   db.getConnection(function(err, connexion){
         if(!err){
             let sql ="DELETE FROM voiture WHERE ECUNUM="+id;
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
 						let sql ="update pilote set ECUNUM=null WHERE ECUNUM="+id;
 						//Il peut être important de loger la requête SQL dans la console
 						//console.log ("supprimerSponsor : "+sql);

             connexion.query(sql, callback);

             // la connexion retourne dans le pool
             connexion.release();

          }
       });
 };

 module.exports.supprimerEcurie = function (id,callback) {
		// connection à la base
	 db.getConnection(function(err, connexion){
				 if(!err){
						 let sql ="DELETE FROM ecurie WHERE ECUNUM="+id;
						 //Il peut être important de loger la requête SQL dans la console
						 //console.log ("supprimerSponsor : "+sql);

						 connexion.query(sql, callback);

						 // la connexion retourne dans le pool
						 connexion.release();

					}
			 });
 };
