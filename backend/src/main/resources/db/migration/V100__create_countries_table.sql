CREATE TABLE IF NOT EXISTS countries (
  id INT NOT NULL PRIMARY KEY,
  iso VARCHAR(2) NOT NULL,
  name VARCHAR(80) NOT NULL,
  nicename VARCHAR(80) NOT NULL,
  iso3 VARCHAR(3) DEFAULT NULL,
  numcode VARCHAR(6) DEFAULT NULL,
  phonecode VARCHAR(5) NOT NULL
  );