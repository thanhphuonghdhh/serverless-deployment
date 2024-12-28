import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { getUserId } from '../utils.mjs'
import { updateAttachedFileUrl } from '../../businessLogic/todosHandler.mjs'

export const generateUploadUrl = async (event) => {
  console.log('generate url')
  const userId = getUserId(event)

  const uploadUrl = await updateAttachedFileUrl(userId, event.pathParameters.todoId)
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({ uploadUrl }),
  }
}
export const handler = middy(generateUploadUrl)
  .use(httpErrorHandler())
  .use(cors({ credentials: true }))
