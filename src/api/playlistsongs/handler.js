/* eslint-disable no-underscore-dangle */
const ClientError = require('../../exceptions/ClientError');

class PlaylistsongHandler {
  constructor(playlistsongsService, playlistsService, validator) {
    this._playlistsongsService = playlistsongsService;
    this._playlistsService = playlistsService;
    this._validator = validator;

    this.postPlaylistsongHandler = this.postPlaylistsongHandler.bind(this);
    this.getPlaylistsongHandler = this.getPlaylistsongHandler.bind(this);
    this.deletePlaylistsongHandler = this.deletePlaylistsongHandler.bind(this);
  }

  async postPlaylistsongHandler(request, h) {
    try {
      this._validator.validatePlaylistSongPayload(request.payload);
      const { id: credentialId } = request.auth.credentials;
      const { playlistId } = request.params;
      const { songId } = request.payload;
      await this._playlistsService.verifyPlaylistAccess(playlistId, songId, credentialId);
      const playlistsongId = await this._playlistsongsService.addPlaylistsong(playlistId, songId);
      const response = h.response({
        status: 'success',
        message: 'Lagu berhasil ditambahkan ke playlist',
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async getPlaylistsongHandler(request,h){
    try {
      this._validator.validatePlaylistSongPayload(request.payload);
      const { id: credentialId } = request.auth.credentials;
      const { playlistId } = request.params;
      await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);
      const songs = await this._playlistsongsService.getPlaylistsong(playlistId);
      const response = h.response({
        status: 'success',
        data: {
          songs,
        },
      });
      response.code(200);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async deletePlaylistsongHandler(request, h) {
    try {
      this._validator.validatePlaylistSongPayload(request.payload);
      const { id: credentialId } = request.auth.credentials;
      const { playlistId } = request.params;
      const { songId } = request.payload;
      await this._playlistsService.verifyPlaylistAccess(playlistId, songId, credentialId);
      await this._playlistsongsService.deletePlaylistsong(playlistId, songId);
      return {
        status: 'success',
        message: 'Lagu berhasil dihapus dari playlist',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = PlaylistsongHandler;