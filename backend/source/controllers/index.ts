import { Departamento } from "./departamento";
import { Login } from "./login";
import { User } from "./usuario";
import { Avaliacao } from "./avaliacao";
import { Curso } from "./curso";
import { Disciplina } from "./disciplina";
import { Mentoria } from "./mentoria";

export const UserController = new User();
export const LoginController = new Login();
export const DepController = new Departamento();
export const AvaliacaoController = new Avaliacao();
export const CursoController = new Curso();
export const DisciplinaController = new Disciplina();
export const MentoriaController = new Mentoria();
