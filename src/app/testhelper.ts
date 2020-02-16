export const newEvent = (eventName, bubbles = false, cancelable = false) => {
  const event = document.createEvent('CustomEvent');
  event.initCustomEvent(eventName, bubbles, cancelable, null);
  return event;
};
