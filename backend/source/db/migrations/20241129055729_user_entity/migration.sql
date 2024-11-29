-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "tipo" INTEGER NOT NULL DEFAULT 0,
    "foto" TEXT NOT NULL,
    "RG" TEXT NOT NULL,
    "CPF" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "cursoId" INTEGER NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mentoria" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "localizacao" TEXT NOT NULL,
    "data_inicio" TIMESTAMP(3) NOT NULL,
    "data_fim" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT NOT NULL,
    "mentor" INTEGER NOT NULL,
    "disciplinaId" INTEGER NOT NULL,

    CONSTRAINT "Mentoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Avaliacao" (
    "id" SERIAL NOT NULL,
    "data_avaliacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nota_geral" INTEGER NOT NULL,
    "comentario" TEXT NOT NULL,
    "recomendaria" BOOLEAN NOT NULL,
    "mentoriaId" INTEGER NOT NULL,

    CONSTRAINT "Avaliacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Disciplina" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "data_inicio" TIMESTAMP(3) NOT NULL,
    "data_fim" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT NOT NULL,
    "cursoId" INTEGER NOT NULL,

    CONSTRAINT "Disciplina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Curso" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "nivel" INTEGER NOT NULL,
    "tipo" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL,
    "localizacao" TEXT NOT NULL,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Departamento" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,

    CONSTRAINT "Departamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario_Mentoria" (
    "usuarioId" INTEGER NOT NULL,
    "mentoriaId" INTEGER NOT NULL,

    CONSTRAINT "Usuario_Mentoria_pkey" PRIMARY KEY ("usuarioId","mentoriaId")
);

-- CreateTable
CREATE TABLE "Usuario_Disciplinas" (
    "usuarioId" INTEGER NOT NULL,
    "disciplinaId" INTEGER NOT NULL,

    CONSTRAINT "Usuario_Disciplinas_pkey" PRIMARY KEY ("usuarioId","disciplinaId")
);

-- CreateTable
CREATE TABLE "Curso_Departamento" (
    "cursoId" INTEGER NOT NULL,
    "departamentoId" INTEGER NOT NULL,

    CONSTRAINT "Curso_Departamento_pkey" PRIMARY KEY ("cursoId","departamentoId")
);

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mentoria" ADD CONSTRAINT "Mentoria_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "Disciplina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacao" ADD CONSTRAINT "Avaliacao_mentoriaId_fkey" FOREIGN KEY ("mentoriaId") REFERENCES "Mentoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disciplina" ADD CONSTRAINT "Disciplina_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario_Mentoria" ADD CONSTRAINT "Usuario_Mentoria_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario_Mentoria" ADD CONSTRAINT "Usuario_Mentoria_mentoriaId_fkey" FOREIGN KEY ("mentoriaId") REFERENCES "Mentoria"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario_Disciplinas" ADD CONSTRAINT "Usuario_Disciplinas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario_Disciplinas" ADD CONSTRAINT "Usuario_Disciplinas_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "Disciplina"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Curso_Departamento" ADD CONSTRAINT "Curso_Departamento_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Curso_Departamento" ADD CONSTRAINT "Curso_Departamento_departamentoId_fkey" FOREIGN KEY ("departamentoId") REFERENCES "Departamento"("id") ON DELETE CASCADE ON UPDATE CASCADE;
