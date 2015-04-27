/**
 * Create an object literal with the following key value pairs:
 * type: {string} 'Goldfish'
 * brand: {string} 'Pepperidge Farm'
 * flavor: {string} 'Cheddar'
 * count: {number} 2000
 * It should be returned directly by the following function
 * @return {object} - the object literal
 */

var Nabisco = {
  type: "Goldfish",
  brand: "Pepperidge Farm",
  flavor: "Cheddar",
  count: 2000
};

function returnObjectLiteral(){

  return Nabisco;

}

/**
 * Create a constructor function for a `MessageLog` object.
 * @constructor
 * @param {string} user - The user associated to the message log
 * The string indicating the user should be stored in the user property of the
 * object instances.
 *
 * In addition, the following methods should be
 * callable on a MessageLog object:
 * logMessage( {string} messageText, {number} direction) - This should log a
 * message
 * as either being sent or received. A direction of 0 indicates it is a message
 * the user sent. A direction of 1 indicates it is a message the user received.
 * Behavior for other numbers is undefined.
 * getSentMessage({number} n) - returns as a string, the content of the nth most
 * recently sent message. To conserve memory, the object should only keep the
 * last 5 message. n=0 retrieves the most recent n=4 retrieves the least recent
 * of the 5.
 * totalSent() - returns an integer indicating the total number of messages sent
 * totalReceived() - returns an integer indicating the total number of messages
 * received
 */

//your code here

var messageArray = [];
var directionArray = [];
var sentMessages = [];

function MessageLog(user){
  this.user = user;
  var messagesSent = 0;
  var messagesReceived = 0;


  this.logMessage = function (messageText, direction) {
    this.messageText = messageText;
    this.direction = direction;
    if(direction ==0){
      messagesSent=messagesSent + 1;
      sentMessages[sentMessages.length]=messageText;
    }else{
      messagesReceived=messagesReceived + 1;
    }
    if(messageArray.length==0){
      messageArray[0]=messageText;
      directionArray[0] = direction;
    }else{
      if(messageArray.length==5) {
        messageArray[0] = messageArray[1];
        messageArray[1] = messageArray[2];
        messageArray[2] = messageArray[3];
        messageArray[3] = messageArray[4]
        messageArray[4] = messageText;
        for(var i = 0; i<directionArray.length;i++)
        directionArray[i] = directionArray[i+1];
        directionArray[4]=direction;
      }else {
        messageArray[messageArray.length] = messageText;
        directionArray[directionArray.length] = direction;
      }
    }

  };
  this.getSentMessage = function(n){
    var temp = sentMessages.length-n;

        return sentMessages[temp-1];

  };

  this.totalSent = function(){
    return messagesSent;
  };

  this.totalReceived = function(){
    return messagesReceived;
  }
}

//end your code

/**
 * Add a method to the MessageLog prototype:
 * lastReceivedMessage() - returns the message text of the last message the user
 * received.
 */
//your code here
MessageLog.prototype.lastReceivedMessage = function(){

  return messageArray[messageArray.length-1];

};
//end your code

/**
 * Create an instance of a `MessageLog` for the user "BlackHatGuy". Have the
 * instance receive 3 messages: "foo", "bar" and "baz", received in that order.
 * Assign it to the variable myLog.
 */

//your code here
    if(messageArray.length==0) {
      var blackHatGuy = new MessageLog("BlackHatGuy");
      blackHatGuy.logMessage("foo", 1);
      blackHatGuy.logMessage("bar", 1);
      blackHatGuy.logMessage("baz", 1);
      var myLog = blackHatGuy;
      messageArray = [];
      directionArray = [];
      sentMessages = [];
      messagesSent = 0;
      messagesReceived = 0;

    }

//end your code
