INSERT INTO
    public."Departamento" ("id", "nome", "descricao", "telefone")
VALUES
    (
        1,
        'Recursos Humanos',
        'Responsável pela gestão de pessoas e recrutamento',
        '1123456789'
    ),
    (
        2,
        'Financeiro',
        'Gerencia as finanças e orçamentos da empresa',
        '1134567890'
    ),
    (
        3,
        'Tecnologia da Informação',
        'Cuida dos sistemas e infraestrutura de TI',
        '1145678901'
    ),
    (
        4,
        'Marketing',
        'Planeja e executa estratégias de comunicação e vendas',
        '1156789012'
    ),
    (
        5,
        'Comercial',
        'Responsável pelas vendas e relacionamento com clientes',
        '1167890123'
    );

INSERT INTO
    public."Curso" (
        "id",
        "nome",
        "nivel",
        "tipo",
        "status",
        "localizacao"
    )
VALUES
    (
        1,
        'Engenharia de Software',
        1,
        2,
        true,
        'Campus Central'
    ),
    (
        2,
        'Administração de Empresas',
        1,
        2,
        true,
        'Campus Sul'
    ),
    (3, 'Design Gráfico', 1, 2, false, 'Campus Norte'),
    (4, 'Medicina', 1, 2, true, 'Campus Leste'),
    (5, 'Direito', 1, 2, false, 'Campus Oeste');

INSERT INTO
    public."Disciplina" (
        "id",
        "nome",
        "data_inicio",
        "data_fim",
        "descricao",
        "cursoId"
    )
VALUES
    (
        1,
        'Matemática Básica',
        '2024-02-01',
        '2024-06-30',
        'Introdução aos conceitos fundamentais de matemática.',
        1
    ),
    (
        2,
        'Física I',
        '2024-03-01',
        '2024-07-31',
        'Estudo de mecânica clássica e princípios de movimento.',
        1
    ),
    (
        3,
        'Programação em Python',
        '2024-01-15',
        '2024-05-15',
        'Curso introdutório de programação usando a linguagem Python.',
        1
    ),
    (
        4,
        'História do Brasil',
        '2024-04-01',
        '2024-08-30',
        'Exploração da história política, econômica e social do Brasil.',
        2
    ),
    (
        5,
        'Química Orgânica',
        '2024-05-01',
        '2024-09-15',
        'Estudo dos compostos orgânicos e suas reações.',
        4
    );

INSERT INTO
    public."Usuario" (
        "id",
        "nome",
        "email",
        "senha",
        "tipo",
        "foto",
        "RG",
        "CPF",
        "cursoId",
        "updatedAt"
    )
VALUES
    (
        1,
        'admin',
        'admin@mail.com',
        '$2a$12$ApbaWQ6ammnJcoiA6aaUauvZcqNZMo2.Sd9wqxR76UrCMTJnvWusK',
        1,
        'https://example.com/fotos/joao.jpg',
        '123456789',
        '123.456.789-00',
        1,
        '2000-01-08'
    );

INSERT INTO
    public."Mentoria" (
        "id",
        "nome",
        "localizacao",
        "data_inicio",
        "data_fim",
        "descricao",
        "mentor",
        "disciplinaId"
    )
VALUES
    (
        1,
        'Mentoria de Desenvolvimento Web',
        'Online',
        '2024-12-01 15:00:00',
        '2024-12-01 19:00:00',
        'Sessão focada em práticas modernas de desenvolvimento web e frameworks populares.',
        1,
        2
    );

INSERT INTO
    public."Avaliacao" (
        "id",
        "data_avaliacao",
        "nota_geral",
        "comentario",
        "recomendaria",
        "mentoriaId"
    )
VALUES
    (
        1,
        '2024-11-26',
        8,
        'A mentoria foi muito útil, com explicações claras e exemplos práticos.',
        true,
        1
    );

INSERT INTO
    public."Usuario_Disciplinas" ("usuarioId", "disciplinaId")
VALUES
    (1, 3),
    (1, 1);

INSERT INTO
    public."Usuario_Mentoria" ("usuarioId", "mentoriaId")
VALUES
    (1, 1);

INSERT INTO
    public."Curso_Departamento" ("cursoId", "departamentoId")
VALUES
    (1, 3),
    (2, 5),
    (3, 3),
    (4, 2),
    (5, 5);

SELECT
    setval (
        pg_get_serial_sequence ('"Departamento"', 'id'),
        coalesce(max(id) + 1, 1),
        false
    )
FROM
    "Departamento";

SELECT
    setval (
        pg_get_serial_sequence ('"Usuario"', 'id'),
        coalesce(max(id) + 1, 1),
        false
    )
FROM
    "Usuario";

SELECT
    setval (
        pg_get_serial_sequence ('"Avaliacao"', 'id'),
        coalesce(max(id) + 1, 1),
        false
    )
FROM
    "Avaliacao";

SELECT
    setval (
        pg_get_serial_sequence ('"Curso"', 'id'),
        coalesce(max(id) + 1, 1),
        false
    )
FROM
    "Curso";


SELECT
    setval (
        pg_get_serial_sequence ('"Disciplina"', 'id'),
        coalesce(max(id) + 1, 1),
        false
    )
FROM
    "Disciplina";

SELECT
    setval (
        pg_get_serial_sequence ('"Mentoria"', 'id'),
        coalesce(max(id) + 1, 1),
        false
    )
FROM
    "Mentoria";