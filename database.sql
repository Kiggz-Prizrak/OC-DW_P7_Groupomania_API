-- phpMyAdmin SQL Dump
-- version 5.2.0-rc1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : jeu. 09 juin 2022 à 14:41
-- Version du serveur : 10.5.15-MariaDB-0+deb11u1
-- Version de PHP : 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `Comments`
--

CREATE TABLE `Comments` (
  `id` int(11) NOT NULL,
  `content` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `media` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) DEFAULT NULL,
  `PostId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `Posts`
--

CREATE TABLE `Posts` (
  `id` int(11) NOT NULL,
  `content` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `media` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `Reactions`
--

CREATE TABLE `Reactions` (
  `id` int(11) NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) DEFAULT NULL,
  `PostId` int(11) DEFAULT NULL,
  `CommentId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `Reports`
--

CREATE TABLE `Reports` (
  `id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) DEFAULT NULL,
  `PostId` int(11) DEFAULT NULL,
  `CommentId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `Users`
--

CREATE TABLE `Users` (
  `id` int(11) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `Users`
--

INSERT INTO `Users` (`id`, `isAdmin`, `email`, `password`, `avatar`, `lastName`, `firstName`, `username`, `createdAt`, `updatedAt`) VALUES
(3, 1, 'admin@groupomania.fr', '$2b$10$4IER5Ut1PXdvThv7CqC25ezvLR37cMk3WuloCFIIJUi04pgxKTWym', 'http://localhost:3000/images/davidSarif.png1654105061392.png', 'Sarif', 'David', 'Administrateur', '2022-05-31 08:54:56', '2022-06-01 17:37:41'),
(8, 0, 'cage@example.fr', '$2b$10$rmlprsj0RwGe4C.5.jivYub8CN.PqV7ipxFaEi9ul98BETRX5UAW2', 'http://localhost:3000/images/Capture_d’écran_2022-04-01_110935.png1654703564445.png', 'Cage', 'Nicolas', 'NickCage', '2022-06-08 15:52:44', '2022-06-08 15:52:44'),
(9, 0, 'susan@example.fr', '$2b$10$RM7Xxu1/qpwYsb7dIY1GDeMGY8a9FSF2VDLGpbqfXENLpc8idumFu', 'http://localhost:3000/images/abernaty.png1654770685035.png', 'Abernathy ', 'Susan', 'Susa', '2022-06-09 10:31:25', '2022-06-09 10:31:25');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Comments`
--
ALTER TABLE `Comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`),
  ADD KEY `PostId` (`PostId`);

--
-- Index pour la table `Posts`
--
ALTER TABLE `Posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`);

--
-- Index pour la table `Reactions`
--
ALTER TABLE `Reactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`),
  ADD KEY `PostId` (`PostId`),
  ADD KEY `CommentId` (`CommentId`);

--
-- Index pour la table `Reports`
--
ALTER TABLE `Reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserId` (`UserId`),
  ADD KEY `PostId` (`PostId`),
  ADD KEY `CommentId` (`CommentId`);

--
-- Index pour la table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Comments`
--
ALTER TABLE `Comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `Posts`
--
ALTER TABLE `Posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `Reactions`
--
ALTER TABLE `Reactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `Reports`
--
ALTER TABLE `Reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Comments`
--
ALTER TABLE `Comments`
  ADD CONSTRAINT `Comments_ibfk_909` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Comments_ibfk_910` FOREIGN KEY (`PostId`) REFERENCES `Posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `Posts`
--
ALTER TABLE `Posts`
  ADD CONSTRAINT `Posts_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `Reactions`
--
ALTER TABLE `Reactions`
  ADD CONSTRAINT `Reactions_ibfk_1315` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Reactions_ibfk_1316` FOREIGN KEY (`PostId`) REFERENCES `Posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Reactions_ibfk_1317` FOREIGN KEY (`CommentId`) REFERENCES `Comments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `Reports`
--
ALTER TABLE `Reports`
  ADD CONSTRAINT `Reports_ibfk_1271` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Reports_ibfk_1272` FOREIGN KEY (`PostId`) REFERENCES `Posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Reports_ibfk_1273` FOREIGN KEY (`CommentId`) REFERENCES `Comments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
