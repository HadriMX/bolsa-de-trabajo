export class Vacante {
    id_vacante: number;
    titulo_vacante: string;
    fecha_publicacion: Date;
    id_empresa: number;
    nombre_empresa: string;
    puesto: string;
    descripcion_puesto: string;
    descripcion_puesto_plain_text: string;
    id_area_puesto: number;
    id_area_estudio: number;
    area_estudio: string;
    sueldo: number;
    genero: string;
    direccion: string;
    id_entidad_federativa: number;
    entidad_federativa: string;
    estatus: string;
    // categoria: string;   FALTAN EN LA BD AL REGRISTRAR VACANTE
    // subcategoria: string;

    constructor() {
        this.titulo_vacante = '';
        this.id_empresa = -1;
        this.puesto = '';
        this.descripcion_puesto = '';
        this.descripcion_puesto_plain_text = '';
        this.id_area_estudio = -1;
        this.sueldo = undefined;
        this.genero = '';
        this.direccion = '';
        this.id_entidad_federativa = -1;
        this.estatus = '';
    }
}
