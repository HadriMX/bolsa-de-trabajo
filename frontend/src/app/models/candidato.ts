import { Usuario } from './usuario';

export class Candidato extends Usuario {
    apellido1: string;
    apellido2: string;
    calle: string;
    ciudad: string;
    colonia: string;
    cp: string;
    fecha_nacimiento: string;
    genero: string;
    id_area_estudio: number;
    id_entidad_federativa: number;
    id_grado_estudios: number;
    id_municipio: number;
    id_subarea_estudio: number;
    nombre: string;
    ruta_cv: string;
    telefono: string;
    id_tipo_usuario: number = 1;
}