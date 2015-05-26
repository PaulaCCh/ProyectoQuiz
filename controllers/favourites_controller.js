var models= require('../models/models.js');

exports.set = function(req, res, next) {
  
	if(req.param.userId == req.session.user.id) 
		models.User.addQuiz(req.quiz);

	res.redirect('/user/' + req.session.user.id + '/favourites');
};

exports.unset = function(req, res, next) {
  
	if(req.param.userId == req.session.user.id) 
		models.User.removeQuiz(req.quiz);

	res.redirect('/user/' + req.session.user.id + '/favourites');
};

exports.index = function(req, res, next) {

	var favourites = models.User.findAll( { where: { id: Number(req.param.userId)}, include: [{ model: models.Quiz }] }).then(function(user){
      res.render('quizes/index', {quizes: user.favourites, errors : []});
    }).catch(function(error){next(error);})
};