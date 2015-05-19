var models= require('../models/models.js');

exports.show = function(req, res, next){
 models.Quiz.findAll().then(function(preguntas){
 var numPreguntas = preguntas.length;
 models.Comment.findAll().then(function(comments){
  var numComentarios = comments.length;

  var mediaComentarios = numComentarios/numPreguntas;
  var idPreguntas = [];
    for ( i in comments){
      if ( comments[i].QuizId){
        if(idPreguntas.length === 0){
              idPreguntas.push(comments[i].QuizId);
            }
          for (j in idPreguntas){
            if (comments[i].QuizId === idPreguntas[j]){
              continue;
            }
            idPreguntas.push(comments[i].QuizId);
          }
      }
    }
    var comentadas = idPreguntas.length;
    var sincomentar = numPreguntas - comentadas; 

    res.render('statistics.ejs',{
      numPreguntas: numPreguntas,
      numComentarios: numComentarios,
      mediaComentarios : mediaComentarios,
      comentadas : comentadas,
      sincomentar : sincomentar,
      errors: []
    });
    });
 
    
    });
}

