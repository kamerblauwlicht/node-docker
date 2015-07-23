# mysql -h "SERVER" -u "USER" "-pPASSWORD" < "seed.sql"

CREATE DATABASE node_app;
USE node_app;
CREATE TABLE tests ( counter INT(6) UNSIGNED );
INSERT INTO tests (counter) VALUES (1);
