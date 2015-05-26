var models= require('../models/models.js');

exports.set = function(req, res, next) {
  
	if(req.params.userId == req.session.user.id) 
		models.User.addQuiz(req.quiz);

	res.redirect('/user/' + req.user.id + '/favourites');
};

exports.unset = function(req, res, next) {
  
	if(req.params.userId == req.session.user.id) 
		models.User.removeQuiz(req.quiz);

	res.redirect('/user/' + req.user.id + '/favourites');
};

exports.index = function(req, res, next) {
	models.User.findAll( { where: { id: Number(req.params.userId)}, include: [{ model: models.Quiz }] }).then(function(user){

		user.getQizzes().then(function (favs) {
			res.render('quizes/show', {quiz: favs, errors : []});
		})
      
    }).catch(function(error){next(error);})
};