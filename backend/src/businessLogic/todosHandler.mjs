import { TodoAccess } from '../database/todosAccess.mjs'
import * as uuid from 'uuid'
import { generateUrl, getUrl } from '../utils/attachmentURL.js'

const todosAccess = new TodoAccess()

export const getTodosByUserId = async (userId) => {
  console.log('get user ', userId)

  return todosAccess.getToDosByUserId(userId)
}

export const createTodoHandler = async (userId, todo) => {
  console.log('create user ', userId)
  const todoId = uuid.v4()

  return await todosAccess.createTodo({
    todoId,
    userId,
    createdAt: new Date().toISOString(),
    done: false,
    ...todo
  })
}

export const updateTodoHandler = async (userId, todoId, updateTodo) => {
  console.log(`Update todo ${todoId} for user ${userId}`)
  return await todosAccess.updateTodo(userId, todoId, updateTodo)
}

export const deleteTodoHandler = async (userId, todoId) => {
  console.log(`Delete todo ${todoId} for user ${userId}`)
  return await todosAccess.deleteTodo(userId, todoId)
}

export const updateAttachedFileUrl = async (userId, todoId) => {
  console.log(`Update attachment URL for todo ${todoId} for user ${userId}`)
  const attachmentUrl = await getUrl(todoId)
  const uploadUrl = await generateUrl(todoId)
  await todosAccess.updateAttachedFileUrl(userId, todoId, attachmentUrl)
  return uploadUrl;
}
