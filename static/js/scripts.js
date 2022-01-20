$(".dialogBox").dialog({
  autoOpen: false,
  modal: true
});
$("input[name=passwordCheck").on('input', function(){
  passwordCheck = $('input[name=passwordCheck');
  password = $('input[name=password');
  if (password.val() != passwordCheck.val()) {
    console.log(passwordCheck.val())
    $("#passwordError").text("Passwords are not equal")
  } else {
    $("#passwordError").text("")

  }
})
$("form[name=signup_form").submit(function(e) {
  var $form = $(this);
  var $error = $form.find(".error");
  var data = $form.serialize();
  passwordCheck = $('input[name=passwordCheck');
  password = $('input[name=password');
  if (password.val() == passwordCheck.val()) {
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
  }

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
    default:
      window.location.assign("/dashboard/codage");
    }
  e.preventDefault();
});

$("form[name=crackingAlgoMenu").submit(function(e) {
  e.preventDefault();
  var algorithm = $("input[name=option").val();
  window.location.assign("/dashboard/cracking/algorithm?algo="+algorithm);
});
$("form[name=crackingWordlistMenu").submit(function(e) {
  e.preventDefault();
  var dictionnary = $("input[name=dictionnary").val();
  var algorithm = $("input[name=algo").val();
  window.location.assign("/dashboard/cracking/dictionnary?algo="+algorithm+"&dictionnary="+dictionnary);
});

