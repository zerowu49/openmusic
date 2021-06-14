const routes = (handler) => [{
  method: 'POST',
  path: '/playlists/{playlistId}/songs',
  handler: handler.postPlaylistsongHandler,
  options: {
    auth: 'openmusic_jwt',
  },
},
{
  method: 'GET',
  path: '/playlists/{playlistId}/songs',
  handler: handler.getPlaylistsongHandler,
  options: {
    auth: 'openmusic_jwt',
  },
},
{
  method: 'DELETE',
  path: '/playlists/{playlistId}/songs',
  handler: handler.deletePlaylistsongHandler,
  options: {
    auth: 'openmusic_jwt',
  },
},
];

module.exports = routes;
