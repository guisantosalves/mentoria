/*
  Warnings:

  - Added the required column `cursoId` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "cursoId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Mentoria" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "localizacao" TEXT NOT NULL,
    "data_inicio" TIMESTAMP(3) NOT NULL,
    "data_fim" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT NOT NULL,
    "mentor" TEXT NOT NULL,
    "avaliacaoId" INTEGER NOT NULL,
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

    CONSTRAINT "Avaliacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Disciplina" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "data_inicio" TIMESTAMP(3) NOT NULL,
    "data_fim" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT NOT NULL,

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
CREATE TABLE "UsuarioOnMentoria" (
    "usuarioId" INTEGER NOT NULL,
    "mentoriaId" INTEGER NOT NULL,

    CONSTRAINT "UsuarioOnMentoria_pkey" PRIMARY KEY ("usuarioId","mentoriaId")
);

-- CreateTable
CREATE TABLE "UsuarioOnDisciplinas" (
    "usuarioId" INTEGER NOT NULL,
    "disciplinaId" INTEGER NOT NULL,

    CONSTRAINT "UsuarioOnDisciplinas_pkey" PRIMARY KEY ("usuarioId","disciplinaId")
);

-- CreateTable
CREATE TABLE "CursoOnDepartamento" (
    "cursoId" INTEGER NOT NULL,
    "departamentoId" INTEGER NOT NULL,

    CONSTRAINT "CursoOnDepartamento_pkey" PRIMARY KEY ("cursoId","departamentoId")
);

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mentoria" ADD CONSTRAINT "Mentoria_avaliacaoId_fkey" FOREIGN KEY ("avaliacaoId") REFERENCES "Avaliacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mentoria" ADD CONSTRAINT "Mentoria_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "Disciplina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioOnMentoria" ADD CONSTRAINT "UsuarioOnMentoria_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioOnMentoria" ADD CONSTRAINT "UsuarioOnMentoria_mentoriaId_fkey" FOREIGN KEY ("mentoriaId") REFERENCES "Mentoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioOnDisciplinas" ADD CONSTRAINT "UsuarioOnDisciplinas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsuarioOnDisciplinas" ADD CONSTRAINT "UsuarioOnDisciplinas_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "Disciplina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CursoOnDepartamento" ADD CONSTRAINT "CursoOnDepartamento_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CursoOnDepartamento" ADD CONSTRAINT "CursoOnDepartamento_departamentoId_fkey" FOREIGN KEY ("departamentoId") REFERENCES "Departamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