$("form[name=symmetricEncryptionAlgoMenu").submit(function(e) {
  e.preventDefault();
  var algorithm = $("input[name=option").val();
  window.location.assign("/dashboard/symmetric/algorithm?algo="+algorithm);
});
$("form[name=symmetricEnDecMenu").submit(function(e) {
  e.preventDefault();
  var endec = $("input[name=endec").val();
  var algorithm = $("input[name=algo").val();
  switch (endec) {
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
  window.location.assign("/dashboard/hashing/algorithm?algo="+algorithm);
});

$("form[name=asymmetricEncryptionAlgoMenu").submit(function(e) {
  e.preventDefault();
  var algorithm = $("input[name=option").val();
  window.location.assign("/dashboard/asymmetric/algorithm?algo="+algorithm);
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
$(".closeMain").click(function(e){
  e.preventDefault();
  window.location.assign("/dashboard");
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
  var message = $("input[name=message").val();
  $("#asymmetricEncryptionContainer").append('<p class="functionnalityMessage">'+message+'</p>');
  $("input[name=message").val('');
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
  var message = $("input[name=message").val();
  $("#asymmetricDecryptionContainer").append('<p class="functionnalityMessage">'+message+'</p>');
  $("input[name=message").val('');
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

// Chatroom and private messaging (socket)
$(document).ready(function() {
  if (window.location.pathname.indexOf("/dashboard/chatroom") == 0) {
    $("#dialogRequest").dialog({
      autoOpen: false,
      modal: true
    });
    var socket = io.connect('http://127.0.0.1:5000');
    var privateKey;
    socket.on('connect', function() {
      var keypair = forge.pki.rsa.generateKeyPair({bits: 2048, e: 0x10001});
      privateKey = keypair.privateKey;
      socket.emit('addUser',forge.pki.publicKeyToPem(keypair.publicKey));
    });
  
    socket.on('messageChatroom', function(data) {
      $("#messages").append('<li>'+ data +'</li>');
    });
    socket.on('addedUser', function(data) {
      $("#userslist").append('<li> <button class="user" id="onlineUser'+data.replace(/ /g,'')+'">'+ data +'</button> </li>');
    });
    socket.on('deletedUser', function(data) {
      $('#onlineUser'+data.replace(/ /g,'')).remove();
  
    });
    socket.on('initUserList', function(data) {
      Object.keys(data).forEach(function(username, id){
        $("#userslist").append('<li> <button class="user" id="onlineUser'+username.replace(/ /g,'')+'">'+ username +'</button> </li>');
      })
    });
    $( "#userslist" ).on("click",".user" ,function(e) {
      e.preventDefault();
      var username = $(this).text();
      socket.emit('privateMessageRequest', username);
    });
    $("form[name=broadcastMessage").submit( function(e) {
      e.preventDefault();
      var message = $('#broadcastMessage').val();
      socket.emit('messageChatroom', message);
      $('#broadcastMessage').val('');
    });
    $("#closeChatroom").click(function(e){
      e.preventDefault();
      socket.emit("signout");
      window.location.assign("/dashboard");
    });
    socket.on('openPrivateChat', function(username) {
      var win = window.open('http://127.0.0.1:5000/dashboard/chatroom/privateChat?user='+username, '_blank');
      if (win) {
      //Browser has allowed it to be opened
        win.focus();
      } else {
      //Browser has blocked it
      alert('Please allow popups for this website');
      }
    });
    socket.on('privateRequest', function(username) {
      if (window.location.pathname == "/dashboard/chatroom") {
      var overlay = $('<div></div>');
      $("body").append(overlay); 
      overlay.fadeIn(700).addClass('overlay-styles');;
      $("#dialogRequest").dialog({
        buttons : {
          "Confirm" : function() {
            var win = window.open('http://127.0.0.1:5000/dashboard/chatroom/privateChat?user='+username, '_blank');
            if (win) {
            //Browser has allowed it to be opened
              win.focus();
            } else {
            //Browser has blocked it
            alert('Please allow popups for this website');
            }
            socket.emit('acceptMessageRequest', username);
            $(this).dialog("close");
            overlay.fadeOut(700).remove();
          },
          "Cancel" : function() {
            $(this).dialog("close");
            overlay.fadeOut(700).remove();
          }
        },
        modal : true,
        classes: {
          "ui-dialog" : "ui-corner-all custom-red"
        },
        title: "Encrypted message request",
        show: {
          effect: 'fade',
          duration: 1000
        },
        hide: {
          effect: 'fade',
          duration: 700
        },
        open: function() {
          var markup = username + ' wants to text you! </br> Would you like to exchange keys?';
          $(this).html(markup);
        }
  
      });
  
      $("#dialogRequest").dialog("open");
    }
    });
  if (window.location.pathname.indexOf("/dashboard/chatroom/privateChat") == 0) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const username = urlParams.get('user')
    setTimeout(()=>{
      socket.emit('exchangePublicKey',username)
    },5000)
     // private messaging
     socket.on('exchangePublicKey', function(data) {
      var publicKey = data["publicKey"]
      var fromUser = data["fromUser"]
      $("#"+fromUser+"").append('<li class="alertMessages">******Key exchange******</li>');
      $("form[name=privateMessage").append('<input type="hidden" name="publicKey" value="'+publicKey+'" >')
    });
    socket.on('messagePrivate', function(data) {
      var message = data["message"]
      var fromUser = data["fromUser"]
      var decodedMessage = forge.util.decode64(message);
      var plaintextBytes = privateKey.decrypt(decodedMessage)
      var decrypted = forge.util.decodeUtf8(plaintextBytes)
      $("#"+fromUser+"").append('<li class="messages">'+ fromUser +' :'+decrypted +'</li>');
    });
    $("form[name=privateMessage").submit( function(e) {
      e.preventDefault();
      var message = $('#privateMessage').val();
      var toUser =  $('input[name=user').val();
      var fromUser =  $('input[name=fromUser').val();
      var publicKeyPEM = $('input[name=publicKey').val();
      var publicKey = forge.pki.publicKeyFromPem(publicKeyPEM);
      var plaintextBytes = forge.util.encodeUtf8(message);
      var encrypted = publicKey.encrypt(plaintextBytes);
      var base64 = forge.util.encode64(encrypted);
      var data = {
        'message': base64,
        'user': toUser,
        'publicKey': publicKeyPEM
      }
      var formStr = JSON.stringify(data, null, 2);
      var datastr = JSON.parse(formStr);
          $("#"+toUser).append('<li class= "messages">'+ fromUser +': ' +message +'</li>');
      socket.emit('messagePrivate', datastr);
      $('#privateMessage').val('');
    });    
    $(window).on("beforeunload", function() {
      var toUser =  $('input[name=user').val(); 
      socket.emit('userExit', toUser )
    });
    socket.on('userExitPrivateChat', function(fromUser) {
      $("#"+fromUser+"").append('<li class="alertMessages">'+ fromUser +' left the conversation !</li>');
      $("#"+fromUser+"").append('<li class="alertMessages"> Window will close in 10 seconds !</li>');
      setTimeout(function(){
        window.close();
       },10000);
    });
  }
}
});