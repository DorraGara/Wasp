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