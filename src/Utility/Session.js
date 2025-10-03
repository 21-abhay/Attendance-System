// Save data with expiry
export function setSessionItem(key, value, ttlMinutes = 30) {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + ttlMinutes * 60 * 1000, // expiry in ms
  };
  sessionStorage.setItem(key, JSON.stringify(item));
}

// Get data with expiry check
export function getSessionItem(key) {
  const itemStr = sessionStorage.getItem(key);
  if (!itemStr) return null;

  const item = JSON.parse(itemStr);
  const now = new Date();

  if (now.getTime() > item.expiry) {
    // ⏰ expired → remove it
    sessionStorage.removeItem(key);
    return null;
  }
  return item.value;
}
