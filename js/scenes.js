function initScenes(){
    const scenes = document.querySelectorAll(".scene");
    const dotsContainer = document.getElementById("dots");
    const counter = document.getElementById("counter");

    let currentScene = 0;
    let locked = false;
    let startY = 0;

    scenes.forEach((scene,index)=>{
        const dot = document.createElement("div");
        dot.classList.add("dot");

        if(index === 0){
            dot.classList.add("active");
        }

        dot.addEventListener("click",()=>{
            currentScene = index;
            updateScene();
        });

        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".dot");

    function updateScene(){
        scenes.forEach((scene,index)=>{
            scene.classList.toggle("active", index === currentScene);
        });

        dots.forEach((dot,index)=>{
            dot.classList.toggle("active", index === currentScene);
        });

        counter.textContent =
            String(currentScene + 1).padStart(2,"0") +
            " / " +
            String(scenes.length).padStart(2,"0");
    }

    function nextScene(){
        if(currentScene < scenes.length - 1){
            currentScene++;
            updateScene();
        }
    }

    function prevScene(){
        if(currentScene > 0){
            currentScene--;
            updateScene();
        }
    }

    window.addEventListener("wheel",(e)=>{
        if(locked) return;

        locked = true;

        if(e.deltaY > 0){
            nextScene();
        }else{
            prevScene();
        }

        setTimeout(()=>{
            locked = false;
        },800);
    }, { passive:true });

    window.addEventListener("keydown",(e)=>{
        if(e.key === "ArrowDown" || e.key === "PageDown"){
            nextScene();
        }

        if(e.key === "ArrowUp" || e.key === "PageUp"){
            prevScene();
        }
    });

    window.addEventListener("touchstart",(e)=>{
        startY = e.touches[0].clientY;
    }, { passive:true });

    window.addEventListener("touchend",(e)=>{
        const endY = e.changedTouches[0].clientY;
        const diff = startY - endY;

        if(Math.abs(diff) < 50) return;

        if(diff > 0){
            nextScene();
        }else{
            prevScene();
        }
    }, { passive:true });

    return {
        nextScene,
        prevScene,
        updateScene
    };
}
