exports.function = function (searchTerm) {
  var http = require('http')

  var response = http.getUrl('https://proapi.whitepages.com/3.1/phone?api_key=bc24b1c240ba4a0a9a16a8685d2793ff&phone=' + searchTerm, {
    format: 'json',
    headers: {
      accept: 'application/json'
    }
  });

   if (response.id == null) {
     return ;
   }
  
   return {
     text: response.belongs_to.name,
     carrier: response.carrier,
     city: response.current_addresses.city,
     countrycallingcode: response.country_calling_code,
     gender: response.belongs_to.gender,
     iscommercial: response.is_commercial,
     isprepaid: response.is_prepaid,
     isvalid: response.is_valid,
     linetype: response.line_type,
     linktophonestartdate: response.belongs_to.link_to_phone_start_date,
     name: response.belongs_to.name,
     phonenumber: response.phone_number,
     postalcode: response.current_addresses.postal_code,
     streetline1: response.current_addresses.street_line_1,
     type: response.belongs_to.type,
    }
 }