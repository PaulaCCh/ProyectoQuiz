var models= require('../models/models.js');

exports.set = function(req, res, next) {
  
	if(req.param.userId == req.session.user.id) 
		models.User.addQuiz(req.quiz);

	res.redirect('/user/' + req.user.id + '/favourites');
};

exports.unset = function(req, res, next) {
  
	if(req.param.userId == req.session.user.id) 
		models.User.removeQuiz(req.quiz);

	res.redirect('/user/' + req.user.id + '/favourites');
};

exports.index = function(req, res, next) {
	models.User.findAll( { where: { id: Number(req.param.userId)}, include: [{ model: models.Quiz }] }).then(function(user){


      
    }).catch(function(error){next(error);})
};