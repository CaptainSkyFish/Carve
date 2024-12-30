import { Hono } from "hono"
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from "hono/jwt"
import { createBlogInput, updateBlogInput } from "@cpt_skyfish_/carve-common"
import { PrismaClient } from "@prisma/client/edge"
const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL : string
        JWT_SECRET : string
        saltRounds : string | number
    }
}>()

const getPrisma = (datbase_url: string) => {
  const prisma = new PrismaClient({
  datasourceUrl: datbase_url,
}).$extends(withAccelerate());
return prisma
}

//middleware
blogRouter.use('/*', async (c, next) => {
    const authToken = c.req.header("authorization")?.split(" ")[1] as string
  
    if(authToken){
      try {
        const decodedPayload = await verify(authToken, c.env.JWT_SECRET);       //verifies the integrity of (and gets back) the payload from jwt provided by the user
    
        if (decodedPayload.id) {
          c.set( 'jwtPayload', decodedPayload );       //store the userId 
          return next(); // Proceed to the next middleware or handler
        }
      } catch (error) {
        c.status(401);
        return c.json({ errorMessage: "Invalid or expired token" });
    }} 
    c.status(401)
    return c.json({errorMessage: "Unauthorized!"})
  })
  
  //post a blog
  blogRouter.post('/', async (c) => {
    const prisma = getPrisma(c.env.DATABASE_URL)
  
    const jwtPayload = c.get('jwtPayload');
    // if (!jwtPayload || !jwtPayload.id) {
    //   c.status(401);
    //   return c.json({ errorMessage: "Unauthorized" });
    // } 
  
    
    const body = await c.req.json()
    const {success} = createBlogInput.safeParse(body)
    if(!success){
      c.status(400)
      return c.json({
        errorMessage: "Title and Content are required"
      })
    }

    const post = await prisma.post.create({
      data: {
        authorId: jwtPayload.id,
        title: body.title,
        content: body.content
      }
    })
  
    c.status(200)
    return c.json({id: post.id})
  })
  
  //update a blog
  blogRouter.put('/', async (c) => {
    const prisma = getPrisma(c.env.DATABASE_URL)
  
    let jwtPayload
    const body = await c.req.json()
    try{
    updateBlogInput.parse(body)
    jwtPayload = c.get('jwtPayload')
    }catch(e){
      c.status(400)
      return c.json({errorMessage: "Invalid Request. Author Id or/and Post ID Missing or Invalid"})
    }
    console.log("i am here")
    await prisma.post.update({
      where: {
        id: body.id,
        authorId: jwtPayload.id
      },
      data: {
        title: body.title,
        content: body.content
      }
    })
    c.status(200)
    return c.json({message: "Post Updated Succesfully!"})
  })
  
  //get all blogs no algo
  blogRouter.get('/bulk', async (c) => {
    const prisma = getPrisma(c.env.DATABASE_URL)
  
    const blogs = await prisma.post.findMany({})
    return c.json({blogs})
  })

  //get blog with id
blogRouter.get('/:id', async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL)
    
    console.log(c.env.DATABASE_URL)
    console.log(c.env.JWT_SECRET)
    console.log(c.env.saltRounds)
    const id = c.req.param('id')
    if(id){
      const blog = await prisma.post.findUnique({
        where: {id}
      })
      c.status(200)
      return c.json(blog)
    }
    c.status(401)
    return c.json({errorMessage: "Invalid id"})
  })
  
  export default blogRouter
  