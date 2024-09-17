import { usuarioAction } from './usuario'
import { ufAction } from './uf'
import { cidadeAction } from './cidade'
import { enderecoAction } from './endereco'
import { clienteAction } from './cliente'

export const action = {
    usuario: usuarioAction,
    uf: ufAction,
    cidade: cidadeAction,
    endereco: enderecoAction,
    cliente: clienteAction,
}