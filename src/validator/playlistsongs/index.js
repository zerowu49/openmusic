const AuthenticationError = require('../../exceptions/AuthenticationError');
const { PlaylistSongPayloadSchema } = require('./schema');

const PlaylistSongValidator = {
  validatePlaylistSongPayload: (payload) => {
    const validationResult = PlaylistSongPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new AuthenticationError(validationResult.error.message);
    }
  },
};

module.exports = PlaylistSongValidator;
