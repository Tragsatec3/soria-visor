const fetch = require('node-fetch');

module.exports = (req, res) => {
  // Obtener los parámetros de la consulta
  const { SERVICE, VERSION, REQUEST, LAYERS, QUERY_LAYERS, INFO_FORMAT, SRS, BBOX, WIDTH, HEIGHT, X, Y } = req.query;

  // Construir la URL del servicio WMS
  const wmsUrl = `http://ovc.catastro.meh.es/Cartografia/WMS/ServidorWMS.aspx?SERVICE=${SERVICE}&VERSION=${VERSION}&REQUEST=${REQUEST}&LAYERS=${LAYERS}&QUERY_LAYERS=${QUERY_LAYERS}&INFO_FORMAT=${INFO_FORMAT}&SRS=${SRS}&BBOX=${BBOX}&WIDTH=${WIDTH}&HEIGHT=${HEIGHT}&X=${X}&Y=${Y}`;

  // Hacer la solicitud al servicio WMS
  fetch(wmsUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error en la respuesta del WMS: ${response.statusText}`);
      }
      return response.text();
    })
    .then(data => {
      // Devolver la respuesta al cliente
      res.setHeader('Content-Type', 'text/xml'); // Ajusta según el tipo de respuesta
      res.send(data);
    })
    .catch(error => {
      console.error('Error al acceder al WMS:', error);
      res.status(500).send('Error en el servidor');
    });
};
