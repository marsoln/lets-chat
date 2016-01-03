$('.direct-chat-messages,.direct-chat-contacts').height($(window).height() - 300);


$.warning = function (content) {
  var $panel = $(warningPanel);
  $panel.find('.warning-content').html(content);
  $panel.show().fadeOut(2500);
  $('input[data-ng-model="viewData.sendContent"]').focus();
};