import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { getUserId } from '../utils.mjs'
import { deleteTodoHandler } from '../../businessLogic/todosHandler'

export const deleteTodo = async (event) => {
  console.log('delete')
  const userId = getUserId(event)

  await deleteTodoHandler(userId, event.pathParameters.todoId)
  return {
    statusCode: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    }
  }
}
export const handler = middy(deleteTodo)
  .use(httpErrorHandler())
  .use(cors({ credentials: true }))
