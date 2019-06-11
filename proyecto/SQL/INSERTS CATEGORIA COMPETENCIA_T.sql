INSERT INTO CATEGORIA VALUES('SAB','SABIDURIA','Fortalezas cognitivas que implican la adquisición y el uso del conocimiento.');
INSERT INTO CATEGORIA VALUES('COR','CORAJE','Fortalezas emocionales que implican la consecución de metas ante situaciones de dificultad.');
INSERT INTO CATEGORIA VALUES('HUM','HUMANIDAD','Fortalezas interpersonales que implican cuidar y ofrecer amistad y cariño a los demás.');
INSERT INTO CATEGORIA VALUES('JUS','JUSTICIA','Fortalezas cívicas que conllevan una vida en comunidad saludable.');
INSERT INTO CATEGORIA VALUES('TEM','TEMPLANZA','Moderación:Fortalezas que nos protegen contra los excesos.');
INSERT INTO CATEGORIA VALUES('TRA','TRASCENDENCIA','Fortalezas que forjan conexiones con la inmensidad del universo y proveen de significado la vida.');

INSERT INTO FORTALEZA VALUES('CUR','CURIOSIDAD','interés por el mundo. Tener interés por lo que sucede en el mundo, explorar y descubir nuevas cosas.',1,5,'SAB');
INSERT INTO FORTALEZA VALUES('CON','CONOCIMIENTO','Amor por el conocimiento y el aprendizaje. Llegar a dominar nuevas materias y conocimientos.',1,5,'SAB');
INSERT INTO FORTALEZA VALUES('JUI','JUICIO','Juicio, pensamiento crítico, mentalidad abierta.',1,5,'SAB');
INSERT INTO FORTALEZA VALUES('VAL','VALENTÍA','Enfretar las situaciones',1,5,'COR');
INSERT INTO FORTALEZA VALUES('PER','PERSEVERANCIA','Constante en sus convicciones',1,5,'COR');
INSERT INTO FORTALEZA VALUES('CRE','CREATIVIDAD','Generar soluciones facilmente',1,5,'SAB');
INSERT INTO FORTALEZA VALUES('INT','INTEGRIDAD','Siempre busca la forma de hacer lo correcto',1,5,'COR');
INSERT INTO FORTALEZA VALUES('ENT','ENTUSIASMO','Realiza las actividades con animos',1,5,'COR');
INSERT INTO FORTALEZA VALUES('BON','BONDAD','Inclinacion a hacer el bien',1,5,'HUM');
INSERT INTO FORTALEZA VALUES('AMO','AMOR','Amor por el ambiente de trabajo y para con sus compañeros.',1,5,'HUM');
INSERT INTO FORTALEZA VALUES('INS','INTELIGENCIA SOCIAL','Buenas conductas con sus compañeros, ayudan al rendimiento',1,5,'HUM');
INSERT INTO FORTALEZA VALUES('CIV','CIVISMO','Buen comportamiento',1,5,'JUS');
INSERT INTO FORTALEZA VALUES('PES','PERSPECTIVA','Ver las situaciones desde distintas perspectivas',1,5,'SAB');
INSERT INTO FORTALEZA VALUES('IMP','IMPARCIALIDAD','Asimilar las situaciones sin tener preferencias que condicionen las decisiones',1,5,'JUS');
INSERT INTO FORTALEZA VALUES('LID','LIDERAZGO','Capacidad para liderar',1,5,'JUS');
INSERT INTO FORTALEZA VALUES('ACO','AUTOCONTROL','Tener control de las emociones',1,5,'TEM');
INSERT INTO FORTALEZA VALUES('PRU','PRUDENCIA','No tomar deciciones a la ligera',1,5,'TEM');
INSERT INTO FORTALEZA VALUES('HUM','HUMILDAD','Conocer sus propias limitaciones y debilidades',1,5,'TEM');
INSERT INTO FORTALEZA VALUES('PED','PERDON','Capacidad para perdonar',1,5,'TEM');
INSERT INTO FORTALEZA VALUES('GRA','GRATITUD','Ser agradecido',1,5,'TRA');
INSERT INTO FORTALEZA VALUES('EPZ','ESPERANZA','Ser optimista',1,5,'TRA');
INSERT INTO FORTALEZA VALUES('ESP','ESPIRITUALIDAD','Bienestar espiritual',1,5,'TRA');
INSERT INTO FORTALEZA VALUES('BEL','BELLEZA','Belleza en calidad de persona',1,5,'TRA');
INSERT INTO FORTALEZA VALUES('HMR','HUMOR','Puede tomarse las situaciones con humor y sacar provecho de esto',1,5,'TRA');



