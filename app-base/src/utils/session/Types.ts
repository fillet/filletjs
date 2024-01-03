export type SetCookieOptions = {
  /**
   * Name of the context of the cookie
   * @example "coolName"
   * @default "main"
   */
  context?: string;
  /**
   * Time of the cookie expiration in days
   * @example expires = 10; the cookie will expires in 10 days from today
   * @default 6
   */
  expires?: number;
  /**
   * Defines if the cookie will be deleted when the session in the domain is over
   * @default false
   */
  sessionCookie?: boolean;
  /**
   * Defines the cookie domain
   * @default window.location.hostname
   */
  domain?: string;
  /**
   * Defines the path of the cookie
   * @default "/"
   */
  path?: string;
  /**
   * Defines if the cookie data will be replaced or merged from the last cookie
   * @default false
   */
  preserveCookieData?: boolean;
};

export type CookieObject<TData> = {
  data: TData;
  context: string;
  createdAt: number;
  path: string;
  domain: string;
  sessionCookie: boolean;
  expires: string;
  oldData?: TData;
};
