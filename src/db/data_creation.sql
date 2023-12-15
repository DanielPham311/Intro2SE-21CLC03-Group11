use btqwfrkhhohfbtds6c9u;
-- password for each account is pass<id> , ex: pass1 for account_id = 1
INSERT INTO Account(username,password,create_date,role,email)
VALUES ('hoffmannicholas','e6c3da5b206634d7f3f3586d747ffdb36b5c675757b380c6a5fe5c570c714349','2023-12-11','user','michael16@example.com'),
('johncox','1ba3d16e9881959f8c9a9762854f72c6e6321cdd44358a10a4e939033117eab9','2023-12-11','admin','cookelizabeth@example.com'),
('williamselizabeth','3acb59306ef6e660cf832d1d34c4fba3d88d616f0bb5c2a9e0f82d18ef6fc167','2023-12-13','user','znguyen@example.com'),
('amy87','a417b5dc3d06d15d91c6687e27fc1705ebc56b3b2d813abe03066e5643fe4e74','2023-12-12','user','kimberly31@example.com'),
('nsmith','0eeac8171768d0cdef3a20fee6db4362d019c91e10662a6b55186336e1a42778','2023-12-12','user','vegabrooke@example.net'),
('stephentran','5c4950c94a3461441c356afa783f76b83b38fd65f730f291403efbcc798acc1f','2023-12-13','user','robert51@example.org'),
('dominique64','1526f5e0e31d42fe1c3664ce923ac22ac1333417a90b32043797ac454cd03112','2023-12-11','user','qhess@example.org'),
('cooleyshaun','c8fea5b0b76dc690feaf5544749f99b40e78e2a37c0e867a086696509416302a','2023-12-10','user','thomaswest@example.org'),
('garzaashley','2d4589473fb3f4581d7452cd25182159d68d2a50056a0cce35a529b010e32f2b','2023-12-11','user','haynesjoseph@example.net'),
('fescobar','b35892cb8b089e03e4420b94df688122a2b76d4ad0f8b94ad20808bb029e48a5','2023-12-11','user','jennifer43@example.org');


INSERT INTO Admin(admin_id,name)
VALUES (2,'Mary Nguyen');


INSERT INTO User(user_id,name,age,birthday,parental_mode)
VALUES (1,'Tamara Jackson',26,'1997-07-08',1),
(3,'Mr. Cody Gonzalez DDS',30,'1993-09-01',0),
(4,'Felicia Hudson',25,'1998-07-07',1),
(5,'Tiffany Jimenez',26,'1997-06-06',0),
(6,'Alexis Roberts',21,'2002-03-10',1),
(7,'Daniel Brooks',25,'1998-10-27',1),
(8,'Terri Graham',27,'1996-05-05',0),
(9,'Michelle Evans',20,'2003-03-17',0),
(10,'Anthony Davila',25,'1998-12-30',1);


INSERT INTO Subscription_plan (user_id,subscription_id,start_date,expired_date)
VALUES (1,2,'2023-12-13','2023-12-25'),
(3,3,'2023-12-13','2024-01-03'),
(4,1,null,null),
(5,1,null,null),
(6,2,'2023-12-13','2023-12-21'),
(7,2,'2023-12-13','2024-01-11'),
(8,3,'2023-12-13','2023-12-16'),
(9,1,null,null),
(10,2,'2023-12-13','2023-12-17');