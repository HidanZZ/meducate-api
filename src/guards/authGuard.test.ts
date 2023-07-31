// authGuard.test.ts
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import { authGuard } from './authGuard'

describe('authGuard', () => {
  let mockRequest: any
  let mockResponse: any
  let mockNext: any

  beforeEach(() => {
    mockRequest = {
      context: {
        user: {
          verified: true
        }
      }
    }
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    mockNext = jest.fn()
  })

  it('should allow if user is verified', () => {
    authGuard.isAuth(mockRequest, mockResponse, mockNext)
    expect(mockNext).toHaveBeenCalled()
  })

  it('should reject if user is not verified', () => {
    mockRequest.context.user.verified = false
    authGuard.isAuth(mockRequest, mockResponse, mockNext)
    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.UNAUTHORIZED)
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: ReasonPhrases.UNAUTHORIZED,
      status: StatusCodes.UNAUTHORIZED
    })
  })

  it('should allow if user is not present', () => {
    mockRequest.context.user = null
    authGuard.isGuest(mockRequest, mockResponse, mockNext)
    expect(mockNext).toHaveBeenCalled()
  })

  it('should reject if user is present', () => {
    mockRequest.context.user = { verified: false }
    authGuard.isGuest(mockRequest, mockResponse, mockNext)
    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.FORBIDDEN)
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: ReasonPhrases.FORBIDDEN,
      status: StatusCodes.FORBIDDEN
    })
  })
})
