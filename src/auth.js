import { SvelteKitAuth } from "@auth/sveltekit"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client" 

import Resend from "@auth/sveltekit/providers/resend"
import github from "@auth/sveltekit/providers/github"
import kakao from "@auth/sveltekit/providers/kakao"

const prisma = new PrismaClient()

const providers =  [
  Resend({
    from: "admin@diving.run",
  }),
  github,
  kakao
]
export const { handle, signIn, signOut } = SvelteKitAuth({
  adapter: PrismaAdapter(prisma),
  providers,
  theme: {
    logo: "./logo.png"
  }
})