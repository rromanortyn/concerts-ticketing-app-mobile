interface Payload {
  code: string,
  message: string,
}

class ServerSideException extends Error {
  code!: string

  constructor({ code, message }: Payload) {
    super(message)

    this.code = code
  }
}

export default ServerSideException
