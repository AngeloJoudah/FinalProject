export function cookieParser(cookies){
    const arr = cookies.split('; ').reduce((acc, cookie) => {
    const [name, value] = cookie.split('=');
    acc[name] = decodeURIComponent(value);
    return acc;
  }, {})
  return arr
}
