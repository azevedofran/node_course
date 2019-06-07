----------------------------------- PROFESION -----------------------------------
Create table PROFESION
(
  pro_id varchar(10) NOT NULL,
  pro_profesion varchar(30) NOT NULL,
  CONSTRAINT pro_id_pk PRIMARY KEY (pro_id)
);
-------------------------------------------------------------------------------


----------------------------------- PERSONA -----------------------------------
Create table PERSONA
(
  per_cedula integer NOT NULL,
  per_nombre varchar(10) NOT NULL,
  per_ven varchar(1) NOT NUll,
  per_nombre2 varchar(10),
  per_apellido varchar(10) NOT NULL,
  per_apellido2 varchar(10),
  per_fecha_nacimiento date NOT NULL,
  per_edo_civil varchar(2) NOT NULL,
  per_correo varchar(30) NOT NULL,
  per_genero varchar(1) NOT NULL,
  per_profesion varchar(10) NOT NULL,
  CONSTRAINT check_per_genero CHECK (per_genero='F' or per_genero='M'),
  CONSTRAINT check_per_edo_civil CHECK (per_edo_civil='S' or per_edo_civil='C' or per_edo_civil='D' or per_edo_civil='V' or per_edo_civil='CB'),
  CONSTRAINT check_per_ven CHECK (per_ven='V' or per_ven='E'),
  CONSTRAINT per_cedula_pk PRIMARY KEY (per_cedula),
  CONSTRAINT fk_per_profesion FOREIGN KEY (per_profesion) REFERENCES PROFESION(pro_id)
);
-------------------------------------------------------------------------------


----------------------------------- TELEFONO -----------------------------------
Create table TELEFONO
(
  tel_id serial NOT NULL,
  tel_cod_area integer NOT NULL,
  tel_numero integer NOT NULL,
  tel_tipo varchar(5) NOT NULL,
  tel_persona integer NOT NULL,
  CONSTRAINT tel_id_pk PRIMARY KEY (tel_id),
  CONSTRAINT check_tel_tipo CHECK (tel_tipo='LOCAL' or tel_tipo='MOVIL'),
  CONSTRAINT check_tel_cod_area CHECK (tel_cod_area <= 99999),
  CONSTRAINT check_tel_numero CHECK (tel_numero <= 9999999),
  CONSTRAINT check_tel_persona CHECK (tel_persona <= 999999999),
  CONSTRAINT fk_tel_persona FOREIGN KEY (tel_persona) REFERENCES PERSONA(per_cedula)
);
-------------------------------------------------------------------------------


----------------------------------- PAIS -----------------------------------
Create table PAIS
(
  pai_id serial NOT NULL,
  pai_nacionalidad varchar(10) NOT NULL,
  pai_nombre varchar(50) NOT NULL,
  CONSTRAINT pai_id_pk PRIMARY KEY (pai_id)
);
-------------------------------------------------------------------------------


----------------------------------- ESTADO -----------------------------------
Create table ESTADO
(
  est_id serial NOT NULL,
  est_nombre varchar(50) NOT NULL,
  est_pais integer NOT NULL,
  CONSTRAINT est_id_pk PRIMARY KEY (est_id),
  CONSTRAINT fk_est_pais FOREIGN KEY (est_pais) REFERENCES PAIS(pai_id)
);
-------------------------------------------------------------------------------

----------------------------------- CIUDAD -----------------------------------
Create table CIUDAD
(
  ciu_id serial NOT NULL,
  ciu_nombre varchar(50) NOT NULL,
  ciu_estado integer NOT NULL,
  CONSTRAINT ciu_id_pk PRIMARY KEY (ciu_id),
  CONSTRAINT fk_ciu_estado FOREIGN KEY (ciu_estado) REFERENCES ESTADO(est_id)
);
-------------------------------------------------------------------------------


----------------------------------- DIRECCION -----------------------------------
Create table DIRECCION
(
  dir_id serial NOT NULL,
  dir_direccion varchar(200) NOT NULL,
  dir_ciudad integer NOT NULL,
  dir_persona integer NOT NULL,
  CONSTRAINT dir_id_pk PRIMARY KEY (dir_id),
  CONSTRAINT fk_dir_estado FOREIGN KEY (dir_ciudad) REFERENCES ESTADO(est_id),
  CONSTRAINT fk_dir_persona FOREIGN KEY (dir_persona) REFERENCES PERSONA(per_cedula)
);
-------------------------------------------------------------------------------


----------------------------------- NACIONALIDAD -----------------------------------
Create table NACIONALIDAD
(
  nac_persona serial NOT NULL,
  nac_pais integer NOT NULL,
  CONSTRAINT nac_id_pk PRIMARY KEY (nac_persona,nac_pais),
  CONSTRAINT fk_nac_persona FOREIGN KEY (nac_persona) REFERENCES PERSONA(per_cedula),
  CONSTRAINT fk_nac_pais FOREIGN KEY (nac_pais) REFERENCES PAIS(pai_id)
);
-------------------------------------------------------------------------------


