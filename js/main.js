jQuery(document).ready(function() {
   var ItemModel = function(defaultValue) {
      var self = this;

      self.name = ko.observable(defaultValue.Name || "No name");
      self.type = ko.observable(defaultValue.Type || "No type");
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
               
               // We want to clear any previous results
               // so we can use KnockoutJS's convenience method removeAll()
               self.items.removeAll();
               
               if(data && data.Similar && data.Similar.Results) {
                   if(0 !== data.Similar.Results.length) {
                       // Apply bindings to self.items
                       jQuery.each(data.Similar.Results, function(index, value) {
                           var item = new ItemModel(value);
                           self.items.push(item);
                       });
                   } else {
                       var item = new ItemModel({
                           "Name": "No data found",
                           "Type": ""
                       });
                       self.items.push(item);
                   }
               } else {
                   console.error("No data fetched from server.");
               }
           }
         });
      };

      self.initialize();
   };

   ko.applyBindings(new ItemViewModel());
});