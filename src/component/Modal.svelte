<script>
    import { writable } from "svelte/store";

    
    export let modal_active = writable(false);
    export let modalTitle;
    export let modalContent;
    export let modalButton;
</script>

{#if modal_active}
<!-- <div class="relative z-10">
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
  <div class="fixed inset-0 z-10 overflow-y-auto">
    <div class="absolute flex h-full w-full items-center justify-center p-4 text-center">
      <div class="w-full h-full overflow-hidden rounded-lg bg-white text-left">
        <div class="w-full bg-white px-4 pb-4 pt-5">
            <div>
              <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">
                {modalTitle}
              </h3>
            </div>
            <div class="mt-2">
                {@html modalContent}
            </div>
          </div>
        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button type="button" class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" on:click={modal_active.set(false)}>Cancel</button>
          <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" on:click={modal_active.set(false)}>Cancel</button>
        </div>
      </div>
    </div>
  </div>
</div> -->
<div class="relative z-10">
  <div class="fixed inset-0 bg-gray-500 opacity-75"></div>
  <div class="fixed flex items-center justify-center inset-0">
    <div class="flex flex-col
      max-w-lg w-4/5 max-h-4/5
      bg-white rounded-lg p-5 space-y-4">
        <h3 class="text-xl font-semibold text-gray-900">
          {modalTitle}
        </h3>
        <div>
          {@html modalContent}
        </div>
        <div class="flex flex-row-reverse">
          <button type="button" class="mt-3 inline-flex w-2/5 justify-center rounded-md px-3 py-2 text-sm font-semibold bg-red-600 text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-500" on:click={modal_active.set(false)}>Cancel</button>
        </div>
    </div>
  </div>
</div>
{/if}