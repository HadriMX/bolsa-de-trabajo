export class Vacante {
    id_vacante: number;
    titulo_vacante: string;
    fecha_publicacion: Date;
    id_empresa: number;
    nombre_empresa: string;
    puesto: string;
    descripcion_puesto: string;
    id_area_puesto: number;
    area_estudio: string;
    id_subarea_estudio: number;
    subarea_estudio: string;
    sueldo: number;
    genero: string;
    direccion: string;
    id_entidad_federativa: number;
    entidad_federativa: string;
    estatus: string;
    // categoria: string;   FALTAN EN LA BD AL REGRISTRAR VACANTE
    // subcategoria: string;
}
