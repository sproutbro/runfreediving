import { PrismaClient } from '@prisma/client';
import { redirect } from '@sveltejs/kit';

const prisma = new PrismaClient();

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
    const auth = await event.locals.auth();
    if(!auth) {
        throw redirect(303, '/auth/signin');
    }

    try {
        let drafts = await prisma.secretPost.findMany({
            where: {
                OR: [
                    {authorEmail: {contains: auth.user.email, mode: 'insensitive'}},
                ],
                isActive: false
            },
            orderBy: { createdAt: 'desc' }
        });
        return { drafts : modifiedPosts(drafts) }
    } catch (error) {
        throw error
    } finally {
        await prisma.$disconnect();
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ cookies, request, locals }) => {
        let data = {};

        const formData = await request.formData();
        formData.forEach((v, k) => {
            data[k] = v;
        })
        
        const auth = await locals.auth();

        delete data.category;
        data.userName = auth.user.name;
        data.authorEmail =  auth.user.email;
        data.isSecret = !!data.isSecret;
        data.isActive = !data.isActive;

        try {
            const newPost = await prisma.secretPost.create({data})
            return { newPost }
        } catch (error) {
            throw error
        } finally {
            await prisma.$disconnect();
        }
    }
};

function modifiedPosts(posts) {
	return posts.map(post => {
        const year = post.createdAt.getFullYear();
		const month = post.createdAt.getMonth() + 1; // 월은 0부터 시작하므로 +1 해줍니다.
		const day = post.createdAt.getDate();
		return { ...post, year, month, day };
	})
}