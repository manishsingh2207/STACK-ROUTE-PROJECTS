(function($){
  var sliderUl=$('div.slider').children('ul'),
  imgs=sliderUl.find('img'),
  imageWidth=imgs.width(),
  imagesLength=imgs.length,
  current=1,
  totalImagesWidth=imagesLength*imageWidth;
  ;
  $('#slider-nav').show().find('button').on('click',function(){
    var dir=$(this).data('dir');
    var loc=imageWidth;
    //update current value
    if(dir=='next')
    {
      current+=1;
      if(current>imagesLength){
        current=1;
        loc=0;
      }
    }
    else{
      current-=1;
      if(current==0){
        current=imagesLength;
        loc=-loc*(imagesLength-1);
      }
    }

    transition(sliderUl, loc, dir);
  });

  function transition(container, loc, direction){
    var unit;

    if(direction && loc!==0){
      unit=(direction=='next')?'-=':'+=';
    }
      container.animate({
        'marginLeft':unit?(unit+loc):loc
      })
  }

})(jQuery);
