-- DropForeignKey
ALTER TABLE "Curso_Departamento" DROP CONSTRAINT "Curso_Departamento_cursoId_fkey";

-- DropForeignKey
ALTER TABLE "Curso_Departamento" DROP CONSTRAINT "Curso_Departamento_departamentoId_fkey";

-- AddForeignKey
ALTER TABLE "Curso_Departamento" ADD CONSTRAINT "Curso_Departamento_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Curso_Departamento" ADD CONSTRAINT "Curso_Departamento_departamentoId_fkey" FOREIGN KEY ("departamentoId") REFERENCES "Departamento"("id") ON DELETE CASCADE ON UPDATE CASCADE;
