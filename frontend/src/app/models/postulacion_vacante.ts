//este modelo es utilizado solamente el componente vacantes-postulaciones

export class PostulacionVacante{
    id_candidato: number;
    id_vacante: number;
    nombre: string;
    edad: number;
    genero: string;
    fecha_postulacion: string;

    telefono: string;
    email: string;

    escuela: string;
    area_estudio: string;
    grado_estudio: string;
    
    ruta_curp: string;
    ruta_cv: string;
    ruta_id: string;

    estatus: string;
}