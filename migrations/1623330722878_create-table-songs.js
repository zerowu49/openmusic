/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('songs', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        title: {
            type: 'TEXT',
            notNull: true,
        },
        year: {
            type: 'INTEGER',
            notNull: true,
        },
        performer: {
            type: 'TEXT',
            notNull: true,
        },
        genre: {
            type: 'TEXT',
            notNull: true,
        },
        duration: {
            type: 'INTEGER',
            notNull: true,
        },
        inserted_at: {
            type: 'TEXT',
            notNull: true,
        },
        updated_at: {
            type: 'TEXT',
            notNull: true,
        },
    })

    // SQL QUERY:
    // CREATE TABLE songs(
    //     id VARCHAR(50) PRIMARY KEY,
    //     title TEXT NOT NULL,
    //     year INT NOT NULL,
    //     performer TEXT NOT NULL,
    //     genre TEXT NOT NULL,
    //     duration INT NOT NULL,
    //     inserted_at TEXT NOT NULL,
    //     updated_at TEXT NOT NULL,
    // );
    // GRANT ALL PRIVILEGES ON TABLE songs TO developer;
};

exports.down = pgm => {
    pgm.dropTable('songs');
};
