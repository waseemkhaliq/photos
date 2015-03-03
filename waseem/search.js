  (function(){
      $("#search_placename").focus();
      if (navigator.geolocation)
      {
        navigator.geolocation.getCurrentPosition(function(position)
        {
          $('#search_latlng').val(position.coords.latitude+','+position.coords.longitude);
          console.log('latlng set');
          $('#search_type').val('SPATIAL');
          var osmrequest = 'http://nominatim.openstreetmap.org/reverse?format=json&lat='+position.coords.latitude+'&lon='+position.coords.longitude+'&addressdetails=1&email=webmaster@propertypropertyproperty.co.uk';
          $.getJSON( osmrequest, function(data) {
            if (data.address.town) {
              $('#search_placename').val(data.address.town+', '+data.address.county);
            } else {
              $('#search_placename').val('Current location');
            }
            
          });
        });
      }

    })();

    $(function() {

      $( "#search_placename" ).autocomplete({

        source: function( request, response ) {
          $.ajax({
            url: "site/rpcsuggestions",
            dataType: "json",
            data: {
              term:$('#search_placename').val()
            },
            success: function( data ) {

              response( $.map( data[0], function( item ) {

                var displaystring = '<b>'+item.DISPLAY_NAME.substr(0,data[1].length)+'</b>'+item.DISPLAY_NAME.substr(data[1].length);

                return {
                  label: displaystring,
                  value: item.DISPLAY_NAME
                }
              }));
            }
          });
        },
        minLength: 2,
        select: function( event, ui ) {
          // when selected
        },
        open: function() {
          $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
        },
        close: function() {
          $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
        }
      }).data( "autocomplete" )._renderItem = function( ul, item ) {
        return $( "<li></li>" )
          .data( "item.autocomplete", item )
          .append( '<a class="plain">' + item.label + "</a>" )
          .appendTo( ul );
      };
    });