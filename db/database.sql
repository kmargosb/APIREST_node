CREATE DATABASE IF NOT EXISTS realstatedb;

USE realstatedb;

CREATE TABLE piso (
    id INT(11) NOT NULL AUTO_INCREMENT,
    title VARCHAR(45) DEFAULT NULL,
    descrip VARCHAR(1000) DEFAULT NULL,
    room INT(2) DEFAULT NULL,
    bath INT(2) DEFAULT NULL,
    price INT(9) DEFAULT NULL,
    -- imagen MEDIUMBLOB NOT NULL,
    PRIMARY KEY (id)
);

DESCRIBE piso;

INSERT INTO piso VALUES
    (1, 'Piso en madrid', 'piso en madrid centro reformado listo para amoblar', 2, 1, 120000);