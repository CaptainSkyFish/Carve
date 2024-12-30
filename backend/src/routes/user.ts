import { Hono } from "hono";
import { sign } from 'hono/jwt'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { signInInput, signUpInput } from "@cpt_skyfish_/carve-common";

const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL : string
        JWT_SECRET : string
        saltRounds : string
    }
}>();

const getPrisma = (database_url: string) => {
  const prisma = new PrismaClient({
    datasourceUrl: database_url,
  }).$extends(withAccelerate())
  return prisma
}


// SignUp route
userRouter.post('/signup', async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL)

  try {
      const body = await c.req.json();
      
      const { success, error } = signUpInput.safeParse(body);
      if (!success) {
          c.status(411);
          return c.json({ errorMessage: "Invalid email or password!", zodError: error });
      }

      try {
          const existingUser = await prisma.user.findUnique({
              where: { email: body.email },
          });
          if (existingUser) {
              return c.json({
                  message: "User Already Exists. Try Signing in",
              });
          }
      } catch (error) {
          console.error("Error checking for existing user:", error);
          c.status(500);
          return c.json({ errorMessage: "Failed to check for existing user." });
      }

      let hashedPassword: string;
      try {
          hashedPassword = await bcrypt.hash(body.password, parseInt(c.env.saltRounds));
      } catch (error) {
          console.error("Error hashing password:", error);
          c.status(500);
          return c.json({ errorMessage: "Failed to hash password." });
      }

      let user;
      try {
          user = await prisma.user.create({
              data: {
                  name: body.username,
                  email: body.email,
                  password: hashedPassword,
              },
          });
      } catch (error) {
          console.error("Error creating user:", error);
          c.status(500);
          return c.json({ errorMessage: "Failed to create user in the database." });
      }

      let token: string;
      try {
          token = await sign({ id: user.id }, c.env.JWT_SECRET);
          
      } catch (error) {
          console.error("Error generating token:", error);
          c.status(500);
          return c.json({ errorMessage: "Failed to generate token." });
      }

      c.status(200);
      console.log(token)
      return c.json({ token });
  } catch (error) {
      console.error("Unexpected error:", error);
      c.status(500);
      return c.json({ errorMessage: "An unexpected error occurred." });
  }
});

  
  //SignIn route
  userRouter.post('/signin', async (c) => {
    const prisma = getPrisma(c.env.DATABASE_URL)

  
    const body = await c.req.json()
    const {success} = signInInput.safeParse(body)
    if(!success){
      c.status(411)
      return c.json({errorMessage: "Email and Password are Required!"})
    }
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      }
    })
    if ( user && await bcrypt.compare(body.password, user.password)){
      const token = await sign({id: user.id}, c.env.JWT_SECRET)
      c.status(200)
      return c.json({token, username: user.name})
    }
  
    c.status(403)
    return c.json({ errorMessage: "Invalid credentials" })
  })

  export default userRouter