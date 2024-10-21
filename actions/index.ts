import { cursoAction } from './curso'
import { EmpresaAction } from './empresa'
import { favoritosAction } from './favoritos'
import { usuarioAction } from './usuario'
import { vagaAction } from './vaga'

export const action = {
    usuario: usuarioAction,
    favoritos: favoritosAction,
    cursos: cursoAction,
    empresa: EmpresaAction,
    vaga: vagaAction,
}