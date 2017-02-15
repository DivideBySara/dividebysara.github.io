$(document).ready(function () {
  var $menu = $("#sidebar-wrapper");

  $(document)
    .on("click", ".js-menu-open", function(evt) {
      $menu.addClass("open");

      return evt.target.tagName === "A";
    })
    .on("click", ".js-menu-close", function(evt) {
      $menu.removeClass("open");

      return evt.target.tagName === "A";
    });

    getWeather();
    getTimeOfDay();

    function getWeather() {
      $.ajax({url: "https://api.wunderground.com/api/28936fd9bd25aae4/geolookup/conditions/q/98112.json",
             datatype: "jsonp",
             success: function(response) {
               let conditions = response.current_observation.weather;
               console.log(conditions);
               loadImage(conditions);
             }});
    }

    function getTimeOfDay() {
      // declare variables & console.log to test
      var time = new Date();
      var hours = time.getHours();
      console.log(hours);
      var timeOfDay;
      // base morning, afternoon, and night on the timeOfDay
      if (hours > 17 || hours < 6) {
        timeOfDay = "night";
      } else if (hours > 11 || hours < 18) {
        timeOfDay = "afternoon";
      } else { // It's morning!
        timeOfDay = "morning";
      }

      return timeOfDay;
    } // End getTimeOfDay()

    function loadImage(conditions) {
      let imageSRC = "img/weather/hero-";
      let validConditions = ["clear", "cloudy", "rain", "snow"];
      let timeOfDay = getTimeOfDay();

      conditions = conditions.toLowerCase();

      // Check that conditions returned by api is valid
      if (validConditions.indexOf(conditions) === -1) {
        conditions = "cloudy";
      } // else the conditions returned by the api is valid, and we'll use that

      imageSRC = imageSRC + conditions + "-" + timeOfDay + ".jpg";
      $("#intro").css("background-image", "url("+ imageSRC + ")");
    }
});
