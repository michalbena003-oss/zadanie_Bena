-- Cvicenie 10, krok 3: spustite v phpMyAdmin nad databazou kniznica_db (zalozka SQL)
CREATE TABLE pouzivatelia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    meno VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    heslo_hash VARCHAR(255) NOT NULL,
    vytvoreny TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
