/* eslint-disable no-underscore-dangle */
const {
    Pool,
} = require('pg');
const {
    nanoid,
} = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');

const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError');

class PlaylistsService {
    constructor() {
        this._pool = new Pool();
    }

    async addPlaylist({
        name,
        owner
    }) {
        const id = `playlist-${nanoid(16)}`;

        const query = {
            text: 'INSERT INTO playlists VALUES($1, $2, $3) RETURNING id',
            values: [id, name, owner],
        };

        const result = await this._pool.query(query);
        if (!result.rows[0].id) {
            throw new InvariantError('Playlist gagal ditambahkan');
        }

        return result.rows[0].id;
    }

    async getPlaylist(owner) {
        const query = {
            text: `
            SELECT playlists.id,playlists.name,users.username 
            FROM playlists
            JOIN users on playlists.owner=users.id
            WHERE playlists.owner = $1`,
            values: [owner],
        };
        const result = await this._pool.query(query);
        return result.rows;
    }
    

    async verifyPlaylistOwner(id, owner) {
        const query = {
            text: 'SELECT * FROM playlists WHERE id = $1',
            values: [id],
        };
        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new NotFoundError('Playlist tidak ditemukan');
        }
        const note = result.rows[0];
        if (note.owner !== owner) {
            throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
        }
    }


    // TODO: Check dibawah ini
    // async getMusicById(songId) {
    //     const query = {
    //         text: 'SELECT * FROM songs WHERE id = $1',
    //         values: [songId],
    //     };
    //     const result = await this._pool.query(query);
    //     if (!result.rows.length) {
    //         throw new NotFoundError('Lagu tidak ditemukan');
    //     }

    //     return result.rows.map(mapDBToModel)[0];
    // }
}

module.exports = PlaylistsService;