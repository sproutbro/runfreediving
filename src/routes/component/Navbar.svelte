<script>
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import HamburgerIcon from "./HamburgerIcon.svelte";
    import { signOut, signIn } from "@auth/sveltekit/client";

    let overay_active = false;
    let nav_active = false;
    let dropdown_active = false;
    $: scrollY = 0;
    let scrollY_copy = 0;
    let submenu_active = -1;

    let menu = [
        { path: "#intro", name: "회사소개" },
        { path: "#course", name: "코스안내" },
        { path: "#fun", name: "펀다이빙" },
        { path: "#schedule", name: "일정" },
        { path: "#gallery", name: "갤러리" },
        { path: "/board", name: "게시판" },
    ];

    function toggleMenu() {
        scrollY_copy = scrollY;
        overay_active = !overay_active;
        dropdown_active = !dropdown_active;
        submenu_active = -1;
    }

    function toggleNav() {
        nav_active = !nav_active;
    }

    function scroll() {
        scrollY <= scrollY_copy ? (nav_active = true) : (nav_active = false);
        scrollY_copy = scrollY;
    }

    function toggleMenuDetail(i) {
        if (submenu_active === i) {
            submenu_active = -1;
        } else {
            submenu_active = i;
        }
    }

    onMount(() => {
        toggleNav();
    });
</script>

<svelte:window bind:scrollY on:scroll={scroll} />

<div class="relative">
    <div class="fixed w-full min-h-fit duration-1000 z-10 nav" class:nav_active>
        <div
            class="flex justify-between mx-auto max-w-screen-lg text-white p-4"
        >
            <a href="/">
                <div class="text-3xl font-bold">
                    DIVING<span class="text-indigo-400">.RUN</span>
                </div>
            </a>
            <button class="h-icon" on:click={toggleMenu}
                ><HamburgerIcon isActive={dropdown_active} /></button
            >
        </div>
    </div>
    <div class="h-[68px]"></div>
    <!-- menu -->
    <div
        class="fixed top-0 flex flex-col w-5/6 max-w-sm h-screen py-6 px-6 left-[-100vw] bg-gray-600 duration-1000 z-10"
        class:dropdown_active
    >
        <div class="flex items-center mb-8">
            <a href="/" class="text-3xl font-bold mr-auto">
                <div class="text-3xl font-bold text-white">
                    DIVING<span class="text-indigo-400">.RUN</span>
                </div>
            </a>
            <button on:click={toggleMenu}>
                <svg
                    class="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                    ></path>
                </svg>
            </button>
        </div>
        <div>
            <ul>
                {#each menu as item, i}
                    <li class="mb-1">
                        <a
                            href={item.path}
                            class={$page.url.hash === item.path
                                ? "block p-4 text-sm font-semibold bg-blue-50 text-blue-600 rounded"
                                : "block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"}
                            on:click={() => toggleMenuDetail(i)}
                        >
                            {item.name}
                        </a>
                        <div
                            class="hidden"
                            class:submenu_active={submenu_active == i}
                        >
                            <ul>
                                <li>ddd</li>
                                <li>ddd</li>
                                <li>ddd</li>
                                <li>ddd</li>
                            </ul>
                        </div>
                    </li>
                {/each}
            </ul>
        </div>
        <div class="mt-auto">
            <div class="pt-6">
                <div>
                    {#if $page.data.session}
                        <button
                            class="block w-full px-4 py-3 mb-3 text-xs text-center font-semibold bg-gray-50 hover:bg-gray-200 rounded-xl"
                        >
                            My profile
                        </button>
                        <button
                            class="block w-full px-4 py-3 mb-3 text-xs text-center text-white font-semibold bg-blue-500 hover:bg-blue-700 rounded-xl"
                            on:click={() => signOut()}
                        >
                            Sign Out
                        </button>
                    {:else}
                        <button
                            class="block w-full px-4 py-3 mb-3 text-xs text-center font-semibold bg-gray-50 hover:bg-gray-100 rounded-xl"
                            on:click={signIn}
                        >
                            Sign in
                        </button>
                        <button
                            class="block w-full px-4 py-3 mb-3 text-xs text-center text-white font-semibold bg-blue-500 hover:bg-blue-700 rounded-xl"
                        >
                            Sign up
                        </button>
                    {/if}
                </div>
            </div>
            <p class="my-4 text-xs text-center text-gray-400">
                <span>Designed by </span>
            </p>
        </div>
    </div>
    <div
        class="fixed top-0 h-full w-full duration-1000 pointer-events-none"
        class:overay_active
    ></div>
</div>

<!-- <div class="h-[25px]"></div> -->
<style>
    .submenu_active {
        display: block;
    }
    .dropdown_active {
        left: 0;
    }
    .overay_active {
        background-color: black;
        opacity: 0.5;
        pointer-events: auto;
    }
    .nav {
        top: -68px;
    }
    .nav_active {
        background-color: rgba(0, 0, 0, 1);
        top: 0px;
    }
</style>
