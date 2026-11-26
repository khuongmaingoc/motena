export type SupabaseCookie = {
  name: string;
  value: string;
  options: {
    domain?: string;
    expires?: Date;
    httpOnly?: boolean;
    maxAge?: number;
    path?: string;
    partitioned?: boolean;
    priority?: "low" | "medium" | "high";
    sameSite?: boolean | "lax" | "strict" | "none";
    secure?: boolean;
  };
};
