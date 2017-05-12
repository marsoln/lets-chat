import $ from 'jquery'
let __to = -1
export default () => {
  $('.direct-chat-messages,.direct-chat-contacts').height($(window).height() - 300)
  $.warning = function (content) {

    let $panel = $(warningPanel)
    $panel.find('.warning-content').html(content)

    window.clearTimeout(__to)

    $panel
      .hide()
      .show()

    __to = setTimeout(() => {
      $panel.fadeOut(500)
      // $panel.hide()
    }, 1200)

    $('input[data-ng-model="viewData.sendContent"]').focus()
  }
}
