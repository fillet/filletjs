import ApplicationConfig from '@app/config/App';

const COOKIE_NAME = `${ApplicationConfig.cookieName}-${ApplicationConfig.env}`;

export default class Session {
  static Set(params: any, context: string = 'main', exdays: number = 1) {
    const currentSession = Session.Get(context);
    params.createdAt = Date.now();

    const date = new Date();
    const duration = context == 'auth' ? 3600 : exdays * 24 * 60 * 60;
    date.setSeconds(date.getSeconds() + duration);

    const expires = 'expires=' + date.toUTCString();
    const value = JSON.stringify({ ...currentSession, ...params });

    document.cookie = `${COOKIE_NAME}-${context}=${value};${expires};domain=${window.location.hostname};path=/;`;
  }

  static Get(context: string = 'main'): any {
    const name = `${COOKIE_NAME}-${context}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    let token = null;

    cookieArray.forEach((cookiePart) => {
      let c = cookiePart;

      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }

      if (c.indexOf(name) == 0) {
        token = c.substring(name.length, c.length);
      }
    });

    return token ? JSON.parse(token) : {};
  }

  static destroy(context: string = 'main') {
    document.cookie = `${COOKIE_NAME}-${context}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${window.location.hostname}; path=/;`;
  }
}
