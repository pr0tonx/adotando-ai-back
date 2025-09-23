class ResponseFactory {
  createSuccess(message, data = {}, status = 200) {
    return {
      success: true,
      message,
      data,
      status
    };
  };

  createError(type, message, details = {}, status = 400) {
    return {
      success: false,
      error: {
        type,
        message,
        details
      },
      status
    };
  };
}

module.exports = ResponseFactory;