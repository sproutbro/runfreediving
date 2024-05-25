<script>
    export let isActive = false;

    export function toggleMenu() {
        isActive = !isActive;
    }
</script>

    
<button class="hamburger" class:active={isActive} on:click={toggleMenu}>
    <div class="bar top"></div>
    <div class="bar middle"></div>
    <div class="bar bottom"></div>
</button>

<style>
    /* 햄버거 아이콘 스타일 */
    .hamburger {
      width: 30px;
      height: 20px;
      cursor: pointer;
      position: relative;
    }
  
    .bar {
      width: 100%;
      height: 2px;
      background-color: #fff;
      position: absolute;
      transition: transform 0.3s, opacity 0.3s;
    }
  
    .bar.middle {
      top: 50%;
      transform: translateY(-50%);
    }
  
    .bar.top {
      top: 0;
    }
  
    .bar.bottom {
      bottom: 0;
    }
  
    /* 햄버거 아이콘 애니메이션 */
    .active .bar.middle {
      transform: translateY(-50%) rotate(45deg);
    }
  
    .active .bar.top {
      transform: translateY(6px) rotate(-45deg);
    }
  
    .active .bar.bottom {
      transform: translateY(-6px) rotate(-45deg);
    }
</style>