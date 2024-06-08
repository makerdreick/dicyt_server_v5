PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;

-- Tabla de roles
CREATE TABLE roles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL UNIQUE,
    descripcion TEXT
);

INSERT INTO roles VALUES(1,'admin','Rol de administrador');
INSERT INTO roles VALUES(2,'invitado','Rol de invitado');
INSERT INTO roles VALUES(3,'usuario','Rol de usuario');

-- Tabla de usuarios
CREATE TABLE usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    apell_pate TEXT NOT NULL,
    apell_mate TEXT NOT NULL,
    usuario TEXT NOT NULL UNIQUE,
    pass TEXT NOT NULL,
    rol_id INTEGER NOT NULL,
    FOREIGN KEY (rol_id) REFERENCES roles (id)
);

INSERT INTO usuarios VALUES(1,'Erick','Conde','Conde','Econde','1234',1);

-- Tabla de género

-- Tabla de origen
CREATE TABLE origen (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    departamento TEXT NOT NULL UNIQUE,
    abreviatura TEXT NOT NULL UNIQUE
);

INSERT INTO origen (departamento, abreviatura) VALUES ('La Paz', 'L.P.');
INSERT INTO origen (departamento, abreviatura) VALUES ('Cochabamba', 'C.B.B.');
INSERT INTO origen (departamento, abreviatura) VALUES ('Santa Cruz', 'SCZ');
INSERT INTO origen (departamento, abreviatura) VALUES ('Beni', 'BN');
INSERT INTO origen (departamento, abreviatura) VALUES ('Potosí', 'PT');
INSERT INTO origen (departamento, abreviatura) VALUES ('Oruro', 'OR');
INSERT INTO origen (departamento, abreviatura) VALUES ('Chuquisaca', 'CH');
INSERT INTO origen (departamento, abreviatura) VALUES ('Tarija', 'TJ');
INSERT INTO origen (departamento, abreviatura) VALUES ('Pando', 'PA');
INSERT INTO origen (departamento, abreviatura) VALUES ('Extranjero', 'EX');
INSERT INTO origen (departamento, abreviatura) VALUES ('Estudiante Extranjero', 'ESTU_EXTRA');

