$("form[name=signup_form").submit(function(e) {

  var $form = $(this);
  var $error = $form.find(".error");
  var data = $form.serialize();

  $.ajax({
    url: "/user/signup",
    type: "POST",
    data: data,
    dataType: "json",
    success: function(resp) {
      window.location.assign("/dashboard");
    },
    error: function(resp) {
      $error.text(resp.responseJSON.error).removeClass("error--hidden");
    }
  });

  e.preventDefault();
});

$("form[name=login_form").submit(function(e) {

  var $form = $(this);
  var $error = $form.find(".error");
  var data = $form.serialize();

  $.ajax({
    url: "/user/login",
    type: "POST",
    data: data,
    dataType: "json",
    success: function(resp) {
      window.location.assign("/dashboard");
    },
    error: function(resp) {
      $error.text(resp.responseJSON.error).removeClass("error--hidden");
    }
  });

  e.preventDefault();
});

$("#signout").click(function(e){
  e.preventDefault();
  $.ajax({
    url: "/user/signout",
    success: function(resp) {
      window.location.assign("/");
    },
  });
});

// Menus


$("form[name=mainMenu").submit(function(e) {
  var option = $("input[name=option").val();
  switch(option) {
          case "1":
            window.location.assign("/dashboard/codage");
            break;
          case "2":
            window.location.assign("/dashboard/hashing");
            break;
          case "3":
            window.location.assign("/dashboard/cracking");
          break;
          case "4":
            window.location.assign("/dashboard/symmetric");
          break;
          case "5":
            window.location.assign("/dashboard/asymmetric");
          break;
          case "6":
            window.location.assign("/dashboard/chatroom");
          break;
          default:
            window.location.assign("/dashboard");
          }
  e.preventDefault();
});

$("form[name=codageMenu").submit(function(e) {
  var option = $("input[name=option").val();
  switch(option) {
    case "1":
      window.location.assign("/dashboard/codage/encoding");
      break;
    case "2":
      window.location.assign("/dashboard/codage/decoding");
      break;
    case "0":
      window.location.assign("/dashboard");
    break;
    default:
      window.location.assign("/dashboard/codage");
    }
  e.preventDefault();
});

$("form[name=crackingAlgoMenu").submit(function(e) {
  e.preventDefault();
  var algorithm = $("input[name=option").val();
  if (algorithm == "0") {
    window.location.assign("/dashboard");
  } else {
    window.location.assign("/dashboard/cracking/algorithm?algo="+algorithm);
  }
});
$("form[name=crackingWordlistMenu").submit(function(e) {
  e.preventDefault();
  var dictionnary = $("input[name=dictionnary").val();
  var algorithm = $("input[name=algo").val();
  if (dictionnary == "0") {
    window.location.assign("/dashboard");
  } else {
    window.location.assign("/dashboard/cracking/dictionnary?algo="+algorithm+"&dictionnary="+dictionnary);
  }
});

$("form[name=symmetricEncryptionAlgoMenu").submit(function(e) {
  e.preventDefault();
  var algorithm = $("input[name=option").val();
  if (algorithm == "0") {
    window.location.assign("/dashboard");
  } else {
    window.location.assign("/dashboard/symmetric/algorithm?algo="+algorithm);
  }
});
$("form[name=symmetricEnDecMenu").submit(function(e) {
  e.preventDefault();
  var endec = $("input[name=endec").val();
  var algorithm = $("input[name=algo").val();
  switch (endec) {
    case "0":
      window.location.assign("/dashboard");
      break;
    case "1":
      window.location.assign("/dashboard/symmetric/encryption?algo="+algorithm);
      break;
    case "2":
      window.location.assign("/dashboard/symmetric/decryption?algo="+algorithm);
      break;
    default:
      //error
      window.location.assign("/dashboard");
  }
});
$("form[name=hashingMenu").submit(function(e) {
  e.preventDefault();
  var algorithm = $("input[name=option").val();
  if (algorithm == "0") {
    window.location.assign("/dashboard");
  } else {
    window.location.assign("/dashboard/hashing/algorithm?algo="+algorithm);
  }
});

