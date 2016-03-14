(function() {
  var Aurora;

  Aurora = window.Aurora;

  Aurora.utilities || (Aurora.utilities = {});

  Aurora.utilities.log = function(message) {
    if (Aurora.env.debugging) {
      return console.log(message);
    }
  };

}).call(this);
