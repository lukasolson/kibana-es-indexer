import transformBulk from '../../../lib/transform_bulk';

export default function (server) {
  const { callWithRequest } = server.plugins.elasticsearch.getCluster('data');

  server.route({
    path: '/api/indexer/v1/index',
    method: 'POST',
    handler(request, reply) {
      const {index, type, docs} = request.payload;
      const body = transformBulk(index, type, docs);
      return callWithRequest(request, 'bulk', {body}).then(reply, reply);
    },
    config: {
        payload: {
            maxBytes: Math.pow(2, 31) - 1
        }
    }
  });
};
