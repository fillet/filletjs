import type { CookieObject, SetCookieOptions } from "./Types";

import App from "@app/config/App";

const COOKIE_NAME = `${App.cookieName}-${App.env}`;

export class Session {
  static set<TData extends object>(
    data: TData,
    options: SetCookieOptions = {}
  ) {
    const {
      context = "main",
      expires = 6,
      path = "/",
      domain = window.location.hostname,
      sessionCookie = false,
      preserveCookieData = false,
    } = options;

    const currentCookie = this.get<TData>(context);

    const createdAt = Date.now();
    const date = new Date();
    const duration = expires * 24 * 60 * 60 * 1000;
    date.setTime(date.getTime() + duration);

    const cookie: CookieObject<TData> = {
      data,
      context,
      createdAt,
      domain,
      path,
      sessionCookie,
      expires: sessionCookie ? "" : date.toUTCString(),
    };

    const cookieExpires = !sessionCookie
      ? `expires=${cookie.expires};`
      : cookie.expires;

    const cookieDomain = `domain=${cookie.domain};`;
    const cookiePath = `path=${cookie.path}`;

    if (currentCookie) {
      cookie.oldData = currentCookie.data;

      if (preserveCookieData) {
        cookie.data = { ...currentCookie.data, ...cookie.data };
      }
    }

    const baseValue = window.btoa(JSON.stringify(cookie));

    document.cookie = `${COOKIE_NAME}-${context}=${baseValue};${cookieExpires}${cookieDomain}${cookiePath}`;

    return cookie;
  }

  static get<TData extends object>(
    context = "main"
  ): CookieObject<TData> | false {
    const name = `${COOKIE_NAME}-${context}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");

    let token: string | undefined;

    cookieArray.forEach((cookiePart) => {
      let c = cookiePart;

      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }

      if (c.indexOf(name) == 0) {
        token = c.substring(name.length, c.length);
      }
    });

    return token ? JSON.parse(window.atob(token)) : false;
  }

  static destroy(context = "main") {
    document.cookie = `${COOKIE_NAME}-${context}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
  }
}

export default Session;
