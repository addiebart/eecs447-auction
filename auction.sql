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