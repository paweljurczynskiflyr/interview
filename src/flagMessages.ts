import { Message } from "./types";

export default function flagMessages(messages: Message[], selectedIds: number[]): Message[] {
  var messagesToReturn = [];
  var flagCounter = 0;

  // Get only the messages we care about
  var messagesInQuestion = [];
  for (var i = 0; i < messages.length; i++) {
    if (selectedIds.indexOf(messages[i].id) !== -1) {
      messagesInQuestion.push(messages[i]);

      if (messages[i].flagged) {
        flagCounter++;
      }
    }
  }

  // Iterate through all messages we care about and change their flags if needed
  for (var i = 0; i < messagesInQuestion.length; i++) {
    if (flagCounter > 0) {
      if (flagCounter !== selectedIds.length) {
        messagesInQuestion[i].flagged = true;
        messagesToReturn.push(messagesInQuestion[i]);
      } else {
        messagesInQuestion[i].flagged = false;
        messagesToReturn.push(messagesInQuestion[i]);
      }
    } else {
      messagesInQuestion[i].flagged = true;
      messagesToReturn.push(messagesInQuestion[i]);
    }
  }

  // Fill missing messages to array
  for (var i = 0; i < messages.length; i++) {
    if (!messagesToReturn.find((m) => m.id === messages[i].id)) {
      messagesToReturn.push(messages[i]);
    }
  }

  // Sorting
  messagesToReturn.sort((a, b) => a.id - b.id);

  return messagesToReturn;
}
