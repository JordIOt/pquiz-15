var path = require('path');
//Postgres DATABASE_URL=postgres://user:passwd@host:port/database
//SQlite DATABASE_URL=sqlite://:@:/g
var url=process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6] || null);
var user    = (url[2] || null);
var pwd     = (url[3] || null);
var protocol= (url[1] || null);
var dialect = (url[1] || null);
var port    = (url[5] || null);
var host    = (url[4] || null);
var storage = process.env.DATABASE_STORAGE;

//cargar Modelo ORM
var Sequelize = require('sequelize');

//Usar BBDD SQlite O POSTGRES
var sequelize = new Sequelize(DB_name,user,pwd,
						{dialect  :protocol,
						 protocol :protocol,
						 port     :port,
						 host     :host,
						 storage  :storage,
						 omitNull :true
						}
						);

//Importar la definicion de la tabla Quiz en quiz.js
var quiz_path = path.join(__dirname, 'quiz');
var Quiz = sequelize.import(quiz_path);

exports.Quiz = Quiz;// Exporta tabla Quiz

//sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().then(function(){
	//then(...) ejecuta el manejador una vez creada la tabla
	Quiz.count().then(function(count){
		if(count === 0){//la tabla se inicia si esta vacia
			Quiz.create({pregunta: 'Quien descubrió America?',
						 respuesta: '´Cristobal Colon'
						});
			Quiz.create({pregunta: 'Capital de Italia?',
						 respuesta: 'roma'
						});

			Quiz.create({pregunta : 'Cual es capital de España?',
						respuesta: 'Madrid'
					})
			.then(function(){console.log('Base de datos inicializada')});
		};

		});
	});
