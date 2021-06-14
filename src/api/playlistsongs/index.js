const PlaylistsongHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'playlistsongs',
  version: '1.0.0',
  register: async (server, {
    playlistsongsService,
    playlistsService,
    validator,
  }) => {
    const playlistsongHandler = new PlaylistsongHandler(
      playlistsongsService,
      playlistsService,
      validator,
    );
    server.route(routes(playlistsongHandler));
  },
};
