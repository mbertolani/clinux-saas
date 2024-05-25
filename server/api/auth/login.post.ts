import { createError, eventHandler, readBody } from 'h3'

export default eventHandler(async (event) => {
  const body = await readBody(event)
  try {
    const response: { token: string, timestamp: string } = await $fetch(`${body.api}/login/auth`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: body
    })

    const accessToken = response.token // sign({ ...user, scope: ['test', 'user'] }, SECRET, { expiresIn })
    const refreshToken = response.timestamp // sign({ username, refreshToken }, SECRET, { expiresIn: 60 * 60 * 24 * 30 }) // 30 days

    return {
      token: {
        bearer: accessToken,
        refreshToken
      }
    }
  } catch (error) {
    throw createError({ statusCode: 403, message: 'Erro de conexão com o servidor' })
  }
})
