drop database if exists next_blog_db;
create database next_blog_db;

use next_blog_db;

create table posts (
    id          bigint unsigned auto_increment primary key,
    user_id     varchar(255) not null,
    title       varchar(255) not null,
    description text,
    cover       varchar(2048),
    created_at  timestamp not null default current_timestamp,
    updated_at  timestamp not null default current_timestamp
                on update current_timestamp,
    index idx_posts_user (user_id)
) engine=innodb
  default charset=utf8mb4
  collate=utf8mb4_unicode_ci;

create table follows (
    follower_id  varchar(255) not null,
    following_id varchar(255) not null,
    created_at   timestamp not null default current_timestamp,
    primary key (follower_id, following_id),
    index idx_follows_following (following_id)
) engine=innodb
  default charset=utf8mb4
  collate=utf8mb4_unicode_ci;

create user 'next_blog_user'@'localhost'
identified by 'next_blog_user';

grant all privileges on next_blog_db.*
to 'next_blog_user'@'localhost';

flush privileges;