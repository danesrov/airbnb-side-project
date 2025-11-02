SET FOREIGN_KEY_CHECKS = 0;

-- =============================================================
-- Catálogos básicos
-- =============================================================

CREATE TABLE CIUDAD (
  id_ciudad        INT PRIMARY KEY,
  nombre           VARCHAR(120) NOT NULL,
  pais             VARCHAR(120) NOT NULL,
  fecha_creacion       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT UQ_CIUDAD_id UNIQUE (id_ciudad)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE ZONA (
  id_zona          INT PRIMARY KEY,
  id_ciudad        INT NOT NULL,
  nombre           VARCHAR(120) NOT NULL,
  fecha_creacion       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT UQ_ZONA_id UNIQUE (id_zona),
  CONSTRAINT UQ_ZONA_ciudad_nombre UNIQUE (id_ciudad, nombre),
  CONSTRAINT FK_ZONA_CIUDAD FOREIGN KEY (id_ciudad) REFERENCES CIUDAD(id_ciudad)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE AMENIDAD (
  id_amenidad      INT PRIMARY KEY,
  nombre           VARCHAR(120) NOT NULL,
  fecha_creacion       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT UQ_AMENIDAD_id UNIQUE (id_amenidad),
  CONSTRAINT UQ_AMENIDAD_nombre UNIQUE (nombre)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE CAT_RESERVA_ESTADO (
  id_estado   INT PRIMARY KEY,
  codigo      VARCHAR(40) NOT NULL UNIQUE,
  descripcion VARCHAR(150)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE CAT_PAGO_METODO (
  id_metodo   INT PRIMARY KEY,
  codigo      VARCHAR(40) NOT NULL UNIQUE,
  descripcion VARCHAR(150)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE CAT_PAGO_ESTADO (
  id_estado   INT PRIMARY KEY,
  codigo      VARCHAR(40) NOT NULL UNIQUE,
  descripcion VARCHAR(150)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE CAT_CALENDARIO_ESTADO (
  id_estado   INT PRIMARY KEY,
  codigo      VARCHAR(40) NOT NULL UNIQUE,
  descripcion VARCHAR(150)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =============================================================
-- Usuarios y roles
-- =============================================================

CREATE TABLE USUARIO (
  id_usuario  INT PRIMARY KEY,
  nombre      VARCHAR(80)  NOT NULL,
  apellido    VARCHAR(80)  NOT NULL,
  correo      VARCHAR(150) NOT NULL UNIQUE,
  telefono    VARCHAR(30),
  fecha_creacion  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Subtipos (CTI): PK = FK al supertipo USUARIO
CREATE TABLE ANFITRION (
  id_anfitrion          INT PRIMARY KEY,
  calificacion_promedio DECIMAL(3,2) DEFAULT NULL,
  fecha_registro        DATE NOT NULL,
  CONSTRAINT FK_ANFITRION_USUARIO FOREIGN KEY (id_anfitrion) REFERENCES USUARIO(id_usuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE HUESPED (
  id_huesped     INT PRIMARY KEY,
  fecha_registro DATE NOT NULL,
  total_reservas INT DEFAULT 0,
  CONSTRAINT FK_HUESPED_USUARIO FOREIGN KEY (id_huesped) REFERENCES USUARIO(id_usuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =============================================================
-- Políticas de cancelación
-- =============================================================
CREATE TABLE POLITICA_CANCELACION (
  id_politica                        INT PRIMARY KEY,
  nombre                             VARCHAR(120) NOT NULL UNIQUE,
  descripcion                        VARCHAR(500),
  reembolso_total_horas_antes        INT DEFAULT NULL,
  reembolso_parcial_horas_antes      INT DEFAULT NULL,
  porcentaje_parcial                 DECIMAL(5,2) DEFAULT NULL,
  porcentaje_penalizacion_no_show    DECIMAL(5,2) DEFAULT NULL,
  fecha_creacion                         TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion                         TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =============================================================
-- Anuncios / Propiedades
-- =============================================================
CREATE TABLE ANUNCIO (
  id_anuncio              INT PRIMARY KEY,
  id_anfitrion            INT NOT NULL,
  id_ciudad               INT NOT NULL,
  id_zona                 INT DEFAULT NULL,
  id_politica_cancelacion INT NOT NULL,
  titulo                  VARCHAR(150) NOT NULL,
  descripcion             VARCHAR(2000),
  direccion               VARCHAR(250),
  capacidad               INT NOT NULL,
  precio_noche_base       DECIMAL(10,2) NOT NULL,
  min_noches              INT NOT NULL DEFAULT 1,
  max_noches              INT NOT NULL DEFAULT 365,
  hora_entrada            TIME DEFAULT '15:00:00',
  hora_salida           TIME DEFAULT '11:00:00',
  moneda                  VARCHAR(3) DEFAULT 'USD',
  fecha_creacion              TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion              TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT FK_ANUNCIO_ANFITRION  FOREIGN KEY (id_anfitrion)  REFERENCES ANFITRION(id_anfitrion),
  CONSTRAINT FK_ANUNCIO_CIUDAD     FOREIGN KEY (id_ciudad)     REFERENCES CIUDAD(id_ciudad),
  CONSTRAINT FK_ANUNCIO_ZONA       FOREIGN KEY (id_zona)       REFERENCES ZONA(id_zona),
  CONSTRAINT FK_ANUNCIO_POLITICA   FOREIGN KEY (id_politica_cancelacion) REFERENCES POLITICA_CANCELACION(id_politica),
  CONSTRAINT CK_ANUNCIO_NOCHES CHECK (min_noches >= 1 AND max_noches >= min_noches)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE ANUNCIO_AMENIDAD (
  id_anuncio  INT NOT NULL,
  id_amenidad INT NOT NULL,
  PRIMARY KEY (id_anuncio, id_amenidad),
  CONSTRAINT FK_ANU_AME_ANUNCIO  FOREIGN KEY (id_anuncio)  REFERENCES ANUNCIO(id_anuncio) ON DELETE CASCADE,
  CONSTRAINT FK_ANU_AME_AMENIDAD FOREIGN KEY (id_amenidad) REFERENCES AMENIDAD(id_amenidad)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =============================================================
-- Temporadas y excepciones por anuncio
-- =============================================================
CREATE TABLE TEMPORADA (
  id_temporada INT PRIMARY KEY,
  nombre       VARCHAR(120) NOT NULL,
  fecha_inicio DATE NOT NULL,
  fecha_fin    DATE NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE TEMPORADA_ANUNCIO_REGLA (
  id_anuncio             INT NOT NULL,
  id_temporada           INT NOT NULL,
  precio_especial        DECIMAL(10,2) DEFAULT NULL,
  min_noches_excepcion    INT DEFAULT NULL,
  max_noches_excepcion    INT DEFAULT NULL,
  hora_entrada_excepcion  TIME DEFAULT NULL,
  hora_salida_excepcion TIME DEFAULT NULL,
  PRIMARY KEY (id_anuncio, id_temporada),
  CONSTRAINT FK_TAR_ANUNCIO   FOREIGN KEY (id_anuncio)   REFERENCES ANUNCIO(id_anuncio) ON DELETE CASCADE,
  CONSTRAINT FK_TAR_TEMPORADA FOREIGN KEY (id_temporada) REFERENCES TEMPORADA(id_temporada)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =============================================================
-- Reservas, Pagos y Reembolsos
-- =============================================================
CREATE TABLE RESERVA (
  id_reserva     INT PRIMARY KEY,
  id_huesped     INT NOT NULL,
  id_anuncio     INT NOT NULL,
  estado         INT NOT NULL,
  fecha_reserva  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fecha_entrada  DATE NOT NULL,
  fecha_salida DATE NOT NULL,
  noches         INT  NOT NULL,
  total          DECIMAL(12,2) NOT NULL,
  zona_horaria_reserva VARCHAR(40) DEFAULT NULL,
  fecha_creacion     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT FK_RESERVA_HUESPED FOREIGN KEY (id_huesped) REFERENCES HUESPED(id_huesped),
  CONSTRAINT FK_RESERVA_ANUNCIO FOREIGN KEY (id_anuncio) REFERENCES ANUNCIO(id_anuncio),
  CONSTRAINT FK_RESERVA_ESTADO  FOREIGN KEY (estado)     REFERENCES CAT_RESERVA_ESTADO(id_estado),
  CONSTRAINT CK_RESERVA_NOCHES  CHECK (noches >= 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX IDX_RESERVA_ANUNCIO_FECHAS ON RESERVA(id_anuncio, fecha_entrada, fecha_salida);

CREATE TABLE PAGO (
  id_pago     INT PRIMARY KEY,
  id_reserva  INT NOT NULL,
  fecha_pago  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  monto       DECIMAL(12,2) NOT NULL,
  id_metodo   INT NOT NULL,
  id_estado   INT NOT NULL,
  fecha_creacion  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT FK_PAGO_RESERVA FOREIGN KEY (id_reserva) REFERENCES RESERVA(id_reserva),
  CONSTRAINT FK_PAGO_METODO  FOREIGN KEY (id_metodo)  REFERENCES CAT_PAGO_METODO(id_metodo),
  CONSTRAINT FK_PAGO_ESTADO  FOREIGN KEY (id_estado)  REFERENCES CAT_PAGO_ESTADO(id_estado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX IDX_PAGO_RESERVA ON PAGO(id_reserva);

CREATE TABLE REEMBOLSO (
  id_reembolso INT PRIMARY KEY,
  id_pago      INT NOT NULL,
  monto        DECIMAL(12,2) NOT NULL,
  fecha        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  motivo       VARCHAR(300),
  CONSTRAINT FK_REEMBOLSO_PAGO FOREIGN KEY (id_pago) REFERENCES PAGO(id_pago)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =============================================================
-- Calendario día a día
-- =============================================================
CREATE TABLE CALENDARIO_DIA (
  id_calendario  BIGINT PRIMARY KEY,
  id_anuncio     INT NOT NULL,
  fecha          DATE NOT NULL,
  id_estado      INT NOT NULL,
  precio_especial DECIMAL(10,2) DEFAULT NULL,
  origen_bloqueo VARCHAR(20) DEFAULT NULL, -- sistema|anfitrion|mantenimiento
  id_reserva     INT DEFAULT NULL,
  fecha_creacion     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT FK_CAL_ANUNCIO  FOREIGN KEY (id_anuncio) REFERENCES ANUNCIO(id_anuncio) ON DELETE CASCADE,
  CONSTRAINT FK_CAL_ESTADO   FOREIGN KEY (id_estado)  REFERENCES CAT_CALENDARIO_ESTADO(id_estado),
  CONSTRAINT FK_CAL_RESERVA  FOREIGN KEY (id_reserva) REFERENCES RESERVA(id_reserva)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE INDEX IDX_CALENDARIO_ANUNCIO_FECHA ON CALENDARIO_DIA(id_anuncio, fecha);

-- =============================================================
-- Reseñas (mutuas) con unicidad por reserva y tipo
-- =============================================================
CREATE TABLE RESENA (
  id_resena          INT PRIMARY KEY,
  id_reserva         INT NOT NULL,
  tipo               VARCHAR(25) NOT NULL, -- 'huesped→anuncio' | 'anfitrion→huesped'
  id_huesped         INT NOT NULL,
  id_anuncio         INT DEFAULT NULL,
  id_anfitrion       INT DEFAULT NULL,
  puntuacion         TINYINT NOT NULL,
  comentario         VARCHAR(1000),
  estado_moderacion  VARCHAR(20) NOT NULL DEFAULT 'pendiente', -- pendiente|aprobado|oculto
  motivo_moderacion  VARCHAR(300) DEFAULT NULL,
  fecha              TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT UQ_RESENA_RESERVA_TIPO UNIQUE (id_reserva, tipo),
  CONSTRAINT CK_RESENA_PUNTUACION CHECK (puntuacion BETWEEN 1 AND 5),
  CONSTRAINT FK_RESENA_RESERVA    FOREIGN KEY (id_reserva)  REFERENCES RESERVA(id_reserva),
  CONSTRAINT FK_RESENA_HUESPED    FOREIGN KEY (id_huesped)  REFERENCES HUESPED(id_huesped),
  CONSTRAINT FK_RESENA_ANUNCIO    FOREIGN KEY (id_anuncio)  REFERENCES ANUNCIO(id_anuncio),
  CONSTRAINT FK_RESENA_ANFITRION  FOREIGN KEY (id_anfitrion)REFERENCES ANFITRION(id_anfitrion)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =============================================================
-- Semillas de catálogos (opcional)
-- =============================================================
INSERT INTO CAT_RESERVA_ESTADO (id_estado, codigo, descripcion) VALUES
 (1,'solicitada','Creada por el huésped, pendiente de confirmación'),
 (2,'confirmada','Confirmada; debe bloquear calendario'),
 (3,'en_estadia','Huésped hizo check-in'),
 (4,'completada','Estadía finalizada (check-out)'),
 (5,'cancelada','Cancelada');

INSERT INTO CAT_PAGO_METODO (id_metodo, codigo, descripcion) VALUES
 (1,'efectivo','Pago en efectivo'),
 (2,'transferencia','Transferencia bancaria'),
 (3,'tarjeta','Tarjeta de crédito/débito');

INSERT INTO CAT_PAGO_ESTADO (id_estado, codigo, descripcion) VALUES
 (1,'pendiente','Pago pendiente'),
 (2,'confirmado','Pago confirmado'),
 (3,'rechazado','Pago rechazado'),
 (4,'reembolsado','Pago reembolsado');

INSERT INTO CAT_CALENDARIO_ESTADO (id_estado, codigo, descripcion) VALUES
 (1,'disponible','Día disponible para reservar'),
 (2,'reservado','Día bloqueado por reserva confirmada'),
 (3,'bloqueado','Día bloqueado manualmente o por mantenimiento');

SET FOREIGN_KEY_CHECKS = 1;

-- =============================================================
-- Notas:
-- - Los CHECK requieren MySQL 8.0.16+.
-- - Para evitar sobre-reservas: implementar lógica transaccional y/o triggers
--   que verifiquen solapes en RESERVA antes de pasar a 'confirmada'.
-- - Puede agregarse zona horaria a nivel de servidor o persistir en RESERVA.zona_horaria_reserva.
-- =============================================================


-- Buenas prácticas: Unicidad por anuncio y fecha en el calendario
CREATE UNIQUE INDEX IF NOT EXISTS uq_calendario_dia_anuncio_fecha
ON `calendario_dia` (`id_anuncio`, `fecha`);