$("form[name=asymmetricEncryptionAlgoMenu").submit(function(e) {
  e.preventDefault();
  var algorithm = $("input[name=option").val();
  if (algorithm == "0") {
    window.location.assign("/dashboard");
  } else {
    window.location.assign("/dashboard/asymmetric/algorithm?algo="+algorithm);
  }
});
$("form[name=asymmetricEnDecMenu").submit(function(e) {
  e.preventDefault();
  var endec = $("input[name=endec").val();
  var algorithm = $("input[name=algo").val();
  switch (endec) {
    case "0":
      window.location.assign("/dashboard");
      break;
    case "1":
        window.location.assign("/dashboard/asymmetric/keygen?algo="+algorithm);
        break;
    case "2":
      window.location.assign("/dashboard/asymmetric/encryption?algo="+algorithm);
      break;
    case "3":
      window.location.assign("/dashboard/asymmetric/decryption?algo="+algorithm);
      break;
    default:
      //error
      window.location.assign("/dashboard");
  }
});
$(".closeCodage").click(function(e){
  e.preventDefault();
  window.location.assign("/dashboard/codage");
});
$(".closeHashage").click(function(e){
  e.preventDefault();
  window.location.assign("/dashboard/hashing");
});
$(".closeCraquage").click(function(e){
  e.preventDefault();
  window.location.assign("/dashboard/cracking");
});
$(".closeSymmetricEncryption").click(function(e){
  e.preventDefault();
  window.location.assign("/dashboard/symmetric");
});
$(".closeAsymmetricEncryption").click(function(e){
  e.preventDefault();
  window.location.assign("/dashboard/asymmetric");
});

