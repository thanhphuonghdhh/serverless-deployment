import { getTodosByUserId } from '../../businessLogic/todosHandler.mjs'
import { getUserId } from '../utils.mjs'
import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'

const getTodos = async (event) => {
  console.log("start to get user");
  
  const userId = getUserId(event)
  const todos = await getTodosByUserId(userId)
  console.log('get user ', userId)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(todos)
  }
}

export const handler = middy(getTodos)
  .use(httpErrorHandler())
  .use(cors({ credentials: true }))
