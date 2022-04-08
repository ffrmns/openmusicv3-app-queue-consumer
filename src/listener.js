/* eslint no-console: ["error", { allow: ["log", "error"] }] */

class Listener {
  constructor(playlistsService, mailSender) {
    this.playlistsService = playlistsService;
    this.mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());
      const songsInPlaylist = await this.playlistsService.getSongsInPlaylist(playlistId);
      const result = await this.mailSender.sendEmail(targetEmail, JSON.stringify(songsInPlaylist));
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
