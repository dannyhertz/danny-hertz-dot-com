var objectPath = require('object-path');

module.exports = {
  parse: function (trackResponse) {
    var latestTrack = objectPath.get(trackResponse, 'recenttracks.track.0'),
        latestTrackImages;

    if (latestTrack) {
      latestTrackImages = latestTrack['image'].map(function (imageObj) {
        return imageObj['#text'];
      });

      return {
        name: latestTrack['name'],
        artist: latestTrack['artist']['#text'],
        coverURL: latestTrackImages[latestTrackImages.length - 1]
      }
    } else {
      return null;
    }
  }
};