create schema Datos;
use Datos;


create table usuarios(
id int unsigned auto_increment primary key,
email varchar(200) unique not null,
nombre varchar(200) not null,
contrasenia varchar(200) not null,
fechadenacimiento date,
dni int unsigned not null,
fotodeperfil text,
createdAt timestamp default CURRENT_TIMESTAMP,
updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
deletedAt timestamp null
);


create table productos(
id int unsigned auto_increment primary key,
usuario_id INT UNSIGNED NOT NULL,
producto text not null,
descripcionProd text not null,
imagen text not null,
likes integer default 0,
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
deletedAt timestamp null,

FOREIGN KEY(usuario_id) references usuarios(id)
);


create table comentarios(
id int unsigned primary key auto_increment,
post_id int unsigned not null,
usuario_id INT UNSIGNED NOT NULL,
comentario text not null,


FOREIGN KEY(post_id) references productos(id),
FOREIGN KEY(usuario_id) references usuarios(id),

createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
deletedAt timestamp null
);

