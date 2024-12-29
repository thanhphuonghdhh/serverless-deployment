import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { updateTodoHandler } from '../../businessLogic/todosHandler.mjs';
import { getUserId } from '../utils.mjs';

const updateTodo = async (event) => {
  console.log("update");

  const updateTodo = JSON.parse(event.body)
  const { todoId } = event.pathParameters
  const userId = getUserId(event)

  const res = await updateTodoHandler(userId, todoId, updateTodo)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(res)
  }
}

export const handler = middy(updateTodo).use(httpErrorHandler()).use(cors({ credentials: true }))