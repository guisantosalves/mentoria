-- DropForeignKey
ALTER TABLE "Usuario_Disciplinas" DROP CONSTRAINT "Usuario_Disciplinas_disciplinaId_fkey";

-- DropForeignKey
ALTER TABLE "Usuario_Disciplinas" DROP CONSTRAINT "Usuario_Disciplinas_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "Usuario_Mentoria" DROP CONSTRAINT "Usuario_Mentoria_mentoriaId_fkey";

-- DropForeignKey
ALTER TABLE "Usuario_Mentoria" DROP CONSTRAINT "Usuario_Mentoria_usuarioId_fkey";

-- AddForeignKey
ALTER TABLE "Usuario_Mentoria" ADD CONSTRAINT "Usuario_Mentoria_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario_Mentoria" ADD CONSTRAINT "Usuario_Mentoria_mentoriaId_fkey" FOREIGN KEY ("mentoriaId") REFERENCES "Mentoria"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario_Disciplinas" ADD CONSTRAINT "Usuario_Disciplinas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario_Disciplinas" ADD CONSTRAINT "Usuario_Disciplinas_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "Disciplina"("id") ON DELETE CASCADE ON UPDATE CASCADE;
