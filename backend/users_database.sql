SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `users_db` (
  `ID` int(11) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

ALTER TABLE `users_db`
ADD PRIMARY KEY (`ID`);

ALTER TABLE `users_db`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;
