/**
 * rdutimer jQuery Plugin v1.0.0
 * https://github.com/sytark/rdutimer
 * Licensed MIT
 *
 * Usage:
 * $(document).ready(function(){
 *   $('.timepicker').RDUTimer({
 *     stepMinute: 15,         // minute step
 *     stepHour: 1,      // hour step
 *     format: '12',     // '12' for 12-hour with AM/PM or '24'
 *     initialTime: '8:30 PM' // optional, format depends on format setting (exam: 08:30 PM / 20:30)
 *   });
 * });
 */
(function($){
  $.fn.RDUTimer = function(options){
    var settings = $.extend({
      stepMinute: 1,          // minute step
      stepHour: 1,      // hour step
      format: '24',     // '24' or '12'
      initialTime: null // 'HH:MM' or 'H:MM AM/PM'
    }, options);

    return this.each(function(){
      var $container = $(this)
        .addClass('rdutimer-container')
        .css('position','relative');

      var $input = $('<input>',{
        type: 'text',
        class: 'rdutimer-input',
        readonly: true,
        placeholder: settings.format === '12' ? 'HH:MM AM' : 'HH:MM'
      });
      var $panel = $('<div>',{ class: 'rdutimer-panel' });
      var $colH  = $('<div>',{ class: 'rdutimer-col hours' });
      var $colM  = $('<div>',{ class: 'rdutimer-col minutes' });
      $panel.append($colH, $colM);

      var $colAP, selAP = 'AM';
      if(settings.format === '12'){
        $colAP = $('<div>',{ class: 'rdutimer-col meridiem' }).append(
          $('<div>',{ class: 'rdutimer-item am', text: 'AM', 'data-value': 'AM' }),
          $('<div>',{ class: 'rdutimer-item pm', text: 'PM', 'data-value': 'PM' })
        );
        $panel.append($colAP);
      }
      $container.empty().append($input, $panel);

      var selH = '00', selM = '00';

      // Populate hours
      if(settings.format === '24'){
        for(var h = 0; h < 24; h += settings.stepHour){
          var hh = String(h).padStart(2,'0');
          $('<div>',{ class: 'rdutimer-item hour', text: hh, 'data-value': hh }).appendTo($colH);
        }
      } else {
        for(var h = 1; h <= 12; h += settings.stepHour){
          var hh = String(h).padStart(2,'0');
          $('<div>',{ class: 'rdutimer-item hour', text: hh, 'data-value': hh }).appendTo($colH);
        }
      }
      // Populate minutes
      for(var m = 0; m < 60; m += settings.stepMinute){
        var mm = String(m).padStart(2,'0');
        $('<div>',{ class: 'rdutimer-item minute', text: mm, 'data-value': mm }).appendTo($colM);
      }

      function highlight(){
        $colH.find('.hour').removeClass('selected')
               .filter('[data-value="'+selH+'"]').addClass('selected');
        $colM.find('.minute').removeClass('selected')
               .filter('[data-value="'+selM+'"]').addClass('selected');
        if(settings.format === '12'){
          $colAP.find('.rdutimer-item').removeClass('selected')
                 .filter('[data-value="'+selAP+'"]').addClass('selected');
        }
      }
      function updateInput(){
        var val = selH + ':' + selM;
        if(settings.format === '12') val += ' ' + selAP;
        $input.val(val);
      }

      // Parse initialTime or set current time
      if(settings.initialTime){
        var it = settings.initialTime.trim();
        if(settings.format === '12'){
          var parts = it.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
          if(parts){ selH = parts[1].padStart(2,'0'); selM = parts[2]; selAP = parts[3].toUpperCase(); }
        } else {
          var parts = it.match(/(\d{1,2}):(\d{2})/);
          if(parts){ selH = parts[1].padStart(2,'0'); selM = parts[2]; }
        }
      } else {
        var now = new Date();
        var h0 = now.getHours();
        if(settings.format === '12'){
          selAP = h0 < 12 ? 'AM' : 'PM';
          h0 = h0 % 12 || 12;
        }
        // round hours
        var hRound = settings.format === '24'
          ? Math.floor(h0 / settings.stepHour) * settings.stepHour
          : Math.floor((h0-1) / settings.stepHour) * settings.stepHour + 1;
        selH = String(hRound).padStart(2,'0');
        // round minutes
        var mRound = Math.floor(now.getMinutes()/settings.stepMinute)*settings.stepMinute;
        selM = String(mRound).padStart(2,'0');
      }
      highlight(); updateInput();

      // Events
      $input.on('click', function(e){
        e.stopPropagation();
        $panel.css('display','flex');
      });
      $colH.on('click','.hour', function(){ selH = $(this).data('value'); highlight(); updateInput(); });
      $colM.on('click','.minute', function(){ selM = $(this).data('value'); highlight(); updateInput(); $panel.hide(); });
      if(settings.format === '12'){
        $colAP.on('click','.rdutimer-item', function(){ selAP = $(this).data('value'); highlight(); updateInput(); });
      }
      $(document).on('click', function(e){
        if(!$container.is(e.target) && $container.has(e.target).length === 0){
          $panel.hide();
        }
      });
    });
  };
})(jQuery);
