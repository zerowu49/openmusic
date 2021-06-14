/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('playlists', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        name: {
            type: 'TEXT',
            notNull: true,
        },
        owner: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
    });

    // SQL QUERY:
    // CREATE TABLE playlists(id VARCHAR(50) PRIMARY KEY,name TEXT NOT NULL,owner VARCHAR(50) NOT NULL);
    // GRANT ALL PRIVILEGES ON TABLE playlists TO developer;
};

exports.down = pgm => {
    pgm.dropTable('playlists');
};
