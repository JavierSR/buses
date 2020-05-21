/*
SQLyog Ultimate v13.1.1 (64 bit)
MySQL - 10.4.11-MariaDB : Database - buses
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`buses` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `buses`;

/*Table structure for table `historial` */

DROP TABLE IF EXISTS `historial`;

CREATE TABLE `historial` (
  `id_usuario` int(11) NOT NULL,
  `id_ruta` int(11) NOT NULL,
  `esFavorito` tinyint(4) DEFAULT 0,
  `visitado` tinyint(4) DEFAULT 0,
  PRIMARY KEY (`id_usuario`,`id_ruta`),
  KEY `id_ruta` (`id_ruta`),
  CONSTRAINT `historial_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `historial_ibfk_2` FOREIGN KEY (`id_ruta`) REFERENCES `rutas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `historial` */

/*Table structure for table `paraderos` */

DROP TABLE IF EXISTS `paraderos`;

CREATE TABLE `paraderos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `latitud` varchar(100) NOT NULL,
  `longitud` varchar(100) NOT NULL,
  `barrio` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `paraderos` */

/*Table structure for table `rutas` */

DROP TABLE IF EXISTS `rutas`;

CREATE TABLE `rutas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `recorrido` text DEFAULT NULL,
  `latitudInicio` varchar(100) NOT NULL,
  `latitutdFin` varchar(100) NOT NULL,
  `longitudInicio` varchar(100) NOT NULL,
  `longitudFin` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

/*Data for the table `rutas` */

insert  into `rutas`(`id`,`recorrido`,`latitudInicio`,`latitutdFin`,`longitudInicio`,`longitudFin`) values 
(1,'SUPERGAS - HOSPITAL','4.1630086','4.1448599','-73.6632501','-73.6436747'),
(2,'CHARRASCAL - HOSPITAL','4.085520','4.1448599','-73.657001','-73.6436747');

/*Table structure for table `usuarios` */

DROP TABLE IF EXISTS `usuarios`;

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombres` varchar(255) DEFAULT NULL,
  `apellidos` varchar(255) DEFAULT NULL,
  `correo` varchar(255) NOT NULL,
  `contrasena` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

/*Data for the table `usuarios` */

insert  into `usuarios`(`id`,`nombres`,`apellidos`,`correo`,`contrasena`) values 
(2,'Oscar','Sandoval','correo@ejemplo.com','202cb962ac59075b964b07152d234b70');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
