import { Sentry } from './lib/sentry'

import { Request, Response } from 'express'

interface HttpFunction {
  (request: Request, response: Response): Promise<void>
}

export const parseMetadata: HttpFunction = Sentry.GCPFunction.wrapHttpFunction(
  async (request, response) => {
    Sentry.setTag('functionName', 'parseMetadata')

    const { name } = request.body
    console.log('Parsing metadata:', name)

    // ...

    response.status(200).send({ status: 'OK' })

    return Promise.resolve()
  }
)
