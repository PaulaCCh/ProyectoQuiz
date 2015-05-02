var path = require('path');

//Postgres DATABASE_URL= postgres://user:passwd@host:port/database
//SQLite DATABASE_URL=sqlite://:@:/
var url= process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name= (url[6]||null);
var user= (url[2]||null);
var pwd= (url[3]||null);
var protocol= (url[1]||null);
var dialect= (url[1]||null);
var port= (url[5]||null);
var host= (url[4]||null);
var DB_name= process.env.DATABASE_STORAGE;
//Cargar Modelo ORM
var Sequelize = require('sequelize');
//Usar BBDD SQLite o POstgres
var sequelize= new Sequelize(DB_name, user, pwd,{dialect:protocol,protocol:protocol,port:port,host:host,storage:storage,omitNull:true}
	);
//Importar la definicion de la tabla de Quiz en quiz.js
var Quiz = sequelize.import(path.join(_dirname,'quiz'));
exports.Quiz=Quiz; //Exporta definicion de tabla Quiz

//sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().success(function(){
	if(count===0){ //la tabla se inicializa solo si está vacia
		Quiz.create({pregunta:'Capital de Italia',
					respuesta:'Roma'
					})
		.success(function(){console.log('Base de datos inicializada')});
	};
});
});