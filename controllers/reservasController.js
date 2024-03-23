//Inicializamos las reservas
let reservas = [
    {
        id: 1,
        hotel: 'Holliday',
        fecha_inicio: '2024-03-19',
        fecha_fin: '2024-03-23',
        tipo_habitacion: 'Sencilla',
        estado: 'Confirmada',
        num_huespedes: 5,
    },
]

//Endpoint utilizado para la creacion de una reserva
exports.create = async (req, res) => {
    const newReserva = req.body //Obtenemos la información del pedido desde el cuerpo de la solicitud
    newReserva.id = reservas.length + 1 //Asignacion de ID´s a los pedidos
    reservas.push(newReserva) //Agregamos la reserva a la lista de reservas

    res.status(201).json({
        //Respuesta con un código de estado 201 (Created) y la nueva reserva
        msg: 'Reserva realizada con éxito',
        data: newReserva,
    })
}

//Endpoint utilizado para obtener la lista de las reservas
exports.readAll = async (req, res) => {
    res.json({
        //Respondemos con la lista de reservas
        msg: 'Reservas enlistadas exitosamente',
        data: reservas,
    })
}

//Endpoint utilizado para obtener la información de un pedido en específico
exports.readOne = async (req, res) => {
    const reservaID = parseInt(req.params.id) //Obtenemos el ID de la reserva desde los parámetros de la ruta
    const reserva = reservas.find((o) => o.id === reservaID) //Buscamos la reserva en la lista de reservas

    if (!reserva) {
        return res.status(404).json({ msg: 'Reserva no encontrada ' })
    }

    res.json({
        //Si se encuentra la reserva, se devuelve los datos de dicha reserva
        msg: 'Reserva encontrada con éxito',
        data: reserva,
    })
}

//Endpoint utilizado para actualizar la informacion de una reserva en específico
exports.update = async (req, res) => {
    const reservaID = parseInt(req.params.id) //Obtenemos el ID de la reserva desde los parámetros de la ruta
    const reservaIndex = reservas.findIndex((o) => o.id === reservaID) //Buscamos el índice de la reserva en la lista de reservas

    if (reservaIndex === -1) {
        //Si no encontramos la reserva, respondemos con un código de estado 404 (Not Found)
        return res.status(404).json({ msg: 'Reserva no encontrada' })
    }

    reservas[reservaIndex] = { ...reservas[reservaIndex], ...req.body } //Actualizamos la reserva con la información

    res.json({
        //Respondemos con la reserva actualizada
        msg: 'Reserva actualizada exitosamente',
        data: reservas[reservaIndex],
    })
}

//Endpoint utilizado para eliminar un pedido específico
exports.delete = async (req, res) => {
    const reservaID = parseInt(req.params.id) //Obtenemos el ID de la reserva desde los parámetros de la ruta
    const reservaIndex = reservas.findIndex((o) => o.id === reservaID) //Buscamos el índice de la reserva en la lista de reservas

    if (reservaIndex === -1) {
        return res.status(404).json({ msg: 'Reserva no encontrada' })
    }

    reservas.splice(reservaIndex, 1) //Eliminamos la reserva de la lista
    res.json({ msg: 'Reserva eliminada con éxito' }) //Respuesta de confirmación de la reserva eliminada
}

//Filtros
exports.filter = async (req, res) => {
    const {
        hotel,
        fecha_inicio,
        fecha_fin,
        tipo_habitacion,
        estado,
        num_huespedes,
    } = req.query
    //Obtenemos los posibles filtros desde la cadena de consulta de la URL

    //Filtramos la lista de reservas según los criterios proporcionados
    const filteredReservas = reservas.filter((reserva) => {
        if (hotel && reserva.hotel !== hotel) {
            //Si se proporcionó un hotel y no coincide con el de la reserva, descartamos la reserva
            return false
        }
        if (fecha_inicio && reserva.fecha_inicio !== fecha_inicio) {
            //Si se proporcionó una fecha y no coincide con la de la reserva entonces se descarta
            return false
        }
        if (fecha_fin && reserva.fecha_fin !== fecha_fin) {
            //Si se proporcionó una fecha y no coincide con la de la reserva entonces se descarta
            return false
        }
        if (tipo_habitacion && reserva.tipo_habitacion !== tipo_habitacion) {
            //Si se proporcionó un tipo de habitacion y no coincide con el de la reserva, descartamos la reserva
            return false
        }
        if (estado && reserva.estado !== estado) {
            //Si se proporcionó un estado y no coincide con el de la reserva, descartamos la reserva
            return false
        }
        if (num_huespedes && reserva.num_huespedes !== num_huespedes) {
            //Si se proporcionó un número de huespedes y no coincide con el de la reserva, descartamos la reserva
            return false
        }

        return true //Si todos los criterios coinciden, entonces se conserva el pedido
    })

    if (filteredReservas.length === 0) {
        return res.status(404).json({ msg: 'Reserva no encontrada' })
    }

    res.json({
        //Si encontramos reservas que coincidan, entonces respondemos con dichas reservas
        msg: 'Reservas filtradas con éxito',
        data: filteredReservas,
    })
}
