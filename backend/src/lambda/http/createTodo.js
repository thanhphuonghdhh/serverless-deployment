import { createTodoHandler } from '../../businessLogic/todosHandler.mjs'
import { getUserId } from '../utils.mjs'
import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'

const createTodo = async (event) => {
  console.log('create todo')

  const todo = JSON.parse(event.body)
  const userId = getUserId(event)
  const res = await createTodoHandler(userId, todo)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({ res })
  }
}

export const handler = middy(createTodo)
  .use(httpErrorHandler())
  .use(cors({ credentials: true }))
