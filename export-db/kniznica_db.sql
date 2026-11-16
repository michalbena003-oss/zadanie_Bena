-- MySQL database export: kniznica_db
-- Generated locally from the configured MySQL connection.
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS=0;
CREATE DATABASE IF NOT EXISTS `kniznica_db`;
USE `kniznica_db`;

CREATE TABLE `knihy` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nazov` text NOT NULL,
  `autor` text NOT NULL,
  `rok` int(11) NOT NULL,
  `cena` decimal(10,2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `knihy` (`id`, `nazov`, `autor`, `rok`, `cena`) VALUES (1, 'Červená karkulka', 'Dobšinský', 1999, '17.52');
INSERT INTO `knihy` (`id`, `nazov`, `autor`, `rok`, `cena`) VALUES (3, 'ano', 'ja', 2004, '6.53');
INSERT INTO `knihy` (`id`, `nazov`, `autor`, `rok`, `cena`) VALUES (8, 'fewg', 'misko', 2004, '30.00');

SET FOREIGN_KEY_CHECKS=1;
