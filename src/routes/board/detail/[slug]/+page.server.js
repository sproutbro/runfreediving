import { PrismaClient } from '@prisma/client'
import { redirect } from '@sveltejs/kit';

const prisma = new PrismaClient();

/** @type {import('./$types').PageServerLoad} */
export async function load({params, locals}) {	
	const {slug} = params;
	const postId = parseInt(slug);
	const auth = await locals.auth();
	let email = "@@@";
	if(auth) email = auth.user.email;


	try {
		let post = await prisma.secretPost.findUnique({
			where: {
				id: postId,
			},
		});

		if(post.isSecret) {
			if(post.authorEmail == email) {
				return {post};
			} else {
				post = {"title": "권한없음", "content": "권한없음"}
				return {post};
			}
		} else {
			return {post};
		}
	} catch (error) {
		throw error;
	} finally {
		await prisma.$disconnect();
	}
}

// function modifiedPosts(posts) {
// 	return posts.map(post => {
// 		const year = post.createdAt.getFullYear();
// 		const month = post.createdAt.getMonth() + 1; // 월은 0부터 시작하므로 +1 해줍니다.
// 		const day = post.createdAt.getDate();
// 		return { ...post, year, month, day };
// 	})
// }