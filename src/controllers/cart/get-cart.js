export default function makeGetCart({ getCart }) {
  return async function(httpRequest) {
    try {
      const userId = httpRequest.authObject.userId;
      const isAdmin = httpRequest.authObject.isAdmin;
      const cart = await getCart({ ...httpRequest.query, userId, isAdmin });
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 200,
        body: { status: 'success', data: cart },
      };
    } catch (e) {
      console.log(e);
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 400,
        body: {
          status: 'error',
          error: e.message,
        },
      };
    }
  };
}
