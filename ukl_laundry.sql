-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 13, 2022 at 02:11 AM
-- Server version: 10.1.29-MariaDB
-- PHP Version: 7.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ukl_laundry`
--

-- --------------------------------------------------------

--
-- Table structure for table `detail_transaksi`
--

CREATE TABLE `detail_transaksi` (
  `id_detail_transaksi` int(11) NOT NULL,
  `id_transaksi` int(11) NOT NULL,
  `id_paket` int(11) NOT NULL,
  `qty` double DEFAULT NULL,
  `keterangan` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `detail_transaksi`
--

INSERT INTO `detail_transaksi` (`id_detail_transaksi`, `id_transaksi`, `id_paket`, `qty`, `keterangan`, `createdAt`, `updatedAt`) VALUES
(3, 2, 1, 10, NULL, '2022-05-18 10:07:15', '2022-05-18 13:21:25'),
(4, 2, 5, 3, NULL, '2022-05-18 13:15:28', '2022-05-18 13:21:25'),
(5, 3, 3, 5, NULL, '2022-05-18 10:54:46', '2022-05-18 13:40:12'),
(6, 3, 4, 5, NULL, '2022-05-18 11:46:20', '2022-05-18 13:40:12'),
(7, 4, 1, 23, NULL, '2022-05-18 10:07:15', '2022-05-18 13:53:40'),
(8, 5, 1, 10, NULL, '2022-05-18 10:07:15', '2022-05-19 00:52:29'),
(9, 5, 5, 12, NULL, '2022-05-18 13:15:28', '2022-05-19 00:52:29'),
(10, 6, 1, 2, NULL, '2022-05-18 10:07:15', '2022-05-19 01:25:36'),
(11, 6, 2, 3, NULL, '2022-05-18 10:09:14', '2022-05-19 01:25:36'),
(12, 7, 5, 3, NULL, '2022-05-18 13:15:28', '2022-05-19 01:37:12'),
(13, 7, 2, 3, NULL, '2022-05-18 10:09:14', '2022-05-19 01:37:12'),
(14, 8, 1, 3, NULL, '2022-05-18 10:07:15', '2022-05-19 01:38:00');

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `id_member` int(11) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `alamat` text,
  `jenis_kelamin` enum('L','P') DEFAULT NULL,
  `tlp` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`id_member`, `nama`, `alamat`, `jenis_kelamin`, `tlp`, `createdAt`, `updatedAt`) VALUES
(1, 'Anastasha Thalia', 'Malang, Jatim', 'P', '087665743233', '2022-05-18 09:59:54', '2022-05-18 09:59:54'),
(2, 'Ellisha Violet', 'Malang, Jatim', 'P', '087665987332', '2022-05-18 10:01:11', '2022-05-18 10:01:11'),
(3, 'Zygra Salva Miona', 'Tulungagung, Jatim', 'P', '081334556789', '2022-05-19 00:48:56', '2022-05-19 19:30:14');

-- --------------------------------------------------------

--
-- Table structure for table `outlet`
--

CREATE TABLE `outlet` (
  `id_outlet` int(11) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `alamat` text,
  `tlp` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `outlet`
--

INSERT INTO `outlet` (`id_outlet`, `nama`, `alamat`, `tlp`, `createdAt`, `updatedAt`) VALUES
(1, 'Pelangi Laundry', 'Malang, Jatim', '081332211655', '2022-05-18 09:52:35', '2022-05-18 09:52:35'),
(2, 'Superjet  Laundry', 'Tulungagung', '081332465943', '2022-05-18 10:03:46', '2022-05-18 10:03:46'),
(3, 'Clean Laundry', 'Blitar, Jatim', '098776543', '2022-05-19 00:50:35', '2022-05-19 19:29:47');

-- --------------------------------------------------------

--
-- Table structure for table `paket`
--

CREATE TABLE `paket` (
  `id_paket` int(11) NOT NULL,
  `id_outlet` int(11) NOT NULL,
  `jenis` enum('kiloan','selimut','bed_cover','kaos','kain') DEFAULT NULL,
  `nama_paket` varchar(255) DEFAULT NULL,
  `harga` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `paket`
--

INSERT INTO `paket` (`id_paket`, `id_outlet`, `jenis`, `nama_paket`, `harga`, `image`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'kiloan', 'Kiloan SuperWash', 3000, 'img-1652868434876.jpg', '2022-05-18 10:07:15', '2022-05-18 13:20:15'),
(2, 1, 'selimut', 'Blanket SuperWash', 2000, 'img-1652879740871.jpg', '2022-05-18 10:09:14', '2022-05-18 13:20:29'),
(3, 2, 'kiloan', 'Kiloan Bamboo', 4000, 'img-1652871286736.jpg', '2022-05-18 10:54:46', '2022-05-18 10:54:46'),
(4, 2, 'selimut', 'Blanket Bamboo', 6000, 'img-1652879873780.jpg', '2022-05-18 11:46:20', '2022-05-18 13:17:53'),
(5, 1, 'bed_cover', 'Bed SuperWash', 10000, 'img-1652879728170.jpg', '2022-05-18 13:15:28', '2022-05-19 00:49:55'),
(6, 2, 'bed_cover', 'Bed Bamboo', 5000, 'img-1652879863881.jpg', '2022-05-18 13:17:43', '2022-05-18 13:17:43');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20220412035039-create-member.js'),
('20220412035250-create-outlet.js'),
('20220412035622-create-user.js'),
('20220412035943-create-paket.js'),
('20220412040830-create-transaksi.js'),
('20220412041020-create-detail-transaksi.js');

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `id_transaksi` int(11) NOT NULL,
  `id_outlet` int(11) NOT NULL,
  `kode_invoice` varchar(255) DEFAULT NULL,
  `id_member` int(11) NOT NULL,
  `tgl` datetime DEFAULT NULL,
  `batas_waktu` datetime DEFAULT NULL,
  `tgl_bayar` datetime DEFAULT NULL,
  `biaya_tambahan` int(11) DEFAULT NULL,
  `diskon` double DEFAULT NULL,
  `pajak` int(11) DEFAULT NULL,
  `status` enum('baru','proses','selesai','diambil') DEFAULT NULL,
  `dibayar` enum('dibayar','belum_bayar') DEFAULT NULL,
  `id_user` int(11) NOT NULL,
  `total` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transaksi`
