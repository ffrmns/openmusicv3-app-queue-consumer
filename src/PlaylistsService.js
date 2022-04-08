const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this.pool = new Pool();
  }

  async getSongsInPlaylist(playlistId) {
    const query = {
      text: 'SELECT id, name FROM playlists WHERE id = $1',
      values: [playlistId],
    };
    const result = await this.pool.query(query);
    if (result.rows[0]) {
      const songsQuery = {
        text: 'SELECT songs.id, songs.title, songs.performer FROM songs INNER JOIN playlist_songs ON songs.id = playlist_songs.song_id WHERE playlist_songs.playlist_id = $1',
        values: [playlistId],
      };
      const songsResult = await this.pool.query(songsQuery);
      result.rows[0].songs = songsResult.rows;
    }
    return result.rows[0];
  }
}

module.exports = PlaylistsService;