-- Tabla de formulario
CREATE TABLE formulario (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cargo TEXT NOT NULL CHECK (cargo IN (
        'DIRECTOR',
        'SECRETARIA',
        'CENTRO DE ESTUDIANTES',
        'COORDINADOR INSTITUTO DE INVESTIGACION',
        'DOCENTE INVESTIGADOR',
        'AUXILIAR de INVESTIGACION',
        'DOCENTE COLABORADOR-PROYECTO IDH',
        'AUXILIAR INVESTIGACION IDH',
        'AUXILIAR INVESTIGACION IDH EXTENSION',
        'AUX INVESTIGACION COMPLEMENTARIO'
    )),
    tp_cargo TEXT NOT NULL CHECK (tp_cargo IN ('IT', 'NF')),
    gestion TEXT,
    cod_cargo TEXT,
    grado_p TEXT CHECK (grado_p IN (
        'Univ.',
        'Tec.',
        'Lic.',
        'Ing.',
        'M.Sc.',
        'Dr.C.',
        'Dr.',
        'Ph.D.'
    )),
    nombres TEXT NOT NULL,
    ap_paterno TEXT NOT NULL,
    ap_materno TEXT NOT NULL,
    carnet TEXT NOT NULL,
    RU INTEGER,
    cod_depo TEXT(40),
    titulo TEXT(100),
    tipo_pro TEXT(150),
    tipo_revista TEXT(150),
    anio_publi INTEGER,
    tipo_autor TEXT(8),
    genero TEXT  CHECK (genero IN ('el', 'la')), -- Modificación aquí
    exten TEXT,
    FOREIGN KEY (exten) REFERENCES origen(abreviatura)
);


 
INSERT INTO formulario VALUES(1,'SECRETARIA','IT','2023','SC-2023-002','Lic.','Juan','Martínez','Gómez','2345678',2000789457,'23456-DEF','Título 2','Tipo 2','Revista 2',2023,'Autor','el','LP');
INSERT INTO formulario VALUES(2,'SECRETARIA','IT','2023','SC-2023-002','Lic.','Juan','Martínez','Gómez','2345678',2000789457,'23456-DEF','Título 2','Tipo 2','Revista 2',2023,'Autor','el', 'LP');
INSERT INTO formulario VALUES(3,'COORDINADOR INSTITUTO DE INVESTIGACION','NF','2024','CI-2024-001','Dr.','Ana','García','López','3456789',2000789458,'34567-GHIJ','Título 3','Tipo 3','Revista 3',2024,'Coautor','la','CB');
INSERT INTO formulario VALUES(4,'DOCENTE INVESTIGADOR','IT','2025','DI-2025-001','Dr.','Pedro','Rodríguez','Pérez','4567890',2000789459,'45678-KLMN','Título 4','Tipo 4','Revista 4',2025,'Autor','el','SC');
INSERT INTO formulario VALUES(5,'AUXILIAR de INVESTIGACION','NF','2026','AI-2026-001','Univ.','María','González','Martínez','5678901',2000789460,'56789-OPQR','Título 5','Tipo 5','Revista 5',2026,'Coautor','la','PT');
INSERT INTO formulario VALUES(6,'SECRETARIA','IT','2027','SC-2027-001','Lic.','Luis','López','Gómez','7890123',2000789479,'67890-STUV','Título 6','Tipo 6','Revista 6',2027,'Autor','el','OR');
INSERT INTO formulario VALUES(7,'DOCENTE INVESTIGADOR','NF','2028','DI-2028-001','Dr.','Elena','Martínez','Hernández','8901234',2000789480,'78901-TUVW','Título 7','Tipo 7','Revista 7',2028,'Coautor','la','CH');
INSERT INTO formulario VALUES(8,'COORDINADOR INSTITUTO DE INVESTIGACION','IT','2029','CI-2029-001','Dr.','Carlos','Gómez','Martínez','9012345',2000789481,'89012-UVWX','Título 8','Tipo 8','Revista 8',2029,'Autor','el','TJ');
INSERT INTO formulario VALUES(9,'AUXILIAR de INVESTIGACION','NF','2030','AI-2030-001','Univ.','Laura','Hernández','Pérez','0123456',2000789482,'90123-VWXY','Título 9','Tipo 9','Revista 9',2030,'Coautor','la','PA');
INSERT INTO formulario VALUES(10,'AUX INVESTIGACION COMPLEMENTARIO','IT','2031','AC-2031-001','Ing.','Jorge','Gómez','Hernández','1234567',2000789483,'01234-WXYZ','Título 10','Tipo 10','Revista 10',2031,'Autor','el','EX');
INSERT INTO formulario VALUES(11,'SECRETARIA','NF','2023','SC-2023-003','Lic.','Carmen','Martínez','Gómez','2345679',2000789457,'23456-DEG','Título 11','Tipo 11','Revista 11',2023,'Coautor','la','ESTU_EXTRA');
INSERT INTO formulario VALUES(12,'DOCENTE INVESTIGADOR','IT','2024','DI-2024-003','Dr.','Marcela','Gómez','Pérez','3456780',2000789458,'34567-HIJK','Título 12','Tipo 12','Revista 12',2024,'Autor','el','LP');
INSERT INTO formulario VALUES(13,'COORDINADOR INSTITUTO DE INVESTIGACION','NF','2025','CI-2025-002','Dr.','Javier','Martínez','González','4567891',2000789459,'45678-LMNO','Título 13','Tipo 13','Revista 13',2025,'Coautor','la','CB');
INSERT INTO formulario VALUES(14,'AUXILIAR de INVESTIGACION','IT','2026','AI-2026-002','Univ.','Sara','Hernández','Martínez','5678902',2000789460,'56789-PQRS','Título 14','Tipo 14','Revista 14',2026,'Autor','la','SC');
INSERT INTO formulario VALUES(15,'SECRETARIA','NF','2027','SC-2027-002','Lic.','Diego','Martínez','Gómez','7890124',2000789479,'67890-TUVW','Título 15','Tipo 15','Revista 15',2027,'Coautor','la','PT');
INSERT INTO formulario VALUES(16,'DOCENTE INVESTIGADOR','IT','2028','DI-2028-002','Dr.','Fernanda','Gómez','Hernández','8901235',2000789480,'78901-UVWX','Título 16','Tipo 16','Revista 16',2028,'Autor','el','OR');
INSERT INTO formulario VALUES(17,'COORDINADOR INSTITUTO DE INVESTIGACION','NF','2029','CI-2029-002','Dr.','Mónica','Hernández','Martínez','9012346',2000789481,'89012-VWXY','Título 17','Tipo 17','Revista 17',2029,'Coautor','la','CH');
INSERT INTO formulario VALUES(18,'AUXILIAR de INVESTIGACION','IT','2030','AI-2030-002','Univ.','Pablo','Gómez','Hernández','0123457',2000789482,'90123-WXYZ','Título 18','Tipo 18','Revista 18',2030,'Autor','el','TJ');
INSERT INTO formulario VALUES(19,'AUX INVESTIGACION COMPLEMENTARIO','NF','2031','AC-2031-002','Ing.','Lucía','Martínez','Pérez','1234568',2000789483,'01234-XYZA','Título 19','Tipo 19','Revista 19',2031,'Coautor','la','PA');
INSERT INTO formulario VALUES(20,'SECRETARIA','IT','2023','SC-2023-004','Lic.','Mateo','Hernández','Gómez','2345680',2000789457,'23456-EFG','Título 20','Tipo 20','Revista 20',2023,'Autor','el','EX');
INSERT INTO formulario VALUES(21,'DOCENTE INVESTIGADOR','NF','2024','DI-2024-004','Dr.','Valentina','Gómez','Hernández','3456781',2000789458,'34567-IJKL','Título 21','Tipo 21','Revista 21',2024,'Coautor','la','LP');
INSERT INTO formulario VALUES(22,'COORDINADOR INSTITUTO DE INVESTIGACION','IT','2025','CI-2025-003','Dr.','Andrés','Hernández','Gómez','4567892',2000789459,'45678-MNOP','Título 22','Tipo 22','Revista 22',2025,'Autor','el','CB');
INSERT INTO formulario VALUES(23,'AUXILIAR de INVESTIGACION','NF','2026','AI-2026-003','Univ.','Camila','Martínez','Hernández','5678903',2000789460,'56789-QRST','Título 23','Tipo 23','Revista 23',2026,'Coautor','la','SC');
INSERT INTO formulario VALUES(24,'SECRETARIA','IT','2027','SC-2027-003','Lic.','Miguel','Hernández','Gómez','7890125',2000789479,'67890-UVWX','Título 24','Tipo 24','Revista 24',2027,'Autor','el','PT');
INSERT INTO formulario VALUES(25,'DOCENTE INVESTIGADOR','NF','2028','DI-2028-003','Dr.','Gabriela','Martínez','Hernández','8901236',2000789480,'78901-VWXY','Título 25','Tipo 25','Revista 25',2028,'Coautor','la','OR');
INSERT INTO formulario VALUES(26,'COORDINADOR INSTITUTO DE INVESTIGACION','IT','2029','CI-2029-003','Dr.','Santiago','Hernández','Gómez','9012347',2000789481,'89012-WXYZ','Título 26','Tipo 26','Revista 26',2029,'Autor','el','CH');
INSERT INTO formulario VALUES(27,'AUXILIAR de INVESTIGACION','NF','2030','AI-2030-003','Univ.','Isabella','Hernández','Gómez','0123458',2000789482,'90123-XYZA','Título 27','Tipo 27','Revista 27',2030,'Coautor','la','TJ');
INSERT INTO formulario VALUES(28,'AUX INVESTIGACION COMPLEMENTARIO','IT','2031','AC-2031-003','Ing.','Daniel','Martínez','Hernández','1234569',2000789483,'01234-YZAB','Título 28','Tipo 28','Revista 28',2031,'Autor','el','PA');
INSERT INTO formulario VALUES(29,'SECRETARIA','NF','2023','SC-2023-005','Lic.','Valeria','Hernández','Gómez','2345681',2000789457,'23456-FGH','Título 29','Tipo 29','Revista 29',2023,'Coautor','la','EX');
INSERT INTO formulario VALUES(30,'DOCENTE INVESTIGADOR','IT','2024','DI-2024-005','Dr.','Emilio','Hernández','Gómez','3456782',2000789458,'34567-JKLM','Título 30','Tipo 30','Revista 30',2024,'Autor','el','LP');
INSERT INTO formulario VALUES(31,'COORDINADOR INSTITUTO DE INVESTIGACION','NF','2025','CI-2025-004','Dr.','Natalia','Hernández','Gómez','4567893',2000789459,'45678-NOPQ','Título 31','Tipo 31','Revista 31',2025,'Coautor','la','CB');
INSERT INTO formulario VALUES(32,'AUXILIAR de INVESTIGACION','IT','2026','AI-2026-004','Univ.','Lucas','Hernández','Gómez','5678904',2000789460,'56789-RSTU','Título 32','Tipo 32','Revista 32',2026,'Autor','el','SC'); 







