declare global {
  namespace Express {
    interface Request {
      userId?: string;
      user_role?: string;
    }
  }
}

export {};
