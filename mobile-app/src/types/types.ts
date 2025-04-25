// tipos para requests no backend

export interface Login {
  email: string;
  senha: string;
}

// TIPO -> 0 - ALUNO / 1 - MENTOR / 2 - ADMIN
export interface Usuario {
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  rg: string;
  foto?: string;
  cursoId: number;
  tipo: number;
  disciplinas: number[];
  mentorias: number[];
}


export interface Departamento {
  id?: number;
  nome: string;
  descricao: string;
  telefone: string;
  cursos: number[];
}

export interface Avaliacao {
  id?: number;
  comentario: string;
  nota_geral: number;
  recomendaria: boolean;
  mentoriaId: number;
}

// tipo -> 1 - presencial | 2 - online | 3 - híbrido
// nível -> 1: Médio | 2: Superior | 3: Pós-graduação
export interface Curso {
  id?: number;
  nome: string;
  nivel: number;
  tipo: number;
  status: boolean;
  localizacao: string;
  departamentos: number[];
}

// exemple of date: 2002-02-15 (YYYY/MM/DD)
export interface Disciplina {
  id?: number;
  nome: string;
  data_inicio: string;
  data_fim: string;
  descricao: string;
  cursoId: number;
  usuarios?: number[];
}

export interface Mentoria {
  id?: number;
  nome: string;
  data_fim: string;
  data_inicio: string;
  descricao: string;
  localizacao: string;
  mentor: number;
  disciplinaId: number;
  usuarios: number[];
}

// different responses
export interface LoginResponse {
  status: number;
  success: boolean;
  message: string;
  token: string;
}

interface AvaliacaoResponse {
  id: number;
  data_avaliacao: string;
  nota_geral: number;
  comentario: string;
  recomendaria: boolean;
  mentoriaId: number;
}

interface UsuarioResponse {
  usuarioId: number;
  mentoriaId: number;
}

export interface MentoriaDetails {
  nome: string;
  data_fim: string;
  data_inicio: string;
  descricao: string;
  localizacao: string;
  mentor: number;
  disciplinaId: number;
  usuarios: UsuarioResponse[];
  avaliacoes: AvaliacaoResponse[];
}

export type UsuarioAndMentoria = {
  id?: number;
  nome: string;
  cpf: string;
  email: string;
  foto: string;
  rg: string;
  senha: string;
  cursoId: number;
  tipo: number;
  disciplinas: number[];
  mentorias: Mentoria[];
};

export interface DisciplineWithMentoria extends Disciplina {
  mentorias: Mentoria[];
}

export interface CursoWithDisciplina extends Curso {
  Disciplina: Disciplina[];
}
