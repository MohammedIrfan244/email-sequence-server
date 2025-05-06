const infoLogger = (message: string) => {
  if (process.env.NODE_ENV === "production") return;
  console.log(`\x1b[36m[INFO]\x1b[0m ${message}`);
};

const errorLogger = (message: unknown) => {
  if (process.env.NODE_ENV === "production") return;
  if (message instanceof Error) {
    console.error(`\x1b[31m[ERROR]\x1b[0m ${message.message}`);
    return;
  }
  if (typeof message === "object") {
    console.error(`\x1b[31m[ERROR]\x1b[0m ${JSON.stringify(message)}`);
    return;
  }
  console.error(`\x1b[31m[ERROR]\x1b[0m ${message}`);
};

export { infoLogger, errorLogger };
