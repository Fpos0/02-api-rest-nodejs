import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test', override: true })
} else {
  config()
}

// This function handles the verification if the information exist or not
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_URL: z.string(),
  PORT: z.number().default(3333),
})
// Check if database url is a string and exist
// if a error occur,parse throws an error
// safeParse does the validation,but dont throw error if fail
const _env = envSchema.safeParse(process.env)

// Create your own error instead of the Zod one
if (_env.success === false) {
  console.error('Invalid environment variables!', _env.error.format())

  throw new Error('Invalid environment variables!')
}

export const env = _env.data
