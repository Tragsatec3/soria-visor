const fetch = require('node-fetch');

module.exports = (req, res) => {
  // Extraer parámetros de la solicitud
  const { SERVICE, VERSION, REQUEST, LAYERS, QUERY_LAYERS, INFO_FORMAT, SRS, BBOX, WIDTH, HEIGHT, X, Y } = req.query;

  // Log de los parámetros recibidos
  console.log('Parámetros recibidos:', req.query);

  // Construir la URL del servicio WMS
  const wmsUrl = `http://ovc.catastro.meh.es/Cartografia/WMS/ServidorWMS.aspx?SERVICE=${SERVICE}&VERSION=${VERSION}&REQUEST=${REQUEST}&LAYERS=${LAYERS}&QUERY_LAYERS=${QUERY_LAYERS}&INFO_FORMAT=${INFO_FORMAT}&SRS=${SRS}&BBOX=${BBOX}&WIDTH=${WIDTH}&HEIGHT=${HEIGHT}&X=${X}&Y=${Y}`;

  // Log de la URL del WMS que se va a llamar
  console.log('URL del WMS:', wmsUrl);

  // Realizar la solicitud al WMS
  fetch(wmsUrl)
    .then(response => {
      // Verificar si la respuesta es OK
      if (!response.ok) {
        throw new Error(`Error en la respuesta del WMS: ${response.statusText}`);
      }
      return response.text(); // Obtener el cuerpo de la respuesta como texto
    })
    .then(data => {
      // Establecer el encabezado de contenido a 'text/xml'
      res.setHeader('Content-Type', 'text/xml');
      res.send(data); // Enviar la respuesta al cliente
    })
    .catch(error => {
      // Manejar cualquier error durante la solicitud
      console.error('Error al acceder al WMS:', error);
      res.status(500).send('Error en el servidor'); // Enviar un error 500
    });
};
