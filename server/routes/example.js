export default function (server) {

  server.route({
    path: '/api/kibana_es_indexer/example',
    method: 'GET',
    handler(req, reply) {
      reply({ time: (new Date()).toISOString() });
    }
  });

};