----------------------------------- APRECIACION -----------------------------------
Create table APRECIACION
(
  apr_id serial NOT NULL,
  apr_periodo integer NOT NULL,
  apr_solucion_problema integer NOT NULL,
  apr_conoce_negocio integer NOT NULL,
  apr_habilidad_social integer NOT NULL,
  apr_liderazgo integer NOT NULL,
  apr_auto_desarrollo integer NOT NULL,
  apr_auto_motivacion integer NOT NULL,
  apr_consolidado integer NOT NULL,
  apr_persona integer NOT NULL,
  CONSTRAINT apr_id_pk PRIMARY KEY (apr_id),
  CONSTRAINT fk_apr_persona FOREIGN KEY (apr_persona) REFERENCES ESTADO(est_id)
);
-------------------------------------------------------------------------------


----------------------------------- INFORMACION DE INTERES -----------------------------------
Create table INFORMACION
(
  inf_id serial NOT NULL,
  inf_tipo varchar(10) NOT NULL,
  inf_descripcion varchar(100) NOT NULL,
  CONSTRAINT inf_id_pk PRIMARY KEY (inf_id)
);
-------------------------------------------------------------------------------


----------------------------------- INFORMACION_PERSONA -----------------------------------
Create table INFORMACION_PERSONA
(
  inf_per_persona integer NOT NULL,
  inf_per_informacion integer NOT NULL,
  inf_per_descripcion varchar(150) NOT NULL,
  CONSTRAINT inf_per_cedula_pk PRIMARY KEY (inf_per_persona,inf_per_informacion),
  CONSTRAINT fk_inf_per_persona FOREIGN KEY (inf_per_persona) REFERENCES PERSONA(per_cedula),
  CONSTRAINT fk_inf_per_informacion FOREIGN KEY (inf_per_informacion) REFERENCES INFORMACION(inf_id)
);
-------------------------------------------------------------------------------


----------------------------------- CARGO -----------------------------------
Create table CARGO
(
  car_id serial NOT NULL,
  car_cargo varchar(10) NOT NULL,
  CONSTRAINT car_id_pk PRIMARY KEY (car_id)
);
-------------------------------------------------------------------------------


----------------------------------- TRAYECTORIA LABORAL -----------------------------------
Create table TRAYECTORIA 
(
  tra_id serial NOT NULL,
  tra_cargo integer NOT NULL,
  tra_persona integer NOT NULL,
  tra_pmc varchar(2) NOT NULL,
  tra_tipo_trabajo varchar(11) NOT NULL,
  tra_empresa varchar(100) NOT NULL,
  tra_fecha_inicio date NOT NULL,
  tra_fecha_fin date,
  CONSTRAINT check_tra_pmc CHECK (tra_pmc='SI' or tra_pmc='NO'),
  CONSTRAINT check_tra_tipo_trabajo CHECK (tra_tipo_trabajo='EMPRESA' or tra_pmc='INSTITUCION'),
  CONSTRAINT tra_id_pk  PRIMARY KEY (tra_id,tra_cargo,tra_persona),
  CONSTRAINT fk_tra_cargo FOREIGN KEY (tra_cargo) REFERENCES CARGO(car_id),
  CONSTRAINT fk_tra_persona FOREIGN KEY (tra_persona) REFERENCES PERSONA(per_cedula)
);
-------------------------------------------------------------------------------


----------------------------------- INSTITUCION -----------------------------------
Create table INSTITUCION
(
  ins_id serial NOT NULL,
  ins_nombre varchar(100) NOT NULL,
  CONSTRAINT ins_id_pk PRIMARY KEY (ins_id)
);
-------------------------------------------------------------------------------


----------------------------------- CAPACITACION -----------------------------------
Create table CAPACITACION
(
  cap_persona serial NOT NULL,
  cap_institucion integer NOT NULL,
  cap_curso varchar(100) NOT NULL,
  cap_descripcion varchar(150) NOT NULL,
  cap_fecha date NOT NULL,
  cap_horas integer NOT NULL,
  CONSTRAINT cap_id_pk PRIMARY KEY (cap_persona,cap_institucion,cap_curso),
  CONSTRAINT fk_cap_persona FOREIGN KEY (cap_persona) REFERENCES PERSONA(per_cedula),
  CONSTRAINT fk_cap_institucion FOREIGN KEY (cap_institucion) REFERENCES INSTITUCION(ins_id)
);
-------------------------------------------------------------------------------


----------------------------------- UNIVERSIDAD -----------------------------------
Create table UNIVERSIDAD
(
  uni_id serial NOT NULL,
  uni_nombre varchar(100) NOT NULL,
  uni_ciudad integer NOT NULL,
  CONSTRAINT uni_id_pk PRIMARY KEY (uni_id),
  CONSTRAINT fk_uni_ciudad FOREIGN KEY (uni_ciudad) REFERENCES CIUDAD(ciu_id)
);
-------------------------------------------------------------------------------


