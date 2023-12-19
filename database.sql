-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 19, 2023 at 03:42 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `recipe_db`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `FindRecipesByIngredients` (IN `ingredientIDs` VARCHAR(255))   BEGIN
    SET @query = CONCAT('
        SELECT
            r.recipe_id,
            r.title AS recipe_name,
            r.description,
            r.instructions,
            r.cook_time,
            r.servings,
            u.username AS recipe_by,
            rc.category_name AS recipe_category
        FROM
            recipes r
            LEFT JOIN users u ON r.user_id = u.user_id
            LEFT JOIN recipe_category rc ON r.recipe_category_id = rc.category_id
            LEFT JOIN req_ingredients ri ON r.recipe_id = ri.recipe_id
        WHERE
            ri.ingredient_id IN (', ingredientIDs, ')
        GROUP BY
            r.recipe_id
    ');
    PREPARE stmt FROM @query;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetComments` (IN `recipeID` INT)   BEGIN
    SELECT
        c.comment_id,
        c.comment_text,
        c.comment_date,
        u.username AS commented_by
    FROM
        comments c
        LEFT JOIN users u ON c.user_id = u.user_id
    WHERE
        c.recipe_id = recipeID;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetRecipesByIngredients` (IN `ingredient_ids` TEXT)   BEGIN
    DECLARE ingredientCount INT;
    DECLARE recipeCount INT;
    DECLARE recipe_id INT;
    DECLARE ingredient_id INT;
    DECLARE done INT DEFAULT FALSE;
    DECLARE cur1 CURSOR FOR SELECT DISTINCT ingredient_id FROM req_ingredients WHERE FIND_IN_SET(ingredient_id, ingredient_ids);
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    CREATE TEMPORARY TABLE temp_recipes AS SELECT DISTINCT recipe_id FROM req_ingredients WHERE FIND_IN_SET(ingredient_id, ingredient_ids);

    OPEN cur1;
    read_loop: LOOP
        FETCH cur1 INTO ingredient_id;
        IF done THEN
            LEAVE read_loop;
        END IF;
        SELECT COUNT(*) INTO ingredientCount FROM req_ingredients WHERE recipe_id IN (SELECT recipe_id FROM temp_recipes) AND FIND_IN_SET(ingredient_id, ingredient_ids);
        SELECT COUNT(*) INTO recipeCount FROM temp_recipes;

        IF ingredientCount = recipeCount THEN
            DELETE FROM temp_recipes WHERE recipe_id NOT IN (SELECT recipe_id FROM req_ingredients WHERE FIND_IN_SET(ingredient_id, ingredient_ids));
        END IF;
    END LOOP;
    CLOSE cur1;

    SELECT * FROM recipes WHERE recipe_id IN (SELECT recipe_id FROM temp_recipes);
    DROP TEMPORARY TABLE IF EXISTS temp_recipes;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `GetRequiredIngredients` (IN `recipeID` INT)   BEGIN
    SELECT
    		i.ingredient_id,
        ri.recipe_id,
        i.name AS ingredient_name,
        ri.quantity,
        ri.measurement_unit
    FROM
        req_ingredients ri
    JOIN
        ingredients i ON ri.ingredient_id = i.ingredient_id
    WHERE
        ri.recipe_id = recipeID;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `RecipeInfo` (IN `recipeID` INT)   BEGIN
    SELECT
        r.recipe_id AS recipe_id,
        r.title AS recipe_name,
        r.description AS description,
        r.instructions AS instructions,
        r.cook_time AS cook_time,
        r.servings AS servings,
        u.username AS recipe_by,
        rc.category_name AS recipe_category,
        COUNT(l.like_id) AS likes
    FROM
        recipes r
        LEFT JOIN users u ON r.user_id = u.user_id
        LEFT JOIN recipe_category rc ON r.recipe_category_id = rc.category_id
        LEFT JOIN likes l ON r.recipe_id = l.recipe_id
    WHERE
        r.recipe_id = recipeID
    GROUP BY
        r.recipe_id;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `recipe_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `comment_text` text DEFAULT NULL,
  `comment_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment_id`, `recipe_id`, `user_id`, `comment_text`, `comment_date`) VALUES
(1, 1, 2, 'I loved this soup!', '2023-11-22 18:15:30'),
(2, 1, 3, 'Great recipe, thanks!', '2023-11-22 18:15:30'),
(3, 3, 1, 'Spicy but delicious.', '2023-11-22 18:15:30');

-- --------------------------------------------------------

--
-- Table structure for table `ingredients`
--

CREATE TABLE `ingredients` (
  `ingredient_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `ingredients`
--

INSERT INTO `ingredients` (`ingredient_id`, `name`, `category_id`) VALUES
(1, 'Salt', 1),
(2, 'Pepper', 1),
(3, 'Tomato', 2),
(4, 'Onion', 2),
(5, 'Apple', 3),
(6, 'Banana', 3),
(7, 'Milk', 4),
(8, 'Chicken', 5);

-- --------------------------------------------------------

--
-- Table structure for table `ingredients_category`
--

CREATE TABLE `ingredients_category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `ingredients_category`
--

INSERT INTO `ingredients_category` (`category_id`, `category_name`) VALUES
(1, 'Spices'),
(2, 'Vegetables'),
(3, 'Fruits'),
(4, 'Dairy'),
(5, 'Meat');

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `like_id` int(11) NOT NULL,
  `recipe_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `liked_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`like_id`, `recipe_id`, `user_id`, `liked_date`) VALUES
(1, 1, 3, '2023-11-22 18:15:31'),
(2, 2, 1, '2023-11-22 18:15:31'),
(3, 3, 2, '2023-11-22 18:15:31');

-- --------------------------------------------------------

--
-- Table structure for table `recipes`
--

CREATE TABLE `recipes` (
  `recipe_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `instructions` text DEFAULT NULL,
  `cook_time` int(11) DEFAULT NULL,
  `servings` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `recipe_category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `recipes`
--

INSERT INTO `recipes` (`recipe_id`, `title`, `description`, `instructions`, `cook_time`, `servings`, `user_id`, `recipe_category_id`) VALUES
(1, 'Tomato Soup', 'A delicious soup made from tomatoes', '1. Boil tomatoes. 2. Blend them. 3. Add seasoning.', 20, 4, 1, 1),
(2, 'Banana Smoothie', 'A refreshing smoothie made from bananas', '1. Blend bananas. 2. Add milk. 3. Blend again.', 0, 2, 2, 2),
(3, 'Chicken Curry', 'Spicy chicken curry recipe', '1. Cook chicken. 2. Add spices. 3. Simmer.', 30, 6, 3, 3),
(4, 'Spaghetti Bolognese', 'Classic Italian pasta dish with rich meat sauce.', '1. Cook spaghetti according to package instructions. 2. Prepare Bolognese sauce by browning ground beef and simmering with tomatoes and herbs. 3. Serve sauce over cooked spaghetti.', 30, 4, 5, 3),
(5, 'Chicken Alfredo Pasta', 'Creamy Alfredo sauce with grilled chicken over fettuccine.', '1. Grill chicken until fully cooked. 2. Prepare Alfredo sauce with cream, butter, and Parmesan cheese. 3. Toss cooked fettuccine with Alfredo sauce and top with grilled chicken.', 25, 3, 5, 3),
(6, 'test recipe', 'test description', 'test instructions', 10, 2, 1, 1),
(7, 'test recipe', 'test description', 'test instructions', 10, 2, 1, 1),
(8, 'dsfdsa', 'dsaff', 'sdadfds', 12, 5, 1, 3),
(9, 'dsfdsa', 'dsaff', 'sdadfds', 12, 5, 1, 3),
(10, 'dsfdsa', 'dsaff', 'sdadfds', 12, 5, 1, 3),
(11, 'gyjff', '.hk,j', 'jkh', 4, 4, 1, 2),
(12, 'pannerxcvbnm', 'cvbnm', 'dfghfghjwxecrvtbynhmjusdfghjcdfvghhvrc', 69, 5, 1, 2),
(13, 'aksbkjf', 'fhkjhjdhfjhgkj\nskjjdhkjh\n', 'lfjvjdhfkh', 87, 78, 1, 1),
(14, 'dfs', 'sadfsdf', 'fdsfa\nsadfj \nsadf s\n safs\n fsdf ', 10, 4, 1, 1);

-- --------------------------------------------------------

--
-- Stand-in structure for view `recipeslist`
-- (See below for the actual view)
--
CREATE TABLE `recipeslist` (
`recipe_id` int(11)
,`recipe_name` varchar(100)
,`description` text
,`user_id` int(11)
,`recipe_by` varchar(50)
,`recipe_category` varchar(50)
,`cook_time` int(11)
,`likes` bigint(21)
);

-- --------------------------------------------------------

--
-- Table structure for table `recipe_category`
--

CREATE TABLE `recipe_category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `recipe_category`
--

INSERT INTO `recipe_category` (`category_id`, `category_name`) VALUES
(1, 'Soup'),
(2, 'Beverage'),
(3, 'Main Course');

-- --------------------------------------------------------

--
-- Table structure for table `req_ingredients`
--

CREATE TABLE `req_ingredients` (
  `req_ingredient_id` int(11) NOT NULL,
  `recipe_id` int(11) DEFAULT NULL,
  `ingredient_id` int(11) DEFAULT NULL,
  `quantity` decimal(10,2) DEFAULT NULL,
  `measurement_unit` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `req_ingredients`
--

INSERT INTO `req_ingredients` (`req_ingredient_id`, `recipe_id`, `ingredient_id`, `quantity`, `measurement_unit`) VALUES
(1, 1, 3, 4.00, 'units'),
(2, 1, 1, 1.00, 'teaspoon'),
(3, 1, 2, 1.00, 'teaspoon'),
(4, 2, 6, 2.00, 'units'),
(5, 2, 7, 1.00, 'cup'),
(6, 3, 8, 500.00, 'grams'),
(7, 6, 1, 1.00, 'cup'),
(8, 6, 2, 2.00, 'cup'),
(9, 7, 1, 1.00, 'cup'),
(10, 7, 2, 2.00, 'cup'),
(11, 11, 8, 4.00, 'cup'),
(12, 11, 6, 7.00, 'cup'),
(13, 12, 7, 7.00, 'grams'),
(14, 13, 4, 7.00, 'cup'),
(15, 13, 7, 8.00, 'cup'),
(16, 14, 1, 5.00, 'cup'),
(17, 14, 5, 6.00, 'units'),
(18, 14, 8, 500.00, 'grams');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `users`
--

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
(11, 'keval', 'keval@gmail.com', 'keval123');

-- --------------------------------------------------------

--
-- Structure for view `recipeslist`
--
DROP TABLE IF EXISTS `recipeslist`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `recipeslist`  AS SELECT `r`.`recipe_id` AS `recipe_id`, `r`.`title` AS `recipe_name`, `r`.`description` AS `description`, `r`.`user_id` AS `user_id`, `u`.`username` AS `recipe_by`, `rc`.`category_name` AS `recipe_category`, `r`.`cook_time` AS `cook_time`, count(`l`.`like_id`) AS `likes` FROM (((`recipes` `r` left join `users` `u` on(`r`.`user_id` = `u`.`user_id`)) left join `recipe_category` `rc` on(`r`.`recipe_category_id` = `rc`.`category_id`)) left join `likes` `l` on(`r`.`recipe_id` = `l`.`recipe_id`)) GROUP BY `r`.`recipe_id` ORDER BY count(`l`.`like_id`) DESC ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `recipe_id` (`recipe_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `ingredients`
--
ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`ingredient_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `ingredients_category`
--
ALTER TABLE `ingredients_category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`like_id`),
  ADD KEY `recipe_id` (`recipe_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `recipes`
--
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`recipe_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `recipe_category_id` (`recipe_category_id`);

--
-- Indexes for table `recipe_category`
--
ALTER TABLE `recipe_category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `req_ingredients`
--
ALTER TABLE `req_ingredients`
  ADD PRIMARY KEY (`req_ingredient_id`),
  ADD KEY `recipe_id` (`recipe_id`),
  ADD KEY `ingredient_id` (`ingredient_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `ingredient_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `ingredients_category`
--
ALTER TABLE `ingredients_category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `like_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `recipes`
--
ALTER TABLE `recipes`
  MODIFY `recipe_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `recipe_category`
--
ALTER TABLE `recipe_category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `req_ingredients`
--
ALTER TABLE `req_ingredients`
  MODIFY `req_ingredient_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `ingredients`
--
ALTER TABLE `ingredients`
  ADD CONSTRAINT `ingredients_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `ingredients_category` (`category_id`) ON DELETE CASCADE;

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `recipes`
--
ALTER TABLE `recipes`
  ADD CONSTRAINT `recipe_category_id` FOREIGN KEY (`recipe_category_id`) REFERENCES `recipe_category` (`category_id`),
  ADD CONSTRAINT `recipes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `req_ingredients`
--
ALTER TABLE `req_ingredients`
  ADD CONSTRAINT `req_ingredients_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `req_ingredients_ibfk_2` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`ingredient_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
