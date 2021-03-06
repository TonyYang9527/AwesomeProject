/**
 * Pub/Sub JavaScript Object
 * come from
 * https://davidwalsh.name/pubsub-javascript
 */
const Events = (function(){
    var topics = {};
    var hOP = topics.hasOwnProperty;

    return {
      subscribe: function(topic, listener) {
        if(!hOP.call(topics, topic)) topics[topic] = [];
        var index = topics[topic].push(listener) -1;
        return {
          remove: function() {
            topics[topic].splice(index);
          }
        };
      },
      publish: function(topic, info) {
        if(!hOP.call(topics, topic)) return;
        topics[topic].forEach(function(item) {
                item(info != undefined ? info : {});
        });
      }
    };
  })();

  export default Events;
