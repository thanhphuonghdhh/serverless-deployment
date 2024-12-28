import AWSXRay from 'aws-xray-sdk-core'
import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import { createLogger } from '../utils/logger.mjs'

const logger = createLogger('database')

export class TodoAccess {
  constructor(
    documentClient = AWSXRay.captureAWSv3Client(new DynamoDB({})
    )
  ) {
    this.dynamoDbClient = DynamoDBDocument.from(documentClient)
    this.todosTable = process.env.TODOS_TABLE,
    this.index = process.env.TODOS_CREATED_AT_INDEX
  }

  async getToDosByUserId(userId) {
    logger.info('Get todos by user Id: ', { userId })

    const result = await this.dynamoDbClient.query({
      TableName: this.todosTable,
      IndexName: this.index,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      }
    })

    return result.Items
  }

  async createTodo(todo) {
    logger.info('create todo', todo)

    await this.dynamoDbClient.put({
      TableName: this.todosTable,
      Item: todo
    })

    return todo
  }

  async updateTodo(userId, todoId, updateTodo) {
    logger.info('Update todo', { userId, todoId, updateTodo })

    await this.dynamoDbClient.update({
      TableName: this.todosTable,
      Key: { userId, todoId },
      UpdateExpression: 'set #name = :name, dueDate = :dueDate, done = :done',
      ExpressionAttributeNames: { '#name': 'name' },
      ExpressionAttributeValues: {
        ':name': updateTodo.name,
        ':dueDate': updateTodo.dueDate,
        ':done': updateTodo.done
      },
      ReturnValues: 'UPDATED_NEW'
    })
  }

  async updateAttachedFileUrl(userId, todoId, attachmentUrl) {
    logger.info('Update attachment URL', { userId, todoId, attachmentUrl })

    await this.dynamoDbClient.update({
      TableName: this.todosTable,
      Key: { userId, todoId },
      UpdateExpression: 'set attachmentUrl = :attachmentUrl',
      ExpressionAttributeValues: {
        ':attachmentUrl': attachmentUrl
      },
      ReturnValues: 'UPDATED_NEW'
    })
  }

  async deleteTodo(userId, todoId) {
    logger.info('Deleting a todo', { userId, todoId })

    await this.dynamoDbClient.delete({
      TableName: this.todosTable,
      Key: { userId, todoId }
    })
  }
}
