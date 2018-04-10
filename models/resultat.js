let db = require('../configDb');


module.exports.getListeResultats = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
						let sql ="SELECT g.GPNUM,g.GPNOM,p.PAYADRDRAP FROM grandprix g ";
            sql=sql+"INNER JOIN circuit c ON c.CIRNUM=g.CIRNUM ";
            sql=sql+"INNER JOIN pays p ON p.PAYNUM=c.PAYNUM";
						//Il peut être important de loger la requête SQL dans la console
						//console.log ("getListeCircuits : "+sql);
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getInformationResultats = function (gp,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
						let sql ="SELECT p.PILNOM, p.PILPOINTS, c.TEMPSCOURSE FROM PILOTE p ";
            sql=sql+"INNER JOIN course c ON c.PILNUM=p.PILNUM ";
            sql=sql+"INNER JOIN grandprix g ON g.GPNUM=c.GPNUM ";
            sql=sql+'WHERE g.GPNOM='+'"'+gp+'"'+' AND P.PILPOINTS IS NOT NULL';

            sql=sql+" ORDER BY p.PILPOINTS DESC";
						//Il peut être important de loger la requête SQL dans la console
						//console.log ("getListeCircuits : "+sql);
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getTexteResultats = function (gp,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
						let sql ="SELECT GPCOMMENTAIRE FROM grandprix ";
            sql=sql+'WHERE GPNOM='+'"'+gp+'"'+' ';
						//Il peut être important de loger la requête SQL dans la console
						//console.log ("getTexteResultats : "+sql);
            connexion.query(sql, callback);
            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};
