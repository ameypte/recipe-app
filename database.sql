-- --------------------------------------------------------
-- Host:                         sql12.freesqldatabase.com
-- Server version:               5.5.62-0ubuntu0.14.04.1 - (Ubuntu)
-- Server OS:                    debian-linux-gnu
-- HeidiSQL Version:             12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table sql12664295.comments
CREATE TABLE IF NOT EXISTS `comments` (
  `comment_id` int(11) NOT NULL AUTO_INCREMENT,
  `recipe_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `comment_text` text,
  `comment_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`),
  KEY `recipe_id` (`recipe_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`) ON DELETE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Dumping data for table sql12664295.comments: ~3 rows (approximately)
DELETE FROM `comments`;
INSERT INTO `comments` (`comment_id`, `recipe_id`, `user_id`, `comment_text`, `comment_date`) VALUES
	(1, 1, 2, 'I loved this soup!', '2023-11-22 18:15:30'),
	(2, 1, 3, 'Great recipe, thanks!', '2023-11-22 18:15:30'),
	(3, 3, 1, 'Spicy but delicious.', '2023-11-22 18:15:30');

-- Dumping structure for table sql12664295.ingredients
CREATE TABLE IF NOT EXISTS `ingredients` (
  `ingredient_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`ingredient_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `ingredients_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `ingredients_category` (`category_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

-- Dumping data for table sql12664295.ingredients: ~8 rows (approximately)
DELETE FROM `ingredients`;
INSERT INTO `ingredients` (`ingredient_id`, `name`, `category_id`) VALUES
	(1, 'Salt', 1),
	(2, 'Pepper', 1),
	(3, 'Tomato', 2),
	(4, 'Onion', 2),
	(5, 'Apple', 3),
	(6, 'Banana', 3),
	(7, 'Milk', 4),
	(8, 'Chicken', 5);

-- Dumping structure for table sql12664295.ingredients_category
CREATE TABLE IF NOT EXISTS `ingredients_category` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(50) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Dumping data for table sql12664295.ingredients_category: ~5 rows (approximately)
DELETE FROM `ingredients_category`;
INSERT INTO `ingredients_category` (`category_id`, `category_name`) VALUES
	(1, 'Spices'),
	(2, 'Vegetables'),
	(3, 'Fruits'),
	(4, 'Dairy'),
	(5, 'Meat');

-- Dumping structure for table sql12664295.likes
CREATE TABLE IF NOT EXISTS `likes` (
  `like_id` int(11) NOT NULL AUTO_INCREMENT,
  `recipe_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `liked_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`like_id`),
  KEY `recipe_id` (`recipe_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`) ON DELETE CASCADE,
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Dumping data for table sql12664295.likes: ~3 rows (approximately)
DELETE FROM `likes`;
INSERT INTO `likes` (`like_id`, `recipe_id`, `user_id`, `liked_date`) VALUES
	(1, 1, 3, '2023-11-22 10:15:31'),
	(2, 2, 1, '2023-11-22 10:15:31'),
	(3, 3, 2, '2023-11-22 10:15:31');

-- Dumping structure for table sql12664295.recipes
CREATE TABLE IF NOT EXISTS `recipes` (
  `recipe_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `description` text,
  `instructions` text,
  `prep_time` int(11) DEFAULT NULL,
  `cook_time` int(11) DEFAULT NULL,
  `total_time` int(11) DEFAULT NULL,
  `servings` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`recipe_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `recipes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Dumping data for table sql12664295.recipes: ~5 rows (approximately)
DELETE FROM `recipes`;
INSERT INTO `recipes` (`recipe_id`, `title`, `description`, `instructions`, `prep_time`, `cook_time`, `total_time`, `servings`, `user_id`) VALUES
	(1, 'Tomato Soup', 'A delicious soup made from tomatoes', '1. Boil tomatoes. 2. Blend them. 3. Add seasoning.', 10, 20, 30, 4, 1),
	(2, 'Banana Smoothie', 'A refreshing smoothie made from bananas', '1. Blend bananas. 2. Add milk. 3. Blend again.', 5, 0, 5, 2, 2),
	(3, 'Chicken Curry', 'Spicy chicken curry recipe', '1. Cook chicken. 2. Add spices. 3. Simmer.', 15, 30, 45, 6, 3),
	(4, 'Spaghetti Bolognese', 'Classic Italian pasta dish with rich meat sauce.', '1. Cook spaghetti according to package instructions. 2. Prepare Bolognese sauce by browning ground beef and simmering with tomatoes and herbs. 3. Serve sauce over cooked spaghetti.', 15, 30, 45, 4, 5),
	(5, 'Chicken Alfredo Pasta', 'Creamy Alfredo sauce with grilled chicken over fettuccine.', '1. Grill chicken until fully cooked. 2. Prepare Alfredo sauce with cream, butter, and Parmesan cheese. 3. Toss cooked fettuccine with Alfredo sauce and top with grilled chicken.', 20, 25, 45, 3, 5);

-- Dumping structure for table sql12664295.recipe_category
CREATE TABLE IF NOT EXISTS `recipe_category` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(50) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Dumping data for table sql12664295.recipe_category: ~3 rows (approximately)
DELETE FROM `recipe_category`;
INSERT INTO `recipe_category` (`category_id`, `category_name`) VALUES
	(1, 'Soup'),
	(2, 'Beverage'),
	(3, 'Main Course');

-- Dumping structure for table sql12664295.req_ingredients
CREATE TABLE IF NOT EXISTS `req_ingredients` (
  `req_ingredient_id` int(11) NOT NULL AUTO_INCREMENT,
  `recipe_id` int(11) DEFAULT NULL,
  `ingredient_id` int(11) DEFAULT NULL,
  `quantity` decimal(10,2) DEFAULT NULL,
  `measurement_unit` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`req_ingredient_id`),
  KEY `recipe_id` (`recipe_id`),
  KEY `ingredient_id` (`ingredient_id`),
  CONSTRAINT `req_ingredients_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`) ON DELETE CASCADE,
  CONSTRAINT `req_ingredients_ibfk_2` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`ingredient_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- Dumping data for table sql12664295.req_ingredients: ~6 rows (approximately)
DELETE FROM `req_ingredients`;
INSERT INTO `req_ingredients` (`req_ingredient_id`, `recipe_id`, `ingredient_id`, `quantity`, `measurement_unit`) VALUES
	(1, 1, 3, 4.00, 'units'),
	(2, 1, 1, 1.00, 'teaspoon'),
	(3, 1, 2, 1.00, 'teaspoon'),
	(4, 2, 6, 2.00, 'units'),
	(5, 2, 7, 1.00, 'cup'),
	(6, 3, 8, 500.00, 'grams');

-- Dumping structure for table sql12664295.users
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

-- Dumping data for table sql12664295.users: ~22 rows (approximately)
DELETE FROM `users`;
INSERT INTO `users` (`user_id`, `username`, `email`, `password`) VALUES
	(1, 'user', 'user', 'user'),
	(2, 'user2', 'user2@example.com', 'hashed_password_2'),
	(3, 'user3', 'user3@example.com', 'hashed_password_3'),
	(4, 'Bhaveshxop', 'bhaveshxop@gmail.com', '4706'),
	(5, 'Amey', 'ameypathe@gmail.com', 'amey123'),
	(6, 'DEN22171185', 'sonamalai12@gmail.com', 'W6n@4Kfp5qEhp5m'),
	(7, 'asdsad', 'sdfdsf', 'sdfsdf'),
	(8, 'asdsad', 'sdfdsf@dsfd.com', 'sdfsdf'),
	(9, 'ffssdf', 'fesfg@gdfg.c', 'ddfsdfd'),
	(10, 'Heramb the pro', 'fesfg@gdfg.c', 'W6n@4Kfp5qEhp5m'),
	(11, 'keval', 'keval@gmail.com', 'keval123'),
	(12, '', '', '123'),
	(13, '', '', '123'),
	(14, '', '', ''),
	(15, '', '', ''),
	(16, '', '', ''),
	(17, 'fniesbf', '', ''),
	(18, 'fniesbf', '', ''),
	(19, 'wfbu', '', ''),
	(20, '', '', ''),
	(21, '', '', ''),
	(22, '', '', '');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
