use btqwfrkhhohfbtds6c9u;

create table `Account`
(
	account_id int auto_increment,
    username varchar(255) unique,
    `password` char(64) not null,
    create_date date,
    `role` varchar(5) ,
    email varchar(255) unique,
    
    constraint PK_account primary key (account_id),
    constraint Account_role
    check (`role` = 'admin' or `role` = 'user' or `role` = 'staff')
);

create table `Admin`
(
	account_id int,
	`name` varchar(255) character set utf8mb4,
    
    constraint PK_account primary key (account_id),
    constraint FK_Account_Admin
    foreign key (account_id)
    references `Account`(account_id)
);

create table `User`
(
	account_id int,
	`name` varchar(255) character set utf8mb4,
    age int,
    birthday date,
    parental_mode int,
    plan_id int not null,
    
    constraint PK_account_user
    primary key (account_id),
    
    constraint FK_account_user
    foreign key (account_id)
    references Account(account_id),
    
    constraint user_age
    check (age >= 0),
    
    constraint user_parentalMode
    check (parental_mode = 0 or parental_mode = 1)
);

create table Subcription
(
	subcription_id int auto_increment,
    subcription_name varchar(10) unique,
    price_per_month decimal(10,2),
    resolution_cap int,
    
    constraint PK_subcription 
    primary key (subcription_id),
    
    constraint Subcription_name
    check (subcription_name = 'Free' or subcription_name = 'Premium' or subcription_name = 'Signature'),
    
    constraint resolution_cap
    check (resolution_cap = 720 or resolution_cap = 1080 or resolution_cap = 1440)
);

create table Subcription_plan
(
	plan_id int auto_increment,
    start_date date,
    expired_date date,
    subcription_id int,
    
    constraint PK_subcription_plan 
    primary key(plan_id),
    
    constraint FK_subcription_plan 
    foreign key (subcription_id) 
    references Subcription(subcription_id)
);

alter table `User`
add constraint FK_User_subcription_plan
	foreign key (plan_id)
    references Subcription_plan(plan_id);

create table credit_card
(
	card_id int auto_increment,
    card_number char(16) unique,
    cvv char(3),
    valid_thru date,
    user_id int,
    
    constraint PK_credit
    primary key (card_id),
    
    constraint FK_credit_user
    foreign key (user_id)
    references `User`(account_id)
);

create table Bill
(
	bill_id int auto_increment,
    content varchar(255),
    amount decimal(10,2),
    create_date date,
    user_id int,
    
    constraint PK_bill
    primary key (bill_id),
    
    constraint FK_bill_user
    foreign key (user_id)
    references `User`(account_id)
);

create table Movie
(
	movie_id int auto_increment,
    title varchar(255) character set utf8mb4,
    release_date date,
    rating int,
    overview varchar(255) character set utf8mb4,
    length int,
    country varchar(255) character set utf8mb4,
    director_id int,
    
    constraint PK_Movie
    primary key(movie_id)
);

create table Actor
(
	actor_id int auto_increment,
    `name` varchar(255) character set utf8mb4,
    birthday date,
    nationality varchar(100) character set utf8mb4,
    age int,
    
    constraint PK_Actor
    primary key (actor_id),
    
    constraint Actor_age
    check (age >= 0)
);

alter table Movie
add constraint FK_movie_director
	foreign key (director_id)
    references Actor(actor_id);
    
create table Actor_Movie
(
	actor int,
    movie int,
	role_name varchar(100) character set utf8mb4,
    
    constraint PK_actor_movie
    primary key(actor, movie),
    
    constraint FK_actor_movie
    foreign key (actor) references Actor(actor_id),
    
    constraint FK_movie_actor
    foreign key (movie) references Movie(movie_id)
);
    
create table Award
(
	award_id int auto_increment,
    award_name varchar(255) character set utf8mb4,
    
    constraint PK_award
    primary key (award_id)
);

create table Award_Movie
(
	award_id int ,
    movie_id int,
    award_date date,
    
    constraint PK_award_movie
    primary key (award_id, movie_id),
    
    constraint FK_award
    foreign key (award_id) references Award(award_id),
    
    constraint FK_movie
    foreign key (movie_id) references Movie(movie_id)
);

create table Genre
(
	genre_id int auto_increment,
    genre_name varchar(100) character set utf8mb4,
    
    constraint PK_genre
    primary key (genre_id)
);

create table Genre_Movie
(
	genre int,
    movie int,
    
    constraint PK_genre_movie
    primary key (genre, movie),
    
    constraint FK_genre_movie
    foreign key (genre) references Genre(genre_id),
    
    constraint FK_movie_genre
    foreign key (movie) references Movie(movie_id)
);

create table Image_actor
(
	image_id int auto_increment,
    image_link varchar(255),
    actor int not null,
    
    constraint PK_image_actor
    primary key (image_id),
    
    constraint FK_image_actor
    foreign key (actor) references Actor(actor_id)
);

create table MoviePoster
(
	movie int,
    poster_link1 varchar(255),
    poster_link2 varchar(255),
    trailer_link varchar(255),
    
    constraint PK_MoviePoster primary key(movie),
    constraint FK_MoviePoster
    foreign key (movie) references Movie(movie_id)
);

create table `Comment`
(
	`user` int,
    movie int,
    time_stamp timestamp,
    content varchar(255) character set utf8mb4,
    
    constraint PK_comment
    primary key (`user`, movie, time_stamp),
    
    constraint FK_comment_user
    foreign key (`user`) references `User`(account_id),
    
    constraint FK_comment_movie
    foreign key (movie) references Movie(movie_id)
);

create table WatchList
(
	`user` int,
    movie int,
    order_number int,
    constraint PK_WatchList
    primary key (`user`, movie, order_number),
    
    constraint FK_watch_user
    foreign key (`user`) references `User`(account_id),
    
    constraint FK_watch_movie
    foreign key (movie) references Movie(movie_id)
);

create table WatchHistory
(
	`user` int,
    movie int,
    time_stamp timestamp,
    constraint PK_History
    primary key (`user`, movie, time_stamp),
    
    constraint FK_history_user
    foreign key (`user`) references `User`(account_id),
    
    constraint FK_history_movie
    foreign key (movie) references Movie(movie_id)
);

-- Speed enhancement
CREATE INDEX idx_Account
ON `Account` (username, `password`);

-- more will come but I dont know which

-- Init solid data
insert into Subcription(subcription_name, price_per_month, resolution_cap)
values ('Free',108000.00,720),
		('Premium', 220000.00, 1080),
        ('Signature', 260000.00, 1440);