--

INSERT INTO `transaksi` (`id_transaksi`, `id_outlet`, `kode_invoice`, `id_member`, `tgl`, `batas_waktu`, `tgl_bayar`, `biaya_tambahan`, `diskon`, `pajak`, `status`, `dibayar`, `id_user`, `total`, `createdAt`, `updatedAt`) VALUES
(2, 1, 'Cuci1652880085663', 1, '2022-05-18 00:00:00', '2022-05-21 13:21:25', '2022-05-18 00:00:00', 1800, 1800, 3600, 'diambil', 'dibayar', 1, 46800, '2022-05-18 13:21:25', '2022-05-18 13:33:17'),
(3, 2, 'Cuci1652881212422', 2, '2022-05-18 00:00:00', '2022-05-21 13:40:12', NULL, 2000, 2000, 4000, 'baru', 'belum_bayar', 4, 52000, '2022-05-18 13:40:12', '2022-05-18 13:40:12'),
(4, 1, 'Cuci1652882019799', 2, '2022-05-18 00:00:00', '2022-05-21 13:53:39', NULL, 2760, 2760, 5520, 'baru', 'belum_bayar', 1, 71760, '2022-05-18 13:53:39', '2022-05-18 13:53:39'),
(5, 1, 'Cuci1652921549293', 1, '2022-05-19 00:00:00', '2022-05-22 00:52:29', '2022-05-19 00:00:00', 6000, 6000, 12000, 'diambil', 'dibayar', 1, 156000, '2022-05-19 00:52:29', '2022-05-19 00:53:18'),
(6, 1, 'Cuci1652923534385', 3, '2022-05-19 00:00:00', '2022-05-22 01:25:34', NULL, 480, 480, 960, 'baru', 'belum_bayar', 1, 12480, '2022-05-19 01:25:34', '2022-05-19 01:25:34'),
(7, 1, 'Cuci1652924232330', 1, '2022-05-19 00:00:00', '2022-05-22 01:37:12', NULL, 1440, 1440, 2880, 'baru', 'belum_bayar', 1, 37440, '2022-05-19 01:37:12', '2022-05-19 01:37:12'),
(8, 1, 'Cuci1652924280143', 2, '2022-05-19 00:00:00', '2022-05-22 01:38:00', NULL, 360, 360, 720, 'baru', 'belum_bayar', 1, 9360, '2022-05-19 01:38:00', '2022-05-19 01:38:00');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` text,
  `id_outlet` int(11) NOT NULL,
  `role` enum('admin','kasir','owner') DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `nama`, `username`, `password`, `id_outlet`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'Neilsya Amstrani', 'adminNeilsya', '1a2e4e64fe3a91c1c906267a148878bc', 1, 'admin', '2022-05-18 09:55:00', '2022-05-18 09:55:00'),
(2, 'Lysa Fitriana', 'kasirLysa', 'f02bfab2effc10e35cdf3d9c8e9fe75b', 1, 'kasir', '2022-05-18 09:58:30', '2022-05-18 09:58:30'),
(3, 'Aghata Alice', 'ownerAghata', '9da0a14905fd32542d6f3a7d9e501263', 1, 'owner', '2022-05-18 10:50:17', '2022-05-18 10:50:17'),
(4, 'Adriana Alberta', 'adminAdriana', 'f1af89aacf912c851643449bbe57bca5', 2, 'admin', '2022-05-18 10:51:50', '2022-05-18 10:51:50'),
(5, 'Ultra Viany ', 'kasirUltra', '426cc41f444a1b63d06614a071bd65dd', 2, 'kasir', '2022-05-19 00:47:39', '2022-05-19 19:34:24');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  ADD PRIMARY KEY (`id_detail_transaksi`),
  ADD KEY `id_transaksi` (`id_transaksi`),
  ADD KEY `id_paket` (`id_paket`);

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`id_member`);

--
-- Indexes for table `outlet`
--
ALTER TABLE `outlet`
  ADD PRIMARY KEY (`id_outlet`);

--
-- Indexes for table `paket`
--
ALTER TABLE `paket`
  ADD PRIMARY KEY (`id_paket`),
  ADD KEY `id_outlet` (`id_outlet`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id_transaksi`),
  ADD KEY `id_outlet` (`id_outlet`),
  ADD KEY `id_member` (`id_member`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `id_outlet` (`id_outlet`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  MODIFY `id_detail_transaksi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `member`
--
ALTER TABLE `member`
  MODIFY `id_member` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `outlet`
--
ALTER TABLE `outlet`
  MODIFY `id_outlet` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `paket`
--
ALTER TABLE `paket`
  MODIFY `id_paket` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id_transaksi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  ADD CONSTRAINT `detail_transaksi_ibfk_1` FOREIGN KEY (`id_transaksi`) REFERENCES `transaksi` (`id_transaksi`),
  ADD CONSTRAINT `detail_transaksi_ibfk_2` FOREIGN KEY (`id_paket`) REFERENCES `paket` (`id_paket`);

--
-- Constraints for table `paket`
--
ALTER TABLE `paket`
  ADD CONSTRAINT `paket_ibfk_1` FOREIGN KEY (`id_outlet`) REFERENCES `outlet` (`id_outlet`);

--
-- Constraints for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `transaksi_ibfk_1` FOREIGN KEY (`id_outlet`) REFERENCES `outlet` (`id_outlet`),
  ADD CONSTRAINT `transaksi_ibfk_2` FOREIGN KEY (`id_member`) REFERENCES `member` (`id_member`),
  ADD CONSTRAINT `transaksi_ibfk_3` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`id_outlet`) REFERENCES `outlet` (`id_outlet`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
