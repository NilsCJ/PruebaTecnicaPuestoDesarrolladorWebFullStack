-- --------------------------------------------------------
-- Host:                         localhost
-- Versión del servidor:         11.8.2-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para ecommercezetasteam
CREATE DATABASE IF NOT EXISTS `ecommercezetasteam` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `ecommercezetasteam`;

-- Volcando estructura para tabla ecommercezetasteam.products
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla ecommercezetasteam.products: ~12 rows (aproximadamente)
INSERT INTO `products` (`id`, `nombre`, `descripcion`, `precio`, `imagen`, `created_at`) VALUES
	(1, 'Cafe Saso', 'peso neto 300 gramos', 2500.00, '/uploads/1749836021086.jpeg', '2025-06-13 17:31:48'),
	(3, 'Aceite de soya', 'Marca capullo Contiene omega 3 y ', 4500.00, '/uploads/1749842147935.jpeg', '2025-06-13 19:15:47'),
	(4, 'Cafe Rey', 'El café de los ticos. Contenido Neto 250 gramos', 1850.00, '/uploads/1749842189560.jpeg', '2025-06-13 19:16:29'),
	(5, 'Atún auRoRa', 'Atún lomo de trocitos con aceite. 140g', 720.00, '/uploads/1749842231714.jpeg', '2025-06-13 19:17:11'),
	(6, 'Arroz Tio Pelon', 'Peso Neto 1.8 kilogramos, 99% grano entero ', 1860.00, '/uploads/1749842324123.png', '2025-06-13 19:18:44'),
	(7, 'frijoles tío pelón', 'Frijoles tío pelón primera calidad. 800g', 1690.00, '/uploads/1749842384570.jpeg', '2025-06-13 19:19:44'),
	(8, 'Azúcar Doña Maria', 'Azúcar blanca de plantación. 1kg', 820.00, '/uploads/1749842428352.png', '2025-06-13 19:20:28'),
	(9, 'Mantequilla Numar', 'Clásica margarina, sin colesterol. 500g', 1060.00, '/uploads/1749842528170.jpeg', '2025-06-13 19:22:08'),
	(11, 'Sal sol', 'Sal refinada. Contenido Neto 500 gramos', 580.00, '/uploads/1749842650672.png', '2025-06-13 19:24:10'),
	(12, 'Consomé Maggi', 'Consomé de res 4 unidades.10 g', 470.00, '/uploads/1749842693193.png', '2025-06-13 19:24:53'),
	(13, 'Manteca clover', 'Manteca 100% natural', 740.00, '/uploads/1749858619599.jpeg', '2025-06-13 23:49:51'),
	(14, 'Nacarina', 'Harina de trigo multiuso. 1000g', 1450.00, '/uploads/1749859061722.jpeg', '2025-06-13 23:57:41');

-- Volcando estructura para tabla ecommercezetasteam.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `rol` varchar(20) DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla ecommercezetasteam.users: ~6 rows (aproximadamente)
INSERT INTO `users` (`id`, `nombre`, `email`, `password`, `rol`) VALUES
	(1, 'Nils', 'admin@ejemplo.com', '$2b$10$GCi3W1sw5DD3Fpw7F9PBVu/7hG7BO7OvH/8oDuVDpgRG8DHhuYvxi', 'admin'),
	(2, 'alexander', 'alexander@gmail.com', '$2b$10$pcY29.tOIHM5UsvFlQwYtur0tscK57W7jNO/7ribT1sSdNF0hKlb6', 'user'),
	(3, 'Monica', 'monica@gmail.com', '$2b$10$YR0yklh3ygDNS4MA8xgVz.WlJv.bx54DV8Z9Q66x9ZxKxocEW66ye', 'user'),
	(4, 'Emily', 'emily@gmail.com', '$2b$10$gLDiCYEYigkKYbmrS/6peuI3UKTLIkUQJwX9lOuZUPjaIIIM7egw6', 'user'),
	(5, 'Cesar', 'cesar@gmail.com', '$2b$10$vEF2Ca86rZRtucAhEf2Mt.X8xDouObBJxSrxvsSLHFeS/kzcLG5MG', 'admin'),
	(6, 'Justin', 'justin@gmail.com', '$2b$10$0t8iy6SfkFdSLNLaBxHA/Ofp8xylkUIdeRjcdkazniVa1m9JfV1re', 'user');

-- Volcando estructura para tabla ecommercezetasteam.cart_items
CREATE TABLE IF NOT EXISTS `cart_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `cantidad` int(11) DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla ecommercezetasteam.cart_items: ~12 rows (aproximadamente)
INSERT INTO `cart_items` (`id`, `user_id`, `product_id`, `cantidad`) VALUES
	(8, 2, 4, 1),
	(10, 1, 1, 1),
	(11, 1, 3, 1),
	(12, 1, 4, 1),
	(13, 1, 5, 1),
	(14, 1, 6, 1),
	(15, 1, 7, 1),
	(16, 1, 8, 1),
	(17, 1, 11, 1),
	(18, 1, 9, 1),
	(19, 1, 14, 1),
	(20, 1, 13, 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
