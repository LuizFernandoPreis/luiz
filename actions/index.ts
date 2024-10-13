import { cursoAction } from './curso'
import { favoritosAction } from './favoritos'
import { usuarioAction } from './usuario'

export const action = {
    usuario: usuarioAction,
    favoritos: favoritosAction,
    cursos: cursoAction,
}