function getLatestPlayedJSON(cb) {
  $.getJSON('/latest_played.json', function(data) {
      cb(null, data);
  });
}

$(function () {
  getLatestPlayedJSON(function (err, latestTrack) {
    var $body = $(document.body),
        contentFragment = document.createDocumentFragment(),
        $trackCover, $trackLink, $homeLink;

    $trackCover = $('<div>', { 'class': 'album-cover' })
      .css({
        'background-image': 'url(' + latestTrack.coverURL + ')'
      });
    contentFragment.appendChild($trackCover[0]);

    $trackLink = $('<a>', {
      'class': 'album-details',
      'href': 'http://www.last.fm/user/dannyhertz',
      'target': '_blank',
      'text': '"' + latestTrack.name + '" - ' + latestTrack.artist
    });
    contentFragment.appendChild($trackLink[0]);

    $homeLink = $('<a>', {
      'class': 'home-link',
      'href': 'https://twitter.com/dannyhertz',
      'target': '_blank',
      'text': '@dannyhertz'
    });
    contentFragment.appendChild($homeLink[0]);

    $body.append(contentFragment);

    $body.waitForImages(function() {
      $body.addClass('visible');
    }, null, true);
  });
});