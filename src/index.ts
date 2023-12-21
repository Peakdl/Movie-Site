import express, { Request, Response, request, response } from "express"
import { v4 as uuidv4 } from 'uuid';
import { connectDB } from "./config/db";
import { Movie, PrismaClient, User,Comment} from "@prisma/client";
const prisma = new PrismaClient()
const app = express()
app.use(express.json())
const port = 3002
//------------------------o----------</\>-----------o-------------------------\\

connectDB()

//------------------------o----------</\>-----------o-------------------------\\
app.post('/addUser',async  (req: Request, res: Response) => {
    const newUser = req.body as User;

    await prisma.user.create({
        data: newUser
    });
    return res.json('User added');
});
app.get('/user/:id',async(req:Request,res:Response)=>{
    const {id} = req.params
    const userId = await prisma.user.findMany({
     where:{
        id:id,
     },select:{
     username:true,
     password:true,
     comments:true
     }
    })
      res.json(userId);
})
app.put('/updateuser/:id', async (req: Request, res: Response) => {
    const {id} = req.params
    const user = req.body as User
    await prisma.user.update({
        where: { id: id },
        data: user
    })
    res.json('user updated')
})
app.delete('/deleteuser/:id', async (req: Request, res: Response) => {
    const {id} = req.params
    await prisma.user.delete({
        where: { id: String(id) }
    })
    res.json('user deleted')
})
//------------------------o----------</\>-----------o-------------------------\\
app.get('/ALLMovie',async(req:Request,res:Response)=>{
    const Movies = await prisma.movie.findMany({
     
    })
      res.json(Movies);
})

app.post('/addMovie',async  (req: Request, res: Response) => {
    const newMovie = req.body as Movie;

    await prisma.movie.create({
        data: newMovie
    });
    return res.json('Movie added');
});
app.get('/Findmovie/:id',async(req:Request,res:Response)=>{
    const {id} = req.params
    const Movieid = await prisma.movie.findMany({
        where:{
            id:id
         },select:{
            title:true,
            duration:true,
            rating:true,
            genre:true,
            comments:true
         }
    })
      res.json(Movieid);
})
app.get('/FindmovieComments/:id',async(req:Request,res:Response)=>{
    const {id} = req.params
    const Movieid = await prisma.movie.findMany({
        where:{
            id:id
         },select:{
            comments:true
         }
    })
      res.json(Movieid);
})
//------------------------o----------</\>-----------o-------------------------\\
app.post('/addComment',async  (req: Request, res: Response) => {
    const commentnew = req.body as Comment;

    await prisma.comment.create({
        data : commentnew
    });
    return res.json('comment added');
});
app.put('/updateComment/:id', async (req: Request, res: Response) => {
    const {id} = req.params
    const updateComment = req.body as Comment
    await prisma.comment.update({
        where: { id: id },
        data: updateComment
    })
    res.json('Comment updated')
})
app.delete('/deleteComment/:id', async (req: Request, res: Response) => {
    const {id} = req.params
    await prisma.comment.delete({
        where: { id: String(id) }
    })
    res.json('Comment deleted')
})


//------------------------o----------</\>-----------o-------------------------\\
app.listen(port, () => {
    console.log(' server listing 3002');

})

