import {ZoomInterface} from './zoom.interface';
import {AulaInterface} from './aula.interface';

export interface ZoomAulasInterface {

    zoom: ZoomInterface,
    codigo: string,
    aula: AulaInterface

}

/*

{
    "array": [
        {
            "zoom": {
                "topic": "sesion1",
                "duration": "120",
                "enlace_zoom": null,
                "password": "admin",
                "usuario_cuenta": "MARCOS ROBELLY",
                "start_time": "2020-07-20T20:00:00.000Z",
                "nombre_profesor": null,
                "meeting_id": null,
                "estado_zoom": null,
                "capacitacion": "Matematicas",
                "codigo_zoom": null
            },
            "codigo": "a8dcb053",
            "aula": {
                "nombre_aula": "MAT-01",
                "capacidad": 20,
                "fecha_inicio": "2020-07-20T20:00:00.000Z",
                "fecha_fin": "2020-07-20T22:00:00.000Z",
                "hora_aula_inicio": "20:00:00",
                "hora_aula_fin": "22:00:00",
                "zoom": null,
                "curso": null
            }
        }
    ]
}

*/