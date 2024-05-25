import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

/** @type {import('./$types').PageServerLoad} */
export async function load({ url}) {	
	const currentPage = parseInt(url.searchParams.get('page')) || 1;
	const search = url.searchParams.get('search') || '';
	const pageSize = 20;
	const offset = (currentPage -1) * pageSize;

	try {
		let posts = await prisma.secretPost.findMany({
			where: {
				OR: [
					{title: {contains: search, mode: 'insensitive'}},
					{content: {contains: search, mode: 'insensitive'}}
				]
			},
			skip: offset,
			take: pageSize,
			orderBy: { createdAt: 'desc' }
		});
		
		posts =  modifiedPosts(posts)
		return { posts }
	} catch (error) {
		throw error;
	} finally {
		await prisma.$disconnect();
	}
}

function modifiedPosts(posts) {
	return posts.map(post => {
		const year = post.createdAt.getFullYear();
		const month = post.createdAt.getMonth() + 1; // 월은 0부터 시작하므로 +1 해줍니다.
		const day = post.createdAt.getDate();
		return { ...post, year, month, day };
	})
}