const DEV_MODE = true;
export const API_BASE =
  DEV_MODE == true
    ? "http://192.168.125.105:8006/api/v1"
    : "https://recitebackend-8155.nodechef.com/api/v1";
export const IMG_URL =
  DEV_MODE == true
    ? "http://192.168.125.105:8006/images/"
    : "https://recitebackend-8155.nodechef.com/images/";
