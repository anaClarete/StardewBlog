CREATE DATABASE stardewblog;
USE stardewblog;

CREATE TABLE usuario(
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(50),
email VARCHAR(50),
senha VARCHAR(30)
);

CREATE TABLE salas(
idSala INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(50),
fkUsuario INT,
CONSTRAINT ctFKUsuario 
FOREIGN KEY(fkUsuario)
REFERENCES usuario(idUsuario)
);

CREATE TABLE pacotes (
idPacote INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(50),
fkSala INT,
CONSTRAINT ctFkSala
FOREIGN KEY(fkSala)
REFERENCES salas(idSala)
);

CREATE TABLE itens (
idItem INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(50),
fkPacote INT,
status TINYINT,
CONSTRAINT ctFkPacote
FOREIGN KEY (fkPacote) 
REFERENCES pacotes(idPacote)
);



