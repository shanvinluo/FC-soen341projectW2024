-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Hôte : sql5.freemysqlhosting.net
-- Généré le :  mar. 27 fév. 2024 à 00:55
-- Version du serveur :  5.5.62-0ubuntu0.14.04.1
-- Version de PHP :  7.0.33-0ubuntu0.16.04.16

--DATABASE EXTRACTED FROM PHPMYADMIN

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `sql5686988`
--
CREATE DATABASE IF NOT EXISTS `sql5686988` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `sql5686988`;

-- --------------------------------------------------------

--
-- Structure de la table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
CREATE TABLE `reservation` (
  `reservation_id` int(11) NOT NULL,
  `date_start` date NOT NULL,
  `date_end` date NOT NULL,
  `username` varchar(50) NOT NULL,
  `vehicule_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `user_account`
--

DROP TABLE IF EXISTS `user_account`;
CREATE TABLE `user_account` (
  `username` varchar(50) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `vehicule`
--

DROP TABLE IF EXISTS `vehicule`;
CREATE TABLE `vehicule` (
  `vehicule_id` int(11) NOT NULL,
  `model_name` varchar(50) NOT NULL,
  `seats` int(11) NOT NULL,
  `features` varchar(150) NOT NULL,
  `make_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`reservation_id`),
  ADD KEY `username` (`username`),
  ADD KEY `vehicule_id` (`vehicule_id`);

--
-- Index pour la table `user_account`
--
ALTER TABLE `user_account`
  ADD PRIMARY KEY (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `vehicule`
--
ALTER TABLE `vehicule`
  ADD PRIMARY KEY (`vehicule_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `reservation`
--
ALTER TABLE `reservation`
  MODIFY `reservation_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `vehicule`
--
ALTER TABLE `vehicule`
  MODIFY `vehicule_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `reservation_ibfk_2` FOREIGN KEY (`vehicule_id`) REFERENCES `vehicule` (`vehicule_id`),
  ADD CONSTRAINT `reservation_ibfk_1` FOREIGN KEY (`username`) REFERENCES `user_account` (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
