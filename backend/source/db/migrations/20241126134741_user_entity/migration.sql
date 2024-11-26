/*
  Warnings:

  - You are about to drop the `CursoOnDepartamento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsuarioOnDisciplinas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsuarioOnMentoria` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cursoId` to the `Disciplina` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CursoOnDepartamento" DROP CONSTRAINT "CursoOnDepartamento_cursoId_fkey";

-- DropForeignKey
ALTER TABLE "CursoOnDepartamento" DROP CONSTRAINT "CursoOnDepartamento_departamentoId_fkey";

-- DropForeignKey
ALTER TABLE "UsuarioOnDisciplinas" DROP CONSTRAINT "UsuarioOnDisciplinas_disciplinaId_fkey";

-- DropForeignKey
ALTER TABLE "UsuarioOnDisciplinas" DROP CONSTRAINT "UsuarioOnDisciplinas_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "UsuarioOnMentoria" DROP CONSTRAINT "UsuarioOnMentoria_mentoriaId_fkey";

-- DropForeignKey
ALTER TABLE "UsuarioOnMentoria" DROP CONSTRAINT "UsuarioOnMentoria_usuarioId_fkey";

-- AlterTable
ALTER TABLE "Disciplina" ADD COLUMN     "cursoId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "CursoOnDepartamento";

-- DropTable
DROP TABLE "UsuarioOnDisciplinas";

-- DropTable
DROP TABLE "UsuarioOnMentoria";

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
ALTER TABLE "Disciplina" ADD CONSTRAINT "Disciplina_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario_Mentoria" ADD CONSTRAINT "Usuario_Mentoria_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario_Mentoria" ADD CONSTRAINT "Usuario_Mentoria_mentoriaId_fkey" FOREIGN KEY ("mentoriaId") REFERENCES "Mentoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario_Disciplinas" ADD CONSTRAINT "Usuario_Disciplinas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario_Disciplinas" ADD CONSTRAINT "Usuario_Disciplinas_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "Disciplina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Curso_Departamento" ADD CONSTRAINT "Curso_Departamento_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Curso_Departamento" ADD CONSTRAINT "Curso_Departamento_departamentoId_fkey" FOREIGN KEY ("departamentoId") REFERENCES "Departamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
