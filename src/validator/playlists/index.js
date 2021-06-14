const AuthenticationError = require('../../exceptions/AuthenticationError');
const { PlaylistPayloadSchema } = require('./schema');

const PlaylistValidator = {
  validatePlaylistPayload: (payload) => {
    const validationResult = PlaylistPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new AuthenticationError(validationResult.error.message);
    }
  },
};

module.exports = PlaylistValidator;
