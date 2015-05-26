var models= require('../models/models.js');

exports.set = function(req, res, next) {
  
	if(req.params.userId == req.session.user.id) 
		req.user.addQuiz(req.quiz);

	res.redirect('/user/' + req.user.id + '/favourites');
};

exports.unset = function(req, res, next) {
  
	if(req.params.userId == req.session.user.id) 
		req.user.removeQuiz(req.quiz);

	res.redirect('/user/' + req.user.id + '/favourites');
};

exports.index = function(req, res, next) {
	models.User.findAll( { where: { id: Number(req.params.userId)}, include: [{ model: models.Quiz }] }).then(function(user){

		user[0].getQuizzes().then(function (favs) {
			res.render('quizes/index', {quizes: favs, errors : []});
		})
      
    }).catch(function(error){next(error);})
};