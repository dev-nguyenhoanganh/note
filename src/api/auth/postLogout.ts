const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const postLogout = async (userId: string) => {
  return delay(1000).then(() => ({
    statusCode: 200,
    userId,
  }));
};

export default postLogout;
