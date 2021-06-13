/* eslint-disable no-underscore-dangle */
const {
  Pool,
} = require('pg');
const {
  nanoid,
} = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');

const {
  mapDBToModel, mapDBToGetMusic,
} = require('../../utils');
const NotFoundError = require('../../exceptions/NotFoundError');

class MusicService {
  constructor() {
    this._pool = new Pool();
  }

  async addMusic({
    title,
    year,
    performer,
    genre,
    duration,
  }) {
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const query = {
      text: 'INSERT INTO openmusic VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
      values: [id, title, year, performer, genre, duration, insertedAt, updatedAt],
    };

    const result = await this._pool.query(query);
    if (!result.rows[0].id) {
      throw new InvariantError('Lagu gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getMusics() {
    const result = await this._pool.query('SELECT * FROM openmusic');
    return result.rows.map(mapDBToGetMusic);
  }

  async getMusicById(songId) {
    const query = {
      text: 'SELECT * FROM openmusic WHERE id = $1',
      values: [songId],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Lagu tidak ditemukan');
    }

    return result.rows.map(mapDBToModel)[0];
  }

  async editMusicById(songId, {
    title,
    year,
    performer,
    genre,
    duration,
  }) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: 'UPDATE openmusic SET title = $1, year = $2, performer = $3, genre = $4, duration = $5, updated_at = $6 WHERE id = $7 RETURNING id',
      values: [title, year, performer, genre, duration, updatedAt, songId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui lagu. Id tidak ditemukan');
    }
  }

  async deleteMusicById(songId) {
    const query = {
      text: 'DELETE FROM openmusic WHERE id = $1 RETURNING id',
      values: [songId],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Catatan gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = MusicService;
