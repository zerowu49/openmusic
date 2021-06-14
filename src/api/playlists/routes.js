const routes = (handler) => [
  {
    method: 'POST',
    path: '/playlists',
    handler: handler.postPlaylistHandler,
    options: {
      auth: 'openmusic_jwt',
    },
  },
  // {
  //   method: 'GET',
  //   path: '/playlists',
  //   handler: handler.getMusicsHandler,
  //   options: {
  //     auth: 'openmusic_jwt',
  //   },
  // },
  // {
  //   method: 'DELETE',
  //   path: '/playlists/{playlistsId}',
  //   handler: handler.deleteMusicByIdHandler,
  //   options: {
  //     auth: 'openmusic_jwt',
  //   },
  // },
];

module.exports = routes;
