import initRoutes from './server/routes/api/v1/indexer';

export default function (kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch'],

    uiExports: {
      app: {
        title: 'Indexer',
        description: 'Transform any file into documents to be indexed in Elasticsearch',
        main: 'plugins/kibana_es_indexer/views/index'
      }
    },

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true)
      }).default();
    },

    init(server, options) {
      // Add server routes and initalize the plugin here
      initRoutes(server);
    }
  });
};
