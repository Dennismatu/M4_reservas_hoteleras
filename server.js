//Importacion de librerias
const express = require('express') //Express.js para la creación del servidor
const cors = require('cors') //CORS porporciona un middleware para habilitar intercambio de recursos de origen cruzado
const swaggerUI = require('swagger-ui-express') //Libreria para la interfaz de la documentación de la API
const swaggerJsDoc = require('swagger-jsdoc') //Genera la documentación a partir de comentarios en el código
const path = require('path') //path para trabajar con rutas de archivos y directorios
const { monitorEventLoopDelay } = require('perf_hooks')

//Carga de las variables de entorno del archivo .env
require('dotenv').config()

//Definición del puerto en el que trabajará la aplicación
const port = process.env.PORT || 3000

//Se define la URL del servidor que se utilizará en la configuración de Swagger
//Aquí se establece que si la variable de entorno SERVER_URL no esta definida, usamos 'http://localhost:{port}' por defecto
const serverUrl = process.env.SERVER_URL || `http://localhost:${port}`

//Configuracion de las opciones para SwaggerJsDoc
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            description:
                'This is a simple demo of a Rest API developed with NodeJS, Express and using Swagger for documentation.',
            title: 'Node API for Hotel Reservations',
            version: '1.0.0',
        },
        servers: [
            {
                description: 'Servidor de prueba y puerto usado',
                url: serverUrl,
            },
        ],
        tags: [
            {
                name: 'reservas',
                description: 'Todo sobre tu reserva',
                externalDocs: {
                    description: 'Find out more',
                    url: 'https://github.com/U-Camp/7M_FULLSTACK_M4_PROY',
                },
            },
        ],
    },

    //Ruta de los archivos donde se buscarán los comentarios para generar la documentación
    apis: [`${path.join(__dirname, './routes/*.js')}`],
}

//Generación de la documentación de la API
const swaggerDocs = swaggerJsDoc(swaggerOptions)

//Creación de una nueva aplicación Express
const app = express()

//Añadimos el Middleware CORS a la aplicacion
app.use(cors())

//Añadimos el Middleware para parsear el cuerpo JSON de las solicitudes
app.use(express.json())

//DEFINICION DE LAS RUTAS DE LA API
app.use('/api/reservas', require('./routes/reservas')) //La ruta para '/api/reservas'

//Despliegue de la interfaz de usuario de Swagger con la documentacion generada en la ruta raíz
app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

//Se inicia el servidor en el puerto especificado
app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`))
