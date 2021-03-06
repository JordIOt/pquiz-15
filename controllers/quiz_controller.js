var models = require('../models/models.js');

//Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res,next,quizId){
	models.Quiz.find(quizId).then(
		function(quiz){
			if(quiz){
				req.quiz = quiz;
				next();
			}else{next(new Error('No existe quizId =' + quizId));}
		}
		).catch(function(error){next(error);});
};

//GET /quizes
exports.index=function(req,res){
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index.ejs', {quizes : quizes});
	}
	).catch(function(error){next(error);})
};

//GET /quizes/show
exports.show= function(req,res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
		res.render('quizes/show', {quiz : req.quiz});
	})
};

//GET /quizes/answer
exports.answer = function(req,res){
	var resultado='incorrecto';
		if(req.query.respuesta === req.quiz.respuesta){
			resultado = 'Correcto'
		}
		res.render('quizes/answer',{quiz : req.quiz, respuesta: resultado});
	};