----------------------------------- EDUCACION FORMAL -----------------------------------
Create table EDUCACION
(
  edu_id serial NOT NULL,
  edu_persona integer NOT NULL,
  edu_universidad integer NOT NULL,
  edu_tipo varchar(100) NOT NULL,
  edu_carrera varchar(100) NOT NULL,
  edu_fecha_inicio date NOT NULL,
  edu_fecha_fin date,
  CONSTRAINT edu_id_pk PRIMARY KEY (edu_id,edu_persona,edu_universidad),
  CONSTRAINT check_edu_tipo CHECK (edu_tipo= 'Universitario Pregrado Carrera Larga' or edu_tipo= 'Universitario Pregrado Carrera Corta' or edu_tipo= 'Especializacion' or edu_tipo= 'Postgrado' or edu_tipo= 'Diplomado'),
  CONSTRAINT fk_edu_persona FOREIGN KEY (edu_persona) REFERENCES PERSONA(per_cedula),
  CONSTRAINT fk_edu_universidad FOREIGN KEY (edu_universidad) REFERENCES UNIVERSIDAD(uni_id)
);
-------------------------------------------------------------------------------


----------------------------------- CATEGORIA DE FORTALEZA -----------------------------------
Create table CATEGORIA
(
  cat_id varchar(3) NOT NULL,
  cat_categoria varchar(50) NOT NULL,
  cat_descripcion varchar(100) NOT NULL,
  CONSTRAINT cat_id_pk PRIMARY KEY (cat_id)
);
-------------------------------------------------------------------------------


---------------------------------- FORTALEZA HUMANA -----------------------------------
Create table FORTALEZA
(
  for_id varchar(3) NOT NULL,
  for_fortaleza varchar(20) NOT NULL,
  for_descripcion varchar(100) NOT NULL,
  for_valor_min integer NOT NULL,
  for_valor_max integer NOT NULL,
  for_categoria varchar(3) NOT NULL,
  CONSTRAINT for_id_pk PRIMARY KEY (for_id),
  CONSTRAINT fk_for_categoria FOREIGN KEY (for_categoria) REFERENCES CATEGORIA(cat_id)
);
--------------------------------------------------------------------------------


---------------------------------- INVENTARIO DE FORTALEZA -----------------------------------
Create table INVENTARIO_F
(
  inv_f_persona integer NOT NULL,
  inv_f_fortaleza varchar(3) NOT NULL,
  inv_f_pentil integer NOT NULL,
  inv_f_consolidado integer NOT NULL,
  inv_f_perfil integer NOT NULL,
  CONSTRAINT inv_f_id_pk PRIMARY KEY (inv_f_persona,inv_f_fortaleza),
  CONSTRAINT fk_inv_f_persona FOREIGN KEY (inv_f_persona) REFERENCES PERSONA(per_cedula),
  CONSTRAINT fk_inv_f_fortaleza FOREIGN KEY (inv_f_fortaleza) REFERENCES FORTALEZA(for_id)
);
--------------------------------------------------------------------------------


---------------------------------- TIPO DE COMPETENCIA -----------------------------------
Create table COMPETENCIA_T
(
  com_t_id varchar(3) NOT NULL,
  com_t_tipo varchar(20) NOT NULL,
  com_t_descripcion varchar(100) NOT NULL,
  CONSTRAINT com_t_id_pk PRIMARY KEY (com_t_id)
);
--------------------------------------------------------------------------------


---------------------------------- COMPETENCIA -----------------------------------
Create table COMPETENCIA
(
  com_id varchar(3) NOT NULL,
  com_competencia varchar(20) NOT NULL,
  com_descripcion varchar(100) NOT NULL,
  com_tipo varchar(3) NOT NULL,
  CONSTRAINT com_id_pk PRIMARY KEY (com_id),
  CONSTRAINT fk_com_tipo FOREIGN KEY (com_tipo) REFERENCES COMPETENCIA_T(com_t_id)
);
--------------------------------------------------------------------------------


---------------------------------- INVENTARIO DE COMPETENCIA -----------------------------------
Create table INVENTARIO_C
(
  inv_c_persona integer NOT NULL,
  inv_c_competencia varchar(3) NOT NULL,
  inv_c_pentil integer NOT NULL,
  inv_c_consolidado integer NOT NULL,
  inv_c_perfil integer,
  CONSTRAINT inv_c_id_pk PRIMARY KEY (inv_c_persona,inv_c_competencia),
  CONSTRAINT fk_inv_c_persona FOREIGN KEY (inv_c_persona) REFERENCES PERSONA(per_cedula),
  CONSTRAINT fk_inv_c_competencia FOREIGN KEY (inv_c_competencia) REFERENCES COMPETENCIA(com_id)
);
--------------------------------------------------------------------------------

---------------------------------- USUARIOS -----------------------------------
Create table USUARIOS
(
  usu_id varchar(32) NOT NULL,
  usu_contrasena varchar(64) NOT NULL,
  CONSTRAINT usu_id_pk PRIMARY KEY (usu_id)
);
--------------------------------------------------------------------------------
