import { Usuario } from './usuario';

export class Empresa extends Usuario {
    nombre_empresa: string;
    rfc: string;
    calle: string;
    colonia: string;
    cp: string;
    ciudad: string;
    id_municipio: number;
    id_entidad_federativa: number;
    id_tipo_empresa: number;
    telefono: string;
    descripcion:string;
    pagina_web:string;
    nombre_persona_contacto:string;
    telefono_contacto:string;
    email_contacto:string;    
    id_tipo_usuario: number = 2;
}