'use server'

import { action } from '@/actions'
import jwt from 'jsonwebtoken'
import { resetPasswordRoute } from '../routes'

const JWT_SECRET = "JWT-CONFIG"

export const redefinePassword = async ({ email }: { email: string }) => {
  if (!(await action.usuario().find({ where: { email } }))) return

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '5m' })

  const url = `${process.env.NEXT_PUBLIC_URL}${resetPasswordRoute}${token}`

}
