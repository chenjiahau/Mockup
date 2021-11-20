// Sign in or sign up
$(".d-signin, .d-signup").click(function () {
  $("#sign-in-modal").modal("hide");
  $("#sign-up-modal").modal("hide");
  window.location.replace("/statistic.html?user=Stranger");
});