INSERT INTO COMPETENCIA_T VALUES('INS','INSTRUMENTAL','Competencias Instrumentales');
INSERT INTO COMPETENCIA_T VALUES('EMO','EMOCIONAL','Competencias Emocionales');
INSERT INTO COMPETENCIA_T VALUES('GER','GERENCIAL','Competencias Gerenciales');
INSERT INTO COMPETENCIA_T VALUES('POT','POTENCIADORA','Competencias Potenciadoras');
INSERT INTO COMPETENCIA_T VALUES('DES','DESEMPENO','Evaluacion del Desempeno');
INSERT INTO COMPETENCIA_T VALUES('APR','APRECIACION','Apreciacion del Supervisor');

INSERT INTO COMPETENCIA VALUES('RA','Razonamiento Abstracto','INS');
INSERT INTO COMPETENCIA VALUES('RV','Razonamiento Verbal','INS');
INSERT INTO COMPETENCIA VALUES('HN','Habilidad Numerica','INS');
INSERT INTO COMPETENCIA VALUES('VEL','VELOCIDAD','INS');
INSERT INTO COMPETENCIA VALUES('PRE','PRECISIÓN','INS');
INSERT INTO COMPETENCIA VALUES('IPD','Índice de Potencial de Desempeño: corresponde al resultado consolidado de las competencias instrumentales','INS');
INSERT INTO COMPETENCIA VALUES('ASE','Asertividad','POT');
INSERT INTO COMPETENCIA VALUES('LOC','Locus de Control o Responsabilidad: representa el nivel de responsabilidad del sujeto en términos del origen de la causalidad de los acontecimientos','POT');
INSERT INTO COMPETENCIA VALUES('LGR','Logro','POT');
INSERT INTO COMPETENCIA VALUES('IOE','Índice de Orientación al Éxito: representa el resultado consolidado de las competencias potenciadoras','POT');
INSERT INTO COMPETENCIA VALUES('TCO','Test de Capacidad Organizativa compuesto por Velocidad y Precisión','INS');
INSERT INTO COMPETENCIA VALUES('ATE','ATENCIÓN','EMO');
INSERT INTO COMPETENCIA VALUES('CLA','CLARIDAD','EMO');
INSERT INTO COMPETENCIA VALUES('CTR','CONTROL','EMO');
INSERT INTO COMPETENCIA VALUES('SPR','SOLUCIÓN DE PROBLEMAS','APR');
INSERT INTO COMPETENCIA VALUES('B','Desempeño Superior','DES');
INSERT INTO COMPETENCIA VALUES('C+','Desempeño de acuerdo a lo esperado alto','DES');
INSERT INTO COMPETENCIA VALUES('C','Desempeño de acuerdo a lo esperado','DES');
INSERT INTO COMPETENCIA VALUES('C-','Desempeño de acuerdo a lo esperado Bajo','DES');
INSERT INTO COMPETENCIA VALUES('D','Desempeño Inaceptable','DES');
INSERT INTO COMPETENCIA VALUES('CNG','CONOCIMIENTO DEL NEGOCIO','APR');
INSERT INTO COMPETENCIA VALUES('HSO','HABILIDAD SOCIAL','APR');
INSERT INTO COMPETENCIA VALUES('LZG','LIDERAZGO','APR');
INSERT INTO COMPETENCIA VALUES('ADE','AUTODESARROLLO','APR');
INSERT INTO COMPETENCIA VALUES('ACR','AUTOCONTROL','DES');
INSERT INTO COMPETENCIA VALUES('A','Desempeño Extraordinario','DES');



INSERT INTO INFORMACION VALUES(1,'PROYECTOS','Participacion en proyectos de la empresa');
INSERT INTO INFORMACION VALUES(2,'RECONOCIMIENTOS','Reconocimientos por implatacion de mejoras en el proceso de innovacion');