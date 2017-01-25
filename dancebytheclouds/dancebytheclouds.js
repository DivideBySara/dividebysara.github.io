function main() {
  var apiKey = 'a13f3638a7454a96ff2e5d21252208e8';
  var latitude = "47.642781";
  var longitude = "-122.302946";

  $.ajax({
    url: 'https://api.darksky.net/forecast/' + apiKey + '/' + latitude + ',' + longitude,
    dataType: 'jsonp',
    success: function(data) {
      changeWeatherState(data.currently.cloudCoverage);
    }
  });

  function changeWeatherState(cloudCoverage) {
    if (cloudCoverage < 0.2) {
      $('.cloud-cover').text("Clear Skies");
      $('.dance-tip').text("Dance under the stars.");
      $("body").css("background-image", 'url(\'https://www.goodfreephotos.com/albums/united-states/wisconsin/wildcat-mountain-state-park/wisconsin-wildcat-mountain-state-park-clear-sky-with-stars.jpg\')');
    } else if (cloudCoverage >= 0.2 && cloudCoverage <= 0.5) {
      $('.cloud-cover').text("Partly Cloudy");
      $('.dance-tip').text("Find a festival and dance on a picnic table!");
      $("body").css("background-image", 'url(\'https://c1.staticflickr.com/9/8062/8268024894_42497c6ceb_b.jpg\')');
    } else if (cloudCoverage > 0.5 && cloudCoverage <= 0.75) {
      $('.cloud-cover').text("Mostly Cloudy");
      $('.dance-tip').text("Get your dancing fix before the rain starts!");
      $("body").css("background-image", 'url(\'http://maxpixel.freegreatpicture.com/static/photo/1x/Coast-Horizon-Cloudy-Nature-Dusk-Beach-Dawn-1845714.jpg\')');
    } else {
      $('.cloud-cover').text("Overcast");
      $('.dance-tip').text("Get your dancing fix indoors.");
      $("body").css("background-image", 'url(\'https://c1.staticflickr.com/1/106/270251158_ad336b6736_b.jpg\')');
    }

  };
}

$(document).ready(main);
