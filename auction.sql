CREATE TABLE IF NOT EXISTS users (
  uid integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  address varchar(50) NOT NULL,
  username varchar(20) NOT NULL,
  password varchar(20) NOT NULL -- You're crazy if you think im hashing passwords for this project.
);

CREATE TABLE IF NOT EXISTS item (
  iid integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  winner integer REFERENCES users(uid) ON DELETE SET NULL ON UPDATE CASCADE,
  name varchar(100) NOT NULL,
  end_time timestamp NOT NULL,
  sold boolean NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS bid (
  bid_id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  uid integer REFERENCES users(uid) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
  iid integer REFERENCES item(iid) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
  price integer NOT NULL CHECK (price >= 0),
  bid_timestamp timestamp NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_bid_uid ON bid(uid);
CREATE INDEX IF NOT EXISTS idx_bid_iid ON bid(iid);

INSERT INTO users (address, username, password) VALUES
('123 Maple St','alice','pass1'),
('456 Oak St','bob','pass2'),
('789 Pine St','carol','pass3'),
('321 Birch St','dave','pass4'),
('654 Cedar St','eve','pass5'),
('987 Walnut St','frank','pass6'),
('159 Cherry St','grace','pass7'),
('753 Elm St','heidi','pass8'),
('852 Spruce St','ivan','pass9'),
('951 Aspen St','judy','pass10'),
('147 Willow St','mallory','pass11'),
('258 Poplar St','niaj','pass12'),
('369 Fir St','oscar','pass13'),
('159 Palm St','peggy','pass14'),
('753 Redwood St','trent','pass15');

INSERT INTO item (winner, name, end_time) VALUES
(NULL, 'Laptop', '2026-05-01 12:00:00'),
(NULL, 'Phone', '2026-05-02 13:00:00'),
(NULL, 'Tablet', '2026-05-03 14:00:00'),
(NULL, 'Headphones', '2026-05-04 15:00:00'),
(NULL, 'Camera', '2026-05-05 16:00:00'),
(NULL, 'Watch', '2026-05-06 17:00:00'),
(NULL, 'Keyboard', '2026-05-07 18:00:00'),
(NULL, 'Monitor', '2026-05-08 19:00:00'),
(NULL, 'Mouse', '2026-05-09 20:00:00'),
(NULL, 'Speaker', '2026-05-10 21:00:00');

INSERT INTO bid (uid, iid, price, bid_timestamp) VALUES
(1,1,500,'2026-04-01 10:00:00'),
(2,1,550,'2026-04-01 10:05:00'),
(3,2,200,'2026-04-01 10:10:00'),
(4,2,250,'2026-04-01 10:15:00'),
(5,3,300,'2026-04-01 10:20:00'),
(6,3,350,'2026-04-01 10:25:00'),
(7,4,100,'2026-04-01 10:30:00'),
(8,4,120,'2026-04-01 10:35:00'),
(9,5,600,'2026-04-01 10:40:00'),
(10,5,650,'2026-04-01 10:45:00'),
(11,6,150,'2026-04-01 10:50:00'),
(12,6,180,'2026-04-01 10:55:00'),
(13,7,80,'2026-04-01 11:00:00'),
(14,7,90,'2026-04-01 11:05:00'),
(15,8,220,'2026-04-01 11:10:00'),
(1,8,250,'2026-04-01 11:15:00'),
(2,9,40,'2026-04-01 11:20:00'),
(3,9,50,'2026-04-01 11:25:00'),
(4,10,120,'2026-04-01 11:30:00'),
(5,10,140,'2026-04-01 11:35:00'),
(6,1,600,'2026-04-01 11:40:00'),
(7,2,275,'2026-04-01 11:45:00'),
(8,3,375,'2026-04-01 11:50:00'),
(9,4,130,'2026-04-01 11:55:00'),
(10,5,700,'2026-04-01 12:00:00');