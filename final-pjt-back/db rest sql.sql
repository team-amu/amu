-- SQLite

-- 유저 정보 삭제
DELETE FROM accounts_profile;
DELETE FROM accounts_user;
DELETE FROM accounts_user_followings;
DELETE FROM accounts_user_user_permissions;
DELETE FROM accounts_user_groups;
DELETE FROM account_emailaddress;
DELETE FROM account_emailconfirmation;
DELETE FROM accounts_moviebookmark;
DELETE FROM accounts_movielike;

DELETE FROM auth_permission;
DELETE FROM authtoken_token;


-- 게시물 및 댓글 정보 삭제
DELETE FROM community_article;
DELETE FROM community_article_like_users;
DELETE FROM community_comment;


-- 영화 정보 삭제
DELETE FROM movies_actor;
DELETE FROM movies_castedactors;
DELETE FROM movies_genre;
DELETE FROM movies_movie;
DELETE FROM movies_movie_genres;


-- 기타
DELETE FROM django_admin_log;
DELETE FROM django_content_type;
DELETE FROM django_migrations;
DELETE FROM django_session;

-- DELETE FROM community_article WHERE id = 24;
-- DELETE FROM community_article WHERE id = 25;
-- DELETE FROM community_article WHERE id = 26;
-- DELETE FROM community_article WHERE id = 27;

INSERT INTO community_article_like_users (article_id, user_id)
VALUES
(1, 5),
(2, 5),
(3, 5),
(4, 5),
(5, 5),
(6, 5),
(7, 5),
(8, 5),
(9, 5),
(10, 5),
(11, 5),
(12, 5),
(13, 5),
(14, 5),
(15, 5),
(17, 5),
(18, 5),
(19, 5),
(20, 5),
(21, 5);
