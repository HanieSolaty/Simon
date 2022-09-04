var colors = ['green', 'red', 'yellow', 'blue'];

var next = Math.floor(Math.random() * 4);

var selectedColors = [colors[next]];

var userChosenColors = [];

var level = 0;

function playsound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

$(document).keypress(function() {

  if (level === 0) {

    level = 1;
    $("h1").text("level " + level);
    $('.' + colors[next]).fadeToggle().fadeToggle();
    playsound(colors[next]);

    $(".square").unbind('click').click(function() {
      playsound($(this).attr("class").substring(7));
      userChosenColors.push($(this).attr("class").substring(7));
      this.classList.add("pressed");
      var pressed_square = this;
      setTimeout(function(event) {
        pressed_square.classList.remove("pressed");
      }, 150);
      len = userChosenColors.length - 1;

      if (userChosenColors[len] !== selectedColors[len]) {

        $("h1").text("Game Over! Press Any Key to Play Again");
        $("body").toggleClass("game-over");
        setTimeout(function(event) {
          $("body").toggleClass("game-over");
        }, 200);
        playsound("wrong");
        userChosenColors = [];
        level = 0;
        selectedColors = [colors[next]];

      } else if (selectedColors.length === userChosenColors.length) {

        userChosenColors = [];
        next = Math.floor(Math.random() * 4);
        selectedColors[level] = colors[next];
        level++;
        $("h1").text("level " + level);
        $('.' + colors[next]).fadeToggle().fadeToggle();
        playsound(colors[next]);
      }
    });
  }

});
