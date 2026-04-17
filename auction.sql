CREATE TABLE IF NOT EXISTS User (
	uid varchar(5) PRIMARY KEY,
	address varchar(20),
	username varchar(20),
	password varchar(20),
);

CREATE TABLE IF NOT EXISTS Bid (
	bid_id varchar(5) PRIMARY KEY,
	uid varchar(5),
	iid varchar(5),
	price varchar(10),
	timestamp datetime,
	KEY uid (uid),
	KEY iid (iid)
);

CREATE TABLE IF NOT EXISTS Item (
	iid varchar(5) PRIMARY KEY,
	winner varchar(5) DEFAULT NULL,
	name varchar(20),
	end_time datetime
);

INSERT INTO User (uid, address, username, password) VALUES
('U0001','123 Maple St','alice','pass1'),
('U0002','456 Oak St','bob','pass2'),
('U0003','789 Pine St','carol','pass3'),
('U0004','321 Birch St','dave','pass4'),
('U0005','654 Cedar St','eve','pass5'),
('U0006','987 Walnut St','frank','pass6'),
('U0007','159 Cherry St','grace','pass7'),
('U0008','753 Elm St','heidi','pass8'),
('U0009','852 Spruce St','ivan','pass9'),
('U0010','951 Aspen St','judy','pass10'),
('U0011','147 Willow St','mallory','pass11'),
('U0012','258 Poplar St','niaj','pass12'),
('U0013','369 Fir St','oscar','pass13'),
('U0014','159 Palm St','peggy','pass14'),
('U0015','753 Redwood St','trent','pass15');

INSERT INTO Item (iid, winner, name, end_time) VALUES
('I0001', NULL, 'Laptop', '2026-05-01 12:00:00'),
('I0002', NULL, 'Phone', '2026-05-02 13:00:00'),
('I0003', NULL, 'Tablet', '2026-05-03 14:00:00'),
('I0004', NULL, 'Headphones', '2026-05-04 15:00:00'),
('I0005', NULL, 'Camera', '2026-05-05 16:00:00'),
('I0006', NULL, 'Watch', '2026-05-06 17:00:00'),
('I0007', NULL, 'Keyboard', '2026-05-07 18:00:00'),
('I0008', NULL, 'Monitor', '2026-05-08 19:00:00'),
('I0009', NULL, 'Mouse', '2026-05-09 20:00:00'),
('I0010', NULL, 'Speaker', '2026-05-10 21:00:00');

INSERT INTO Bid (bid_id, uid, iid, price, timestamp) VALUES
('B0001','U0001','I0001','500','2026-04-01 10:00:00'),
('B0002','U0002','I0001','550','2026-04-01 10:05:00'),
('B0003','U0003','I0002','200','2026-04-01 10:10:00'),
('B0004','U0004','I0002','250','2026-04-01 10:15:00'),
('B0005','U0005','I0003','300','2026-04-01 10:20:00'),
('B0006','U0006','I0003','350','2026-04-01 10:25:00'),
('B0007','U0007','I0004','100','2026-04-01 10:30:00'),
('B0008','U0008','I0004','120','2026-04-01 10:35:00'),
('B0009','U0009','I0005','600','2026-04-01 10:40:00'),
('B0010','U0010','I0005','650','2026-04-01 10:45:00'),
('B0011','U0011','I0006','150','2026-04-01 10:50:00'),
('B0012','U0012','I0006','180','2026-04-01 10:55:00'),
('B0013','U0013','I0007','80','2026-04-01 11:00:00'),
('B0014','U0014','I0007','90','2026-04-01 11:05:00'),
('B0015','U0015','I0008','220','2026-04-01 11:10:00'),
('B0016','U0001','I0008','250','2026-04-01 11:15:00'),
('B0017','U0002','I0009','40','2026-04-01 11:20:00'),
('B0018','U0003','I0009','50','2026-04-01 11:25:00'),
('B0019','U0004','I0010','120','2026-04-01 11:30:00'),
('B0020','U0005','I0010','140','2026-04-01 11:35:00'),
('B0021','U0006','I0001','600','2026-04-01 11:40:00'),
('B0022','U0007','I0002','275','2026-04-01 11:45:00'),
('B0023','U0008','I0003','375','2026-04-01 11:50:00'),
('B0024','U0009','I0004','130','2026-04-01 11:55:00'),
('B0025','U0010','I0005','700','2026-04-01 12:00:00');