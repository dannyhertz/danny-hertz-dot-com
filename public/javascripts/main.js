function getLatestPlayedJSON(cb) {
  $.getJSON('/latest_played.json', function(data) {
      cb(null, data);
  });
}

$(function () {
  getLatestPlayedJSON(function (err, latestAlbum) {
    var $body = $(document.body),
        contentFragment = document.createDocumentFragment(),
        $albumCover, $albumDetailsLink, $homeLink,
        albumCoverURL, albumDetailsText;

    albumCoverURL = latestAlbum.icon.replace(/square-(\d*)/, 'square-600');
    $albumCover = $('<div>', { 'class': 'album-cover' })
      .css({
        'background-image': 'url(' + albumCoverURL + ')'
      });
    contentFragment.appendChild($albumCover[0]);

    albumDetailsText = '"' + latestAlbum.name + '" - ' + latestAlbum.artist;
    $albumDetailsLink = $('<a>', {
      'class': 'album-details',
      'href': 'http://www.rdio.com/people/boomcity/history/',
      'target': '_blank',
      'text': albumDetailsText
    });
    contentFragment.appendChild($albumDetailsLink[0]);

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