const {
    Pool
} = require('pg');
const InvariantError = require('../../exceptions/InvariantError');

class PlaylistsongsService {
    constructor() {
        this._pool = new Pool();
    }

    async addPlaylistsong(playlistId, songId) {
        const id = `playlist-${nanoid(16)}`;
        const query = {
            text: 'INSERT INTO playlistsongs VALUES($1, $2, $3) RETURNING id',
            values: [id, playlistId, songId],
        };
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new InvariantError('Playlistsongs gagal ditambahkan');
        }
        return result.rows[0].id;
    }
}