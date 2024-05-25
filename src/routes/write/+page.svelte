<script>
    import { enhance } from "$app/forms";
    import { onMount } from "svelte";
    import Modal from "../../component/Modal.svelte";
    import { page } from "$app/stores";
    import { writable } from "svelte/store";

    let titleCount = 0;
    let contentCount = 0;
    let button_active = false;
    let category_value = "contact_us";

    let modal_active = writable(false);
    let modalTitle = "";
    let modalContent = "";
    let modalButton = 0;
    let drafts = [];
    let drafts_modal_content = 0;
    let dream = false;

    /** @type {import('./$types').ActionData} */
    export let data;
	// export let form;

    function countCharacters(e) {
        let input = e.currentTarget;
        if(input.placeholder === "제목") {
            titleCount = input.value.length;
        } else {
            contentCount = input.value.length;
            input.style.height = "auto";
            input.style.height = input.scrollHeight + "px";
        }
        titleCount && contentCount ? button_active = true : button_active = false;
    }

    function clearForm(e) {
        e.category.value = "contact_us";
        e.title.value = null;
        e.content.value = null;
        e.secret.checked = false;
        contentCount = 0;
        titleCount = 0;
        button_active = false;
    }

    function handleDraftsBtn() {
        modalTitle = "임시보관함";
        modalContent = drafts_modal_content.outerHTML;
        modalButton = {"1": "펜모양", "2": "쓰래기모양"}
        modal_active.set(true)
    }

    function getHoursAgo(date) {
        let givenDate = new Date(date);
        let currentDate = new Date();
        let timeDiff = currentDate - givenDate;
        let hourDiff = Math.floor(timeDiff / (1000 * 60 * 60));
        return hourDiff;
    }

    onMount(() => {
        if(data.drafts.length !== 0) {
            drafts = [...data.drafts]
        }
    })
</script>

<!-- <div bind:this={drafts_modal_content}>
    {#each drafts as draft}
    <a href={`?draft=${draft.id}`}>
        <div class="flex justify-between items-center rounded hover:bg-gray-100">
            <div class="p-2">
                <p class="text-sm"><span class="font-bold">{#if $page.url.searchParams.get('draft') == draft.id}수정중 {/if}</span> · {draft.title}</p>
                <p class="text-xs text-sky-800"><span class="font-bold">· {getHoursAgo(draft.date)}시간 전</span> 수정</p>
            </div>
            <div>
                <button class="p-2 hover:bg-blue-200 rounded-full"><i class="fa-solid fa-pen"></i></button>
                <button class="p-2 hover:bg-blue-200 rounded-full"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        </div>
    </a>
    {/each}
</div> -->

{#if $modal_active}
    <Modal {modal_active} {modalTitle} {modalContent} {modalButton} />
{/if}
<section class="p-4">
<div class="flex justify-between">
    <h1 class="text-2xl font-bold my-6">게시물 작성</h1>
    {#if drafts.length !== 0}
    <div>
        <button class="
            relative flex justify-center items-center
            px-4 py-2 rounded-full pr-10
            hover:bg-gray-200
            focus: ease-linear transition-all duration-150"
            on:click={handleDraftsBtn}
        >
            <div class="text-sm font-semibold">
                임시보관함
            </div>
            <span class="absolute right-4 px-1.5 py-0.5 text-xs leading-none bg-white rounded-full">
                {drafts.length}
            </span>
        </button> 
    </div>
    {/if}
</div>

<form method="post" use:enhance={(e) => {
    if (e.submitter.innerText === "임시 보관함에 저장") {
        e.formData.set("isActive", false)
    }

    if (e.submitter.innerText === "+이미지추가") {
        e.cancel()
    }

    if (e.submitter.innerText === "전송") {
        clearForm(e.formElement)
    }
}}>

<div class="flex justify-between">
    <select class="h-10 py-2 px-6 font-bold border rounded" name="category" bind:value={category_value}>
        <option value="contact_us">
            문의하기
        </option>
        <option value="review">
            리뷰남기기
        </option>
    </select>
    <button class="pointer-events-none bg-gray-200 text-gray-400
        text-sm font-semibold px-4 py-2 rounded-full"
    >
        +이미지추가
    </button>
</div>

<div class="relative mt-4">
        <input class="border py-4 px-6 rounded-2xl w-full" placeholder="제목" type="text" name="title" on:keyup={countCharacters}>
        <div class="absolute px-4 py-2 right-0 text-xs">
            {titleCount} / 300
        </div>
        <textarea class="border mt-10 py-4 px-6 rounded-2xl w-full resize-none overflow-y-hidden" name="content" placeholder="내용" on:keyup={countCharacters}></textarea>
        <div class="flex justify-between items-center px-4 py-2 right-0 text-xs">
            <div>
                <div class="duration-150 opacity-0 pointer-events-none" class:secretbox_active={category_value == "contact_us"}>
                    <input type="checkbox" name="isSecret" id="secret">
                    <label for="secret">비밀글</label>
                </div>
            </div>
            <div>
                {contentCount} / 1000
            </div>
        </div>
        <div class="flex justify-end space-x-4">
            <button class="
                pointer-events-none
                bg-gray-200 text-gray-400
                hover:bg-blue-600 hover:text-white active:bg-gray-600
                text-sm font-semibold px-4 py-2 rounded-full
                focus: ease-linear transition-all duration-150"
                class:button_active
            >
                임시 보관함에 저장
            </button>
            <button class="
                pointer-events-none
                bg-gray-200 text-gray-400
                hover:bg-blue-600 hover:text-white active:bg-gray-600
                text-sm font-semibold px-4 py-2 rounded-full
                focus: ease-linear transition-all duration-150"
                class:button_active
            >
                전송
            </button>
        </div>
    </div>
</form>
</section>

<style>
    .secretbox_active {
        opacity: 1;
        pointer-events: all;
    }
    .button_active {
        color: white;
        background-color: rgb(10, 68, 155);
        pointer-events: all;
    }
</style>