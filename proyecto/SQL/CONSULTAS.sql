-----------PERSONAS CON SUS NUMEROS DE TELEFONO------------
SELECT per_ven,per_cedula,per_nombre,per_apellido,tel_cod_area,tel_numero,tel_tipo FROM PERSONA,TELEFONO WHERE per_cedula=tel_persona;

-----------PERSONAS CON SUS TRAYECTORIA LABORAL------------
SELECT per_ven,per_cedula,per_nombre,per_apellido,car_cargo,tra_tipo_trabajo,tra_empresa,tra_fecha_inicio,tra_fecha_fin FROM PERSONA,TRAYECTORIA,CARGO WHERE per_cedula=tra_persona AND tra_cargo=car_id

-----------CURRICULUM -----------
SELECT per_ven,per_cedula,per_nombre,per_nombre2,per_apellido,per_apellido2,pai_nacionalidad,per_edo_civil,per_fecha_nacimiento,
dir_direccion,ciu_nombre,tel_cod_area,tel_numero,per_correo,pro_profesion,uni_nombre,edu_carrera, edu_fecha_inicio, edu_fecha_fin,
car_cargo,tra_tipo_trabajo,tra_empresa,tra_fecha_inicio,tra_fecha_fin
FROM PERSONA,NACIONALIDAD,DIRECCION,CIUDAD,TELEFONO,PROFESION,PAIS,EDUCACION,UNIVERSIDAD,TRAYECTORIA,CARGO
WHERE per_cedula=nac_persona AND nac_pais=pai_id AND dir_ciudad=ciu_id AND per_cedula=dir_persona AND per_cedula=tel_persona AND per_profesion=pro_id
AND edu_universidad=uni_id AND edu_persona=per_cedula AND per_cedula=tra_persona AND tra_cargo=car_id