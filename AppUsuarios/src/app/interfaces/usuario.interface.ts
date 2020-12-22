export interface UsuarioResponse {
  exito: boolean;
  id: number;
  id_rol: number;
  desc_rol?: 'SUCURSAL' | 'VALIDADOR' | 'DISTRIBUIDOR';
}
