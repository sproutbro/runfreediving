<script>
    import { page } from '$app/stores';
    import { writable } from 'svelte/store';
    import Modal from '../../component/Modal.svelte';

    export let data;
    let modalTitle = 0;
    let modal_active = writable(false);

    function handleLink(e) {
        
        const auth_email = e.currentTarget.dataset['email'];
        let session = $page.data.session;
        let email = "@@@"
        const isSecret = e.currentTarget.dataset['issecret'];
        if(session) {
            email = session.user.authorEmail
        }

        console.log("isSecret", isSecret)
        console.log("email", email)
        console.log("auth_email", auth_email)

        if(isSecret == "true") {
           if(auth_email !== email) {
                e.preventDefault()
                console.log(1)
                modalTitle = "접근 권한 없음";
                modal_active.set(true)
           }
        } 
    }
</script>
{#if $modal_active}
<Modal {modalTitle} {modal_active}/>
{/if}
<div class="p-4 my-2 bg-gray-100  shadow">
    <p class="text-xl font-bold">문의하기</p>
    <span class="text-sm">무엇이든 물어보세요.</span>
</div>

<div class="mt-4 mb-1 p-4 bg-gray-100 shadow">
    <div class="flex justify-between">
        <a href="/write">
            <button class="
                border bg-transparent border-solid border-gray-400
                hover:bg-gray-400 hover:text-white active:bg-gray-600
                font-semibold px-4 py-2 rounded-full
                focus: ease-linear transition-all duration-150"
            >
                + 게시글 작성
            </button>
        </a>
        <div>
            <select class="shadow rounded" name="languages" id="lang">
                <option value="javascript">날자순</option>
                <option value="php">인기순</option>
            </select>
        </div>
    </div>
    <div class="mt-4 flex justify-between text-xs">
        <div>
            <i class="fa fa-angle-double-left"></i>
            이전
        </div>
        <div>
                페이지 1/99
        </div>
        <div>
            <div>
                다음
                <i class="fa fa-angle-double-right"></i>
            </div>
        </div>
    </div>
</div>

{#each data.posts as { id, title, userName, viewCount, isSecret, year, month, day, authorEmail}}
<div class="p-4 bg-gray-100 shadow-3">
    <div class="flex justify-between">
        <div>
            <div class="flex items-center space-x-2 mb-2">
                {#if isSecret}
                <i class="fa-solid fa-key"></i>
                {/if}
                <a class="text-xl" href="/board/detail/{id}" 
                    data-email={authorEmail} 
                    data-isSecret={isSecret}
                    on:click={handleLink}
                >
                    { title }
                </a>
            </div>
            <div class="text-xs text-gray-400">
                <p>작성자: {userName} , {year}년 {month}월 {day}일</p>
                <p>답글 12개 조회수 {viewCount}회</p>
            </div>
        </div>
        
        <!-- 임시 -->
        <div>
        </div>
    </div>
</div>
{/each}