-- Crear la tabla registros con eliminación lógica
CREATE TABLE registros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    evento TEXT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_id INTEGER,
    id_formulario INTEGER,
    id_Cod_pdf TEXT,
    cod_serial TEXT,
    cod_reg_1 TEXT,  -- Nueva columna para el código de registro
    eliminado BOOLEAN DEFAULT FALSE, -- Columna para la eliminación lógica
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (id_formulario) REFERENCES formulario(id)
);



-- Tabla de admin_registros
CREATE TABLE adm_registro (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    evento TEXT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_id INTEGER,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Tabla de administrador
CREATE TABLE administrador (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    ape_pate TEXT NOT NULL,
    ape_mate TEXT NOT NULL,
    grado_estudio TEXT CHECK (grado_estudio IN (
        'Univ.',
        'Tec.',
        'Lic.',
        'Ing.',
        'M.Sc.',
        'Dr.C.',
        'Dr.',
        'Ph.D.'
    )),
    fecha_inicio_cargo TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (nombre,ape_pate,ape_mate)
);


INSERT INTO administrador (nombre,ape_pate,ape_mate, grado_estudio, fecha_inicio_cargo) 
VALUES ('ANTONIO SIVESTRE', 'LOPEZ','ANDRADE', 'Ph.D.', CURRENT_TIMESTAMP);

--INSERT INTO administrador VALUES(1,'ANTONIO SILVESTRE','LOPEZ ANDRADE','PH.D.',2024);

-- Tabla de solicitudes
CREATE TABLE solicitudes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    carnet TEXT,
    registro_id INTEGER,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (registro_id) REFERENCES registros(id)
);



DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('roles',3);
INSERT INTO sqlite_sequence VALUES('usuarios',1);
INSERT INTO sqlite_sequence VALUES('formulario',32); -- Actualiza el valor si es necesario
INSERT INTO sqlite_sequence VALUES('administrador',1);
INSERT INTO sqlite_sequence VALUES('registros',1);

COMMIT;
