
  // ////////////////////////////////////////////// A C C U E I L
module.exports.Index = function(request, response){
    response.title = "Admin Connexion";
    response.connecte = request.session.connecte;
    response.dans_home = true;
    response.render('connexion', response);
};


module.exports.Connexion = function(request, response){
    response.title = "Connexion en cours";
    response.connecte = request.session.connecte;
    response.dans_home = true;
    response.render('connexion', response);
};
