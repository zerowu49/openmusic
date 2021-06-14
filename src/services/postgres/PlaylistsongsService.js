const {
    Pool
} = require('pg');
const {
    nanoid
} = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class PlaylistsongsService {
    constructor() {
        this._pool = new Pool();
    }

    async addPlaylistsong(playlistId, songId) {
        const id = `playlistsong-${nanoid(16)}`;
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

    async getPlaylistsong(playlistId) {
        const query = {
            text: `
            SELECT songs.id,songs.title,songs.performer 
            FROM playlistsongs
            JOIN songs on playlistsongs.song_id=songs.id
            WHERE playlistsongs.playlist_id = $1`,
            values: [playlistId],
        };
        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new NotFoundError('Playlistsong tidak ditemukan');
        }
        return result.rows;
    }

    async deletePlaylistsong(playlistId, songId) {
        const query = {
            text: 'DELETE FROM playlistsongs WHERE playlist_id = $1 AND song_id = $2 RETURNING id',
            values: [playlistId, songId],
        };
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new InvariantError('Kolaborasi gagal dihapus');
        }
    }

    async verifyPlaylistsong(playlistId, songId) {
        const query = {
            text: 'SELECT * FROM playlistsongs WHERE playlist_id = $1 AND song_id = $2',
            values: [playlistId, songId],
        };
        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new InvariantError('Kolaborasi gagal diverifikasi');
        }
    }
}

module.exports = PlaylistsongsService;