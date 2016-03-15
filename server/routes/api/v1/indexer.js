import transformBulk from '../../../lib/transform_bulk';

export default function (server) {
  const callWithRequest = server.plugins.elasticsearch.callWithRequest;

  server.route({
    path: '/api/indexer/v1/index',
    method: 'POST',
    handler(request, reply) {
      const {index, type, docs} = request.payload;
      const body = transformBulk(index, type, docs);
      return callWithRequest(request, 'bulk', {body}).then(reply, reply);
    }
  });
};
