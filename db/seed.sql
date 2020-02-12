USE template_db;
ALTER TABLE category_tb CHANGE COLUMN createdAt createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE category_tb CHANGE COLUMN updatedAt updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;

INSERT INTO category_tb (categoryName) VALUES ("Will");
INSERT INTO category_tb (categoryName) VALUES ("Grace");
INSERT INTO category_tb (categoryName) VALUES ("Karen");
INSERT INTO category_tb (categoryName) VALUES ("Jack");
SELECT * FROM category_tb;