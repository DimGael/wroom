
  // ////////////////////////////////////////////// A C C U E I L
module.exports.Index = function(request, response){
    response.title = "Admin Connexion";
    response.connecte = true;
    response.dansHome = true;
    response.render('home', response);
};
