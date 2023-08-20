declare module "express" {
  interface Request {
    user: {
      userId: string
      nickName: string
      roles: string[]
      permissions: string[]
    }
    headers: "authorization"
  }
}

interface JwtPlayLod {
  userId: string
  nickName: string
  exp: number
  iat: number
  [key: string]: any
}