// Functionnalities requests
$("form[name=cracking").submit(function(ee) {
  ee.preventDefault();
  var $form = $(this);
  var $error = $form.find(".error");
  var data = $form.serialize();
  var message = $("input[name=hash").val();
  $("#crackingContainer").append('<p class="functionnalityMessage">>> '+message+'</p>');
  $("input[name=hash").val('');
  $.ajax({
    url: "/menu/cracking",
    type: "POST",
    data: data,
    dataType: "json",
    success: function(resp) {
      var output = resp["output"];
      $("#crackingContainer").append('<p class="functionnalityMenu">-- Message hashé: </p>');
      $("#crackingContainer").append('<p class="functionnalityMessage">>> '+output+'</p>');
      $("#crackingContainer").append('<p class="functionnalityMenu">-- Message à hasher: </p>'); 
    },
    error: function(resp) {
      $error.text(resp.responseJSON.error).removeClass("error--hidden");
    }
  });
});
$("form[name=hashage").submit(function(ee) {
  ee.preventDefault();
  var $form = $(this);
  var $error = $form.find(".error");
  var data = $form.serialize();
  var message = $("input[name=message").val();
  $("#hashingContainer").append('<p class="functionnalityMessage">>> '+message+'</p>');
  $("input[name=message").val('');
  $.ajax({
    url: "/menu/hashing",
    type: "POST",
    data: data,
    dataType: "json",
    success: function(resp) {
      var output = resp["output"];
      $("#hashingContainer").append('<p class="functionnalityMenu">-- Message hashé: </p>');
      $("#hashingContainer").append('<p class="functionnalityMessage">>> '+output+'</p>');
      $("#hashingContainer").append('<p class="functionnalityMenu">-- Message à hasher: </p>'); 
    },
    error: function(resp) {
      $error.text(resp.responseJSON.error).removeClass("error--hidden");
    }
  });
});
$("form[name=encode").submit(function(e) {
  e.preventDefault();
  var $form = $(this);
  var $error = $form.find(".error");
  var message = $("input[name=message").val();
  $("#encodingContainer").append('<p class="functionnalityMessage">>> '+message+'</p>');
  $("input[name=message").val('');
  $.ajax({
    url: "/menu/codage/encoding",
    type: "POST",
    data: {"message" : message},
    dataType: "json",
    success: function(resp) {
      var output = resp["output"];
      $("#encodingContainer").append('<p class="functionnalityMenu">-- Message encodé: </p>');
      $("#encodingContainer").append('<p class="functionnalityMessage">>> '+output+'</p>');
      $("#encodingContainer").append('<p class="functionnalityMenu">-- Message à encoder: </p>');

    },
    error: function(resp) {
      $error.text(resp.responseJSON.error).removeClass("error--hidden");
    }
  });
});
$("form[name=decode").submit(function(e) {
  e.preventDefault();
  var $form = $(this);
  var $error = $form.find(".error");
  var message = $("input[name=message").val();
  $("#decodingContainer").append('<p class="functionnalityMessage">>> '+message+'</p>');
  $("input[name=message").val('');
  $.ajax({
    url: "/menu/codage/decoding",
    type: "POST",
    data: {"message" : message},
    dataType: "json",
    success: function(resp) {
      var output = resp["output"];
      $("#decodingContainer").append('<p class="functionnalityMenu">-- Message décodé: </p>');
      $("#decodingContainer").append('<p class="functionnalityMessage">>> '+output+'</p>');
      $("#encodingContainer").append('<p class="functionnalityMenu">-- Message à décoder: </p>');

    },
    error: function(resp) {
      $error.text(resp.responseJSON.error).removeClass("error--hidden");
    }
  });

  e.preventDefault();
});
$(".dialogBox").dialog({
  autoOpen: false,
  modal: true
});
$("form[name=symmetricEncryption").submit(function(e) {
  e.preventDefault();
  var overlay = $('<div></div>');
  $("body").append(overlay); 
  overlay.fadeIn(700).addClass('overlay-styles');;
  $("#dialogPassphraseEnc").dialog({
    buttons : {
      "Confirm" : function() {
        var message = $("input[name=message").val();
        var form = {
          'algo': $("input[name=algo").val(),
          'message': message,
          'passphrase': $("input[name=passphrase").val()
        }
        var formStr = JSON.stringify(form, null, 2);
        var data = JSON.parse(formStr);
        $(this).dialog("close");
        overlay.fadeOut(700).remove();
        $("#symmetricEncryptionContainer").append('<p class="functionnalityMessage">>> '+message+'</p>');
        $("input[name=message").val('');
        $.ajax({
          url: "/menu/symmetric/encrypting",
          type: "POST",
          data: data,
          dataType: "json",
          success: function(resp) {
            var iv = resp["iv"];
            var cipheredMessage = resp["cipheredMessage"]
            $("#symmetricEncryptionContainer").append('<p class="functionnalityMenu">-- Message chiffré: </p>');
            $("#symmetricEncryptionContainer").append('<p class="functionnalityMessage">>> '+cipheredMessage +'</br> iv: '+iv+' </p>');
            $("#symmetricEncryptionContainer").append('<p class="functionnalityMenu">-- Message à chiffrer: </p>'); 
          },
          error: function(resp) {
            $error.text(resp.responseJSON.error).removeClass("error--hidden");
          }
  });
        },
        "Cancel" : function() {
          $(this).dialog("close");
          overlay.fadeOut(700).remove();
          $("input[name=message").val('');
        }
      },
      modal : true,
      classes: {
        "ui-dialog" : "ui-corner-all"
      },
      title: "Passphrase",
      show: {
        effect: 'fade',
        duration: 700
      },
      hide: {
      effect: 'fade',
      duration: 700
      },
    });
    $("#dialogPassphraseEnc").dialog("open");
  });
  $("form[name=symmetricDecryption").submit(function(e) {
    e.preventDefault();
    var overlay = $('<div></div>');
    $("body").append(overlay); 
    overlay.fadeIn(700).addClass('overlay-styles');;
    $("#dialogPassphraseDec").dialog({
      buttons : {
        "Confirm" : function() {
          var message = $("input[name=message").val();
          var form = {
            'algo': $("input[name=algo").val(),
            'cipheredMessage': message,
            'iv': $("input[name=iv").val(),
            'passphrase': $("input[name=passphrase").val()
          }
          var formStr = JSON.stringify(form, null, 2);
          var data = JSON.parse(formStr);
          $(this).dialog("close");
          overlay.fadeOut(700).remove();
          $("#symmetricDecryptionContainer").append('<p class="functionnalityMessage">>> '+message+'</p>');
          $("input[name=message").val('');
          $("input[name=iv").val('');
          $.ajax({
            url: "/menu/symmetric/decrypting",
            type: "POST",
            data: data,
            dataType: "json",
            success: function(resp) {
              var output = resp["output"];
              $("#symmetricDecryptionContainer").append('<p class="functionnalityMenu">-- Message déchiffré: </p>');
              $("#symmetricDecryptionContainer").append('<p class="functionnalityMessage">>> '+output+'</p>');
              $("#symmetricDecryptionContainer").append('<p class="functionnalityMenu">-- Message à déchiffrer: </p>'); 
            },
            error: function(resp) {
              $error.text(resp.responseJSON.error).removeClass("error--hidden");
            }
          });
        },
        "Cancel" : function() {
          $(this).dialog("close");
          overlay.fadeOut(700).remove();
          $("input[name=message").val('');
        }
      },
      modal : true,
      classes: {
        "ui-dialog" : "ui-corner-all"
      },
      title: "Passphrase",
      show: {
        effect: 'fade',
        duration: 700
      },
      hide: {
      effect: 'fade',
      duration: 700
      },
    });
    $("#dialogPassphraseDec").dialog("open");
});

