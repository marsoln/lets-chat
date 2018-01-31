import jQuery from 'jquery'

let __to = -1

export default () => {
  jQuery('.direct-chat-messages,.direct-chat-contacts').height(jQuery(window).height() - 300)
  jQuery.warning = function (content) {

    let $panel = jQuery(warningPanel)
    $panel.find('.warning-content').html(content)

    window.clearTimeout(__to)

    $panel
      .hide()
      .show()

    __to = setTimeout(() => {
      $panel.fadeOut(500)
    }, 1200)

    jQuery('input[data-ng-model="viewData.sendContent"]').focus()
  }
}
