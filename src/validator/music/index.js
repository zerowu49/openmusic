const InvariantError = require('../../exceptions/InvariantError');
const { MusicPayloadSchema } = require('./schema');

const MusicValidator = {
  validateMusicPayload: (payload) => {
    const validationResult = MusicPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = MusicValidator;