$("form[name=asymmetricKeygen").submit(function(e) {
  e.preventDefault();
  var algorithm = $("input[name=algo").val();
  var form = {
    'algo': algorithm,
  }
  var formStr = JSON.stringify(form, null, 2);
  var data = JSON.parse(formStr);
  $.ajax({
    url: "/menu/asymmetric/keygen",
    type: "POST",
    data: data,
    dataType: "json",
    success: function(resp) {
      $("#asymmetricKeygenContainer").append('<p class="functionnalityMenu">--- Clé publique: </p>');
      if (algorithm == "1") {
        $("#asymmetricKeygenContainer").append('<p class="functionnalityMessage">>>> y:'+  resp["y"] + '<br>>>>p:' + resp["p"] + '<br>>>>g:' + resp["g"] + '</p>');
      } else {
        $("#asymmetricKeygenContainer").append('<p class="functionnalityMessage">>>> '+resp["public"]+'</p>');
      }
      $("#asymmetricKeygenContainer").append('<p class="functionnalityMenu">--- Clé privée: </p>'); 
      if (algorithm == "1") {
        $("#asymmetricKeygenContainer").append('<p class="functionnalityMessage">>>> '+resp["x"]+'</p>');
      } else {
        $("#asymmetricKeygenContainer").append('<p class="functionnalityMessage">>>> '+resp["private"]+'</p>');
      }
      $("#asymmetricKeygenContainer").append('<p class="functionnalityMenu">-- Clés génerées: </p>'); 
    },
    error: function(resp) {
      $error.text(resp.responseJSON.error).removeClass("error--hidden");
    }
  });
});
$("form[name=asymmetricEncryption").submit(function(e) {
  e.preventDefault();
  var $form = $(this);
  var $error = $form.find(".error");
  var data = $form.serialize();
  var algorithm = $("input[name=algo").val();

  $.ajax({
    url: "/menu/asymmetric/encrypting",
    type: "POST",
    data: data,
    dataType: "json",
    success: function(resp) {
      $("#asymmetricEncryptionContainer").append('<p class="functionnalityMenu">-- Message chiffré: </p>');
      if (algorithm == "1") {
        $("#asymmetricEncryptionContainer").append('<p class="functionnalityMessage">>> '+resp['output']["c1"] +' </p>');
        $("#asymmetricEncryptionContainer").append('<p class="functionnalityMessage">>> '+resp['output']["c2"] +' </p>');
 
      } else {
        $("#asymmetricEncryptionContainer").append('<p class="functionnalityMessage">>> '+resp['output'] +' </p>');
      }
      $("#asymmetricEncryptionContainer").append('<p class="functionnalityMenu">-- Message à chiffrer: </p>'); 
    },
    error: function(resp) {
      $error.text(resp.responseJSON.error).removeClass("error--hidden");
    }
  });
});
$("form[name=asymmetricDecryption").submit(function(e) {
  e.preventDefault();
  var $form = $(this);
  var $error = $form.find(".error");
  var data = $form.serialize();
  $.ajax({
    url: "/menu/asymmetric/decrypting",
    type: "POST",
    data: data,
    dataType: "json",
    success: function(resp) {
      $("#asymmetricDecryptionContainer").append('<p class="functionnalityMenu">-- Message déchiffré: </p>');
      $("#asymmetricDecryptionContainer").append('<p class="functionnalityMessage">>> '+resp['output'] +' </p>');
      $("#asymmetricDecryptionContainer").append('<p class="functionnalityMenu">-- Message  à déchiffrer: </p>'); 
    },
    error: function(resp) {
      $error.text(resp.responseJSON.error).removeClass("error--hidden");
    }
  });
});