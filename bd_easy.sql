-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 22 mars 2025 à 17:32
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `bd_easy`
--

-- --------------------------------------------------------

--
-- Structure de la table `administrateur`
--

CREATE TABLE `administrateur` (
  `id_user` int(11) NOT NULL,
  `Nom` varchar(255) DEFAULT NULL,
  `Prenom` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `administrateur`
--

INSERT INTO `administrateur` (`id_user`, `Nom`, `Prenom`, `Email`, `password`) VALUES
(0, 'albert', 'albert', NULL, 'albert');

-- --------------------------------------------------------

--
-- Structure de la table `autoecole`
--

CREATE TABLE `autoecole` (
  `ID_Auto_ecole` int(11) NOT NULL,
  `Nom` varchar(255) DEFAULT NULL,
  `Ville` varchar(255) DEFAULT NULL,
  `Email_de_contact` varchar(255) DEFAULT NULL,
  `Lien_site_web` varchar(255) DEFAULT NULL,
  `Description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `avis`
--

CREATE TABLE `avis` (
  `ID_Avis` int(11) NOT NULL,
  `Contenu` text DEFAULT NULL,
  `Date_Depot` date DEFAULT NULL,
  `Date_Publication` date DEFAULT NULL,
  `Note` int(11) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `ID_Formation` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `eleves`
--

CREATE TABLE `eleves` (
  `id_user` int(11) NOT NULL,
  `Nom` varchar(255) DEFAULT NULL,
  `Prenom` varchar(255) DEFAULT NULL,
  `Date_Naissance` date DEFAULT NULL,
  `Ville` varchar(255) DEFAULT NULL,
  `Date_Inscription` date DEFAULT NULL,
  `NPEH` int(11) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `ID_Auto_ecole` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `eleves`
--

INSERT INTO `eleves` (`id_user`, `Nom`, `Prenom`, `Date_Naissance`, `Ville`, `Date_Inscription`, `NPEH`, `Email`, `password`, `ID_Auto_ecole`) VALUES
(0, 'dubois', 'alice', '2005-03-05', 'Meaux', NULL, NULL, NULL, 'alice', NULL),
(1, 'dubois', 'alice', '2005-03-05', 'Meaux', NULL, NULL, NULL, 'alice', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `formation`
--

CREATE TABLE `formation` (
  `ID_Formation` int(11) NOT NULL,
  `Nom` varchar(255) DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `Duree` int(11) DEFAULT NULL,
  `Prix` int(11) DEFAULT NULL,
  `Type` varchar(255) DEFAULT NULL,
  `Categorie` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `simulation`
--

CREATE TABLE `simulation` (
  `ID_Simulation` int(11) NOT NULL,
  `Date` date DEFAULT NULL,
  `Lieu` varchar(255) DEFAULT NULL,
  `Resultat` varchar(255) DEFAULT NULL,
  `ID_Formation` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `test`
--

CREATE TABLE `test` (
  `ID_Test` int(11) NOT NULL,
  `Date` date DEFAULT NULL,
  `Score` int(11) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `administrateur`
--
ALTER TABLE `administrateur`
  ADD PRIMARY KEY (`id_user`);

--
-- Index pour la table `autoecole`
--
ALTER TABLE `autoecole`
  ADD PRIMARY KEY (`ID_Auto_ecole`);

--
-- Index pour la table `avis`
--
ALTER TABLE `avis`
  ADD PRIMARY KEY (`ID_Avis`),
  ADD KEY `ID_Eleve` (`id_user`),
  ADD KEY `ID_Formation` (`ID_Formation`);

--
-- Index pour la table `eleves`
--
ALTER TABLE `eleves`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `ID_Auto_ecole` (`ID_Auto_ecole`);

--
-- Index pour la table `formation`
--
ALTER TABLE `formation`
  ADD PRIMARY KEY (`ID_Formation`);

--
-- Index pour la table `simulation`
--
ALTER TABLE `simulation`
  ADD PRIMARY KEY (`ID_Simulation`),
  ADD KEY `ID_Formation` (`ID_Formation`);

--
-- Index pour la table `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`ID_Test`),
  ADD KEY `ID_Eleve` (`id_user`);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `avis`
--
ALTER TABLE `avis`
  ADD CONSTRAINT `avis_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `eleves` (`id_user`),
  ADD CONSTRAINT `avis_ibfk_2` FOREIGN KEY (`ID_Formation`) REFERENCES `formation` (`ID_Formation`);

--
-- Contraintes pour la table `eleves`
--
ALTER TABLE `eleves`
  ADD CONSTRAINT `eleves_ibfk_1` FOREIGN KEY (`ID_Auto_ecole`) REFERENCES `autoecole` (`ID_Auto_ecole`);

--
-- Contraintes pour la table `simulation`
--
ALTER TABLE `simulation`
  ADD CONSTRAINT `simulation_ibfk_1` FOREIGN KEY (`ID_Formation`) REFERENCES `formation` (`ID_Formation`);

--
-- Contraintes pour la table `test`
--
ALTER TABLE `test`
  ADD CONSTRAINT `test_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `eleves` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
