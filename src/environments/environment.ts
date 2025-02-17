// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    hmr: false,
   // url: 'http://localhost:3000',
    url: 'http://20.51.234.239:3000',
    id_usuario: 0,
    nombre_login: '',
    estado_usuario: false,
    estado_usuario_cuenta: false,
    nombres_usuario: '',
    apellidos_usuario: '',
    tokenKey: 'Amauta',
    nombreUsuario: '',
    fotoUsuario: '',
    dislexiaFonologica: [],
    dislexiaVisual: [],
    rolUsuario: 'Administrador',
    email: '',
    idProfesor: '',

    idCuento: '',
    idEstudiante: '',
    idPuntaje: 0,
    idProfesorRegistrado: undefined

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
