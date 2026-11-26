-- Cvicenie 10, krok 3: spustite v phpMyAdmin nad databazou kniznica_db (zalozka SQL)
CREATE TABLE pouzivatelia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    meno VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    heslo_hash VARCHAR(255) NOT NULL,
    vytvoreny TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO pouzivatelia (id, meno, email, heslo_hash, vytvoreny) VALUES
(1, 'Michal Bena', 'majklben@gmail.com', '$2b$10$p7K4nULSEoMGpvevBffQXOKE10KAkhI5RYcsZRWOUXOjPM6Bd9QAS', '2026-11-23 15:02:24'),
(2, 'Janko Hrasko', 'jankohrasko@gmail.com', '$2b$10$b.VZ.adZDvQXKkNcBF56f.SBWzRO4zJ/AYZ4aMOC5OxOTy.LysrhW', '2026-11-26 19:59:10'),
(3, 'Ivan Fekete', 'fekete@gmail.com', '$2b$10$7dft4TnAuvP7gZqMzRjydeEWvqCZn9Hh4Akp2vDeEniLvNQTVndCi', '2026-11-26 19:59:33');
