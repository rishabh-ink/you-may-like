jQuery(document).ready(function() {
   var ItemModel = function() {
      var self = this;

      self.name = ko.observable("No name");
      self.type = ko.observable("No type");
   };

   var ItemViewModel = function() {
      var self = this;

      self.items = ko.observableArray();
      
      self.inputQuery = ko.observable("Harry Potter");

      self.initialize = function() {
      };

      self.getItems = function() {
         jQuery.ajax({
           url: "http://www.tastekid.com/ask/ws",
           type: "GET",
           dataType: "jsonp",
           async: true,
           cache: true,
           jsonp: "jsonp",
           data: {
               q: self.inputQuery,
               format: "JSON"
           },
           beforeSend: function(jqXHR, settings) {
               console.log(jqXHR, settings);
           },
           complete: function(jqXHR, settings) {
               console.log(jqXHR, settings);
           },
           error: function(jqXHR, textStatus, errorThrown) {
               console.log(jqXHR, textStatus, errorThrown);
           },
           success: function(data, textStatus, jqXHR) {
               console.log(data, textStatus, jqXHR);
           }
         });
      };

      self.initialize();
   };

   ko.applyBindings(new ItemViewModel());
});