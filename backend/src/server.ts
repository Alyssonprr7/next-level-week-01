import express from 'express'
import routes from './routes'
import cors from 'cors'
import {errors} from "celebrate"
import path from 'path'

const app = express();

app.use(cors())
app.use(express.json()) //Isso faz com que o express consiga entender body's json
app.use(routes)

app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(errors())

app.listen(3333); 