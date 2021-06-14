const ClientError = require('../../exceptions/ClientError');

class PlaylistHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postPlaylistHandler = this.postPlaylistHandler.bind(this);
    // this.getPlaylistHandler = this.getPlaylistHandler.bind(this);
    // this.getMusicByIdHandler = this.getMusicByIdHandler.bind(this);
  }

  async postPlaylistHandler(request, h) {
    try {
      // Validate using Joi Validation
      this._validator.validatePlaylistPayload(request.payload);
      const {name} = request.payload;
      const { id: credentialId } = request.auth.credentials;
      const playlistId = await this._service.addPlaylist({name,owner:credentialId});

      const response = h.response({
        status: 'success',
        message: 'Playlist berhasil ditambahkan',
        data: {
          playlistId,
        },
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
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(400);
      return response;
    }
  }

  // async getPlaylistHandler(){
  //   try {
  //     // Validate using Joi Validation
  //     this._validator.validateMusicPayload(request.payload);
  //     const {name} = request.payload;
  //     const { id: credentialId } = request.auth.credentials;
  //     const playlistId = await this._service.addPlaylist({name,owner:credentialId});

  //     const response = h.response({
  //       status: 'success',
  //       message: 'Playlist berhasil ditambahkan',
  //       data: {
  //         playlistId,
  //       },
  //     });
  //     response.code(201);
  //     return response;
  //   } catch (error) {
  //     if (error instanceof ClientError) {
  //       const response = h.response({
  //         status: 'fail',
  //         message: error.message,
  //       });
  //       response.code(error.statusCode);
  //       return response;
  //     }
  //     const response = h.response({
  //       status: 'fail',
  //       message: error.message,
  //     });
  //     response.code(400);
  //     return response;
  //   }
  // }
}

module.exports = PlaylistHandler;