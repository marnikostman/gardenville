$("#nextday").click(function(){
  $("body").fadeTo(2000, 0, function(){
    $("body").fadeTo(5000, 1);
  });
});

$('.master').hover(function(){
  var title = $(this).attr('title');
  $(this).data('tipText', title).removeAttr('title');
  $('<p class="tooltip"></p>')
  .text(title)
  .appendTo('body')
  .fadeIn('slow');
}, function(){
  $(this).attr('title', $(this).data('tipText'));
  $('.tooltip').remove();
});
