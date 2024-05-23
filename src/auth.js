import { SvelteKitAuth } from "@auth/sveltekit"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client" 

import Resend from "@auth/sveltekit/providers/resend"
import github from "@auth/sveltekit/providers/github"
import kakao from "@auth/sveltekit/providers/kakao"
import facebook from "@auth/sveltekit/providers/facebook"

const prisma = new PrismaClient()

const providers =  [
  Resend({
    from: "admin@diving.run",
  }),
  github,
  kakao,
  facebook
]
export const { handle, signIn, signOut } = SvelteKitAuth({
  adapter: PrismaAdapter(prisma),
  providers,
  trustHost: true,
  theme: {
    logo: "./logo.png"
  }
})