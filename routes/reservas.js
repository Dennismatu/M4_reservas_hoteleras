//Importación de librerias necesarias
const express = require('express') //Express.js para manejo de rutas
const router = express.Router() //Creacion de un router Express

//Importamos el controlador de las reservas
const reservasController = require('../controllers/reservasController')

//Definimos la especificación de Swagger para la entidad Reserva
/**
 * @swagger
 * components:
 *  schemas:
 *      Reservas:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: El identificador unico de las reservas
 *              hotel:
 *                  type: string
 *                  description: El nombre del hotel reservado
 *              fecha_inicio:
 *                  type: string
 *                  format: date
 *                  description: La fecha de inicio de la reserva
 *              fecha_fin:
 *                  type: string
 *                  format: date
 *                  description: La fecha de fin de la reserva
 *              tipo_habitacion:
 *                  type: string
 *                  description: El tipo de habitacion reservada
 *              estado:
 *                  type: string
 *                  description: El estado de la reserva (Ej. Confirmada, Pendiente, Cancelada, etc.)
 *              num_huespedes:
 *                  type: integer
 *                  description: El número de huéspedes para la reserva
 *          required:
 *              - id
 *              - hotel
 *              - fecha_inicio
 *              - fecha_fin
 *              - tipo_habitacion
 *              - estado
 *              - num_huespedes
 *          example:
 *              id: 1
 *              hotel: California
 *              fecha_inicio: 2024-03-16
 *              fecha_fin: 2024-03-19
 *              tipo_habitacion: Doble
 *              estado: Confirmada
 *              num_huespedes: 5
 *
 */

//Endpoint para crear una nueva reserva
/**
 * @swagger
 * /api/reservas:
 *  post:
 *      tags:
 *          - reservas
 *      summary: Añade una nueva reserva
 *      requesBody:
 *          require: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Reservas'
 *          responses:
 *              201:
 *                  description: Reserva creada exitosamente
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Reservas'
 */
router.post('/', reservasController.create) //Asociamos el controlador de creacion de reservas

//Endpoint para obtener la lista de reservas
/**
 * @swagger
 * /api/reservas:
 *  get:
 *     tags:
 *          - reservas
 *     summary: Obten una lista de las reservas
 *     responses:
 *              200:
 *                  description: Lista de las reservas
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                          items:
 *                              $ref: '#/components/schemas/Reservas'
 */
router.get('/', reservasController.readAll) //Asociamos el controlador de lectura de todos los pedidos

//Endpoint para actualizar una reserva específica
/**
 * @swagger
 * /api/reservas/{id}:
 *  put:
 *      tags:
 *          - reservas
 *      summary: Actualiza información de una reserva en específico
 *      parameters:
 *          - in: path
 *            name: id
 *            description: Identificador único de la reserva
 *            schema:
 *              type: integer
 *            required: true
 *      requestBody:
 *          require: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Reservas'
 *      responses:
 *          200:
 *              description: Reserva actualizada correctamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Reservas'
 *          404:
 *              description: Reserva no encontrada
 */
router.put('/:id', reservasController.update) //Asociamos el controlador de actualización de una reserva

//Endpoint para eliminar una reserva específica
/**
 * @swagger
 * /api/reservas/{id}:
 *  delete:
 *      tags:
 *          - reservas
 *      summary: Eliminacion de una reserva en específico
 *      parameters:
 *          - in: path
 *            name: id
 *            description: Identificador único de la reserva
 *            schema:
 *              type: integer
 *            required: true
 *      responses:
 *          200:
 *              description: Reserva eliminada exitosamente
 *          404:
 *              description: Reserva no encontrada
 *
 */
router.delete('/:id', reservasController.delete) //Asociamos el controlador de eliminacion de una reserva

//Endpoint para buscar reservas con varios filtros
/**
 * @swagger
 * /api/reservas/search:
 *  get:
 *      tags:
 *          - reservas
 *      summary: Busqueda de reservas con filtros
 *      parameters:
 *          - in: query
 *            name: hotel
 *            description: Nombre del hotel
 *            schema:
 *              type: string
 *          - in: query
 *            name: fecha_inicio
 *            description: Fecha de inicio de la reservación
 *            schema:
 *              type: string
 *              format: date
 *          - in: query
 *            name: fecha_fin
 *            description: Fecha final de la reservación
 *            schema:
 *              type: string
 *              format: date
 *          - in: query
 *            name: tipo_habitacion
 *            description: Tipo de habitación reservada
 *            schema:
 *              type: string
 *          - in: query
 *            name: estado
 *            description: Estado en que se encuentra la reservación
 *            schema:
 *              type: string
 *          - in: query
 *            name: num_huespedes
 *            description: Número de huespedes de la reservación
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Despliegue de una lista que cumple con los criterios
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Reservas'
 *          404:
 *              description: No se encuentra ninguna reservación con esos datos
 */
router.get('/search', reservasController.filter) //Asociamos el controlador de búsqueda con filtros

//Endpoint para obtener información de una reserva en específico
/**
 * @swagger
 * /api/reservas/{id}:
 *  get:
 *      tags:
 *          - reservas
 *      summary: Obtener información de una reserva en específio
 *      parameters:
 *          - in: path
 *            name: id
 *            description: Identificador único de la reserva
 *            schema:
 *              type: integer
 *            required: true
 *      responses:
 *          200:
 *              description: Información de la reserva en específico
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Reservas'
 *          404:
 *              description: Reserva no encontrada
 *
 */
router.get('/:id', reservasController.readOne) //Asociamos el controlador de lectura de una reserva específico

//Exportamos el router para usarlo en otras partes de la aplicación
module.exports = router
