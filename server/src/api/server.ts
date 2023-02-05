import fastify from "fastify"
import cors from '@fastify/cors'

import { appRoutes } from './routes'
import * as Jobs from '../jobs/jobs'
import * as PushNotification from '../lib/push-notification'

const app = fastify()

app.register(cors)

app.register(appRoutes)

Jobs.configJobs()

PushNotification.config()

app.listen({port: 3030}).then(() => console.log('Server is running!'))
