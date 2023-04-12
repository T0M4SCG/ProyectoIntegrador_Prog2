create database DatosProyecto;
use DatosProyecto;




create table usuarios(
id int unsigned auto_increment primary key,
email varchar(200) unique not null,
contrasenia varchar(200) not null,
fecha_de_nacimiento date,
dni int unsigned not null,
foto_de_perfil text,
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
deletedAt timestamp null
);


insert into usuarios (id,email,contrasenia,fecha_de_nacimiento,dni,foto_de_perfil)values(default,"santino@gmail.com","hola123",'2002-05-12',44367108,"foto.jpg");
insert into usuarios (id,email,contrasenia,fecha_de_nacimiento,dni,foto_de_perfil)values(default,"tomas@gmail.com","chau321",'2004-04-13',4677098,"foto.jpg");
insert into usuarios (id,email,contrasenia,fecha_de_nacimiento,dni,foto_de_perfil)values(default,"pepe@hotmail.com","bocaelmasgrande",'2003-07-20',91202321,"foto.jpg");


create table productos(
id int unsigned auto_increment primary key,
usuario_id INT UNSIGNED NOT NULL,
producto text not null,
descripcionProd text not null,
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
deletedAt timestamp null,

FOREIGN KEY(usuario_id) references usuarios(id)
);



insert into productos (id,usuario_id,producto,descripcionProd) values(default,2,"Macbook air M2 2022","La notebook Apple MacBook Air M2 2022 es una solución tanto para trabajar y estudiar como para entretenerte. Al ser portátil, el escritorio dejará de ser tu único espacio de uso para abrirte las puertas a otros ambientes ya sea en tu casa o en la oficina.");
insert into productos (id,usuario_id,producto,descripcionProd)values(default,3,"Macbook pro M2 2022","La nueva MacBook Pro ofrece a los usuarios más pro un rendimiento revolucionario. Elige entre el chip M1 Pro o el aún más potente M1 Max para resolver las tareas profesionales más exigentes con una excepcional duración de la batería");
insert into productos (id,usuario_id,producto,descripcionProd)values(default,3,"Impresora Epson","Imprimí archivos, escaneá documentos y hacé todas las fotocopias que necesités con esta impresora multifunción Epson, siempre lista para facilitar tu rutina de trabajo o estudio");
insert into productos (id,usuario_id,producto,descripcionProd)values(default,3,"Smart TV Sony","La cantidad de pixeles que ofrece es 4 veces mayor que la Full HD, ¿el resultado? Escenas mucho más realistas y con un nivel de detalle increíble. Ahora vas a conocer una aventura de inmersión que no va a dejar de sorprenderte");
insert into productos (id,usuario_id,producto,descripcionProd)values(default,1,"Smart TV Samsung","Con el Smart TV QN55Q65BAG vas a acceder a las aplicaciones en las que se encuentran tus contenidos favoritos. Además, podés navegar por Internet, interactuar en redes sociales y divertirte con videojuegos.");
insert into productos (id,usuario_id,producto,descripcionProd)values(default,1,"Barra de sonido Samsung","Mejorá tu experiencia auditiva con el subwoofer incluido con tu barra de sonido. Enfatiza los graves para obtener un sonido increíble que toca notas más profundas y suaves, brindando audio con calidad de cine con tu barra de sonido");
insert into productos (id,usuario_id,producto,descripcionProd)values(default,5,"Apple AirPods Max","Los AirPods Max reinventan los audífonos de diadema. El controlador dinámico diseñado por Apple te ofrece un sonido inmersivo de alta fidelidad");
insert into productos (id,usuario_id,producto,descripcionProd)values(default,2,"Bose Smart Speake","Al ser activo solo necesitarás conectarlo a la fuente de sonido y el mismo equipo se encargará de amplificar y reproducir: ganarás practicidad y espacio, ya que además requiere menos cableado que uno pasivo");
insert into productos (id,usuario_id,producto,descripcionProd)values(default,1,"Sony PLaystation 5","PlayStation renovó las expectativas del mundo virtual con esta nueva consola y su gran rendimiento. Cuenta con una interfaz de usuario más rápida y fácil de navegar que en anteriores modelos");
insert into productos (id,usuario_id,producto,descripcionProd)values(default,3,"Nikon D7500","El visor réflex permite obtener una perspectiva realista y tomar fotografías increíbles con resultados más exactos gracias a la posibilidad de intercambiar objetivos.");

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

insert into comentarios (id,post_id,usuario_id,comentario) values(default,1,1,"Muy buena computadora!");
insert into comentarios (id,post_id,usuario_id,comentario) values(default,2,1,"Aceptan yenes en efectivo?");
insert into comentarios (id,post_id,usuario_id,comentario) values(default,2,2,"Muy comoda de usar!");
insert into comentarios (id,post_id,usuario_id,comentario) values(default,1,3,"No me llego el producto, lo pague hace 2 meses");