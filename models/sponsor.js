 let db = require('../configDb');


 module.exports.getListeSponsor = function (callback) {
    // connection à la base
 	db.getConnection(function(err, connexion){
         if(!err){
         	  // s'il n'y a pas d'erreur de connexion
         	  // execution de la requête SQL
 						let sql ="SELECT sponum, sponom, sposectactivite FROM sponsor ";
 						sql= sql + "ORDER BY sponom";
 						//Il peut être important de loger la requête SQL dans la console
 						//console.log ("getListeEcurie : "+sql);
             connexion.query(sql, callback);

             // la connexion retourne dans le pool
             connexion.release();
          }
       });
 };


 module.exports.getEcurieSponsorise = function (callback) {
    // connection à la base
 	db.getConnection(function(err, connexion){
         if(!err){
         	  // s'il n'y a pas d'erreur de connexion
         	  // execution de la requête SQL
 						let sql ="SELECT ECUNOM,ECUNUM FROM ecurie ";
 						sql= sql + "ORDER BY ecunom";
 						//Il peut être important de loger la requête SQL dans la console
 						//console.log ("getListeEcurie : "+sql);
             connexion.query(sql, callback);

             // la connexion retourne dans le pool
             connexion.release();
          }
       });
 };


 module.exports.ajouterSponsor = function (sponsor,callback) {
    // connection à la base
 	db.getConnection(function(err, connexion){
         if(!err){


 						let sql ="INSERT INTO sponsor(SPONOM,SPOSECTACTIVITE) ";
 						sql = sql + "VALUES('"+sponsor.SPONOM+"', '"+ sponsor.SPOSECTACTIVITE+"'); ";
            /*

            */

 						//Il peut être important de loger la requête SQL dans la console

            //console.log ("Attention : "+sql);
            connexion.query(sql, callback);


             // la connexion retourne dans le pool
             connexion.release();

          }
       });
 };

 module.exports.ajoutFinance = function (sponsor,callback) {
    // connection à la base
 	db.getConnection(function(err, connexion){
         if(!err){

           if (sponsor.ECUNUM!=null){
             let sql="INSERT INTO finance(ECUNUM,SPONUM) ";
             sql = sql + "VALUES("+sponsor.ECUNUM+",(SELECT SPONUM FROM sponsor WHERE SPONOM='"+sponsor.SPONOM+"'))";


              //console.log ("test : "+sql);
              connexion.query(sql, callback);


               // la connexion retourne dans le pool
               connexion.release();
            }

          }
       });
 };




 module.exports.sponsorAModifier = function(nom, callback){

 	db.getConnection(function(err, connexion){
         if(!err){

 						let sql ="SELECT s.SPONUM,s.SPONOM,s.SPOSECTACTIVITE FROM sponsor s "
 						sql = sql+"WHERE s.SPONOM='"+nom+"'";

 						//Il peut être important de loger la requête SQL dans la console

             connexion.query(sql, callback);

             // la connexion retourne dans le pool
             connexion.release();

 						//console.log ("piloteAModifier : "+sql);
          }
       });
 };



 module.exports.modifierSponsor = function (sponsor,id,callback) {
    // connection à la base
 	db.getConnection(function(err, connexion){
         if(!err){
 						let sql ="update sponsor set SPONOM='"+sponsor.SPONOM+"',SPOSECTACTIVITE='"+sponsor.SPOSECTACTIVITE+"'";
 						sql = sql + " WHERE SPONUM="+id;
 						//Il peut être important de loger la requête SQL dans la console
 						//console.log ("???? : "+sql);

             connexion.query(sql, callback);

             // la connexion retourne dans le pool
             connexion.release();

          }
       });
 };


 module.exports.modifierFinance = function (sponsor,id,callback) {
    // connection à la base
 	db.getConnection(function(err, connexion){
         if(!err){
 						let sql ="update finance set ECUNUM="+sponsor.ECUNUM;
 						sql = sql + " WHERE SPONUM="+id;
 						//Il peut être important de loger la requête SQL dans la console
 						//console.log ("modifierSponsor : "+sql);

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
 						let sql ="DELETE FROM finance WHERE SPONUM="+id;
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
             let sql ="DELETE FROM sponsorise WHERE SPONUM="+id;
             //Il peut être important de loger la requête SQL dans la console
             //console.log ("supprimerSponsorise : "+sql);

             connexion.query(sql, callback);

             // la connexion retourne dans le pool
             connexion.release();

          }
       });
 };

 module.exports.supprimerSponsor = function (id,callback) {
    // connection à la base
 	db.getConnection(function(err, connexion){
         if(!err){
 						let sql ="DELETE FROM sponsor WHERE SPONUM="+id;
 						//Il peut être important de loger la requête SQL dans la console
 						//console.log ("supprimerSponsor : "+sql);

             connexion.query(sql, callback);

             // la connexion retourne dans le pool
             connexion.release();

          }
       });
 };
