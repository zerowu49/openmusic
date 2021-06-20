const {
  Pool,
} = require('pg');
const {
  nanoid,
} = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class PlaylistsongsService {
  constructor(cacheService) {
    this._pool = new Pool();
    this._cacheService = cacheService;
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

    // menghapus cache setelah sukses menambahkan playlist
    await this._cacheService.delete(`playlist:${playlistId}`);

    return result.rows[0].id;
  }

  async getPlaylistsong(playlistId) {
    try {
      // mendapatkan playlist dari cache
      const result = await this._cacheService.get(`playlist:${playlistId}`);
      return JSON.parse(result);
    } catch (error) {
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

      // playlist akan disimpan pada cache sebelum fungsi getPlaylistsong dikembalikan
      await this._cacheService.set(`playlist:${playlistId}`, JSON.stringify(result.rows));

      return result.rows;
    }
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

    // menghapus cache setelah sukses menambahkan playlist
    await this._cacheService.delete(`playlist:${playlistId}`);
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
