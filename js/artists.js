function initArtists(){
    const artistCards = document.querySelectorAll(".artist-card");
    const artistVideo = document.getElementById("artistVideo");
    const artistFrame = document.getElementById("artistFrame");
    const artistGrid = document.getElementById("artistGrid");
    const prevArtist = document.getElementById("prevArtist");
    const nextArtist = document.getElementById("nextArtist");

    const artistSceneTitle = document.getElementById("artistSceneTitle");
    const artistSceneSubtitle = document.getElementById("artistSceneSubtitle");

    const artistDetail = document.getElementById("artistDetail");
    const artistBioText = document.getElementById("artistBioText");
    const artistMusicList = document.getElementById("artistMusicList");
    const artistSocialList = document.getElementById("artistSocialList");

    const artistBioPanel = document.getElementById("artistBioPanel");
    const artistMusicPanel = document.getElementById("artistMusicPanel");
    const artistSocialPanel = document.getElementById("artistSocialPanel");

    const showBio = document.getElementById("showBio");
    const showMusic = document.getElementById("showMusic");
    const showSocial = document.getElementById("showSocial");
    const backArtist = document.getElementById("backArtist");

    const artistData = {
        adach:{
            name:"Adach",
            subtitle:".Artist / Jazzito Records",
            bio:"Adach to członek Jazzito Records. Brzmienie oparte na emocji, ciemnym klimacie, rapowym nerwie i alternatywnym podejściu do formy.",
            music:[
                { label:"Epiphyllum Oxypetalum EP 2026", url:"#" },
                { label:"Xanthoderme Agenensis EP 2021", url:"#" },
                { label:"Błendy — YouTube", url:"https://youtu.be/Mcd3g4rOoq0" }
            ],
            social:[
                { label:"YouTube", url:"#" },
                { label:"Spotify", url:"#" },
                { label:"Instagram", url:"#" }
            ]
        },
        youngTommy:{
            name:"Young Tommy",
            subtitle:".Artist / Jazzito Records",
            bio:"Young Tommy reprezentuje bardziej melodyjny kierunek rosteru. Miejsce na docelowy opis, press note i charakterystykę brzmienia.",
            music:[
                { label:"Latest release", url:"#" },
                { label:"Singles", url:"#" }
            ],
            social:[
                { label:"YouTube", url:"#" },
                { label:"Instagram", url:"#" }
            ]
        },
        pwk:{
            name:"PWK",
            subtitle:".Artist / Jazzito Records",
            bio:"PWK — surowa energia, ciemna estetyka i bezpośredni przekaz. Opis można podmienić na finalne bio artysty.",
            music:[
                { label:"Tracks", url:"#" },
                { label:"Videos", url:"#" }
            ],
            social:[
                { label:"YouTube", url:"#" },
                { label:"Instagram", url:"#" }
            ]
        },
        heavyJimmy:{
            name:"Heavy Jimmy",
            subtitle:".Artist / Jazzito Records",
            bio:"Heavy Jimmy wnosi cięższy, koncertowy charakter. Tutaj docelowo trafi opis artysty i jego najważniejszych projektów.",
            music:[
                { label:"Music", url:"#" },
                { label:"Live sessions", url:"#" }
            ],
            social:[
                { label:"YouTube", url:"#" },
                { label:"Instagram", url:"#" }
            ]
        },
        l3wy:{
            name:"L3WY",
            subtitle:".Artist / Jazzito Records",
            bio:"L3WY — minimalistyczna forma, mocny klimat i miejsce na dalsze rozwinięcie narracji artysty.",
            music:[
                { label:"Catalog", url:"#" },
                { label:"New music", url:"#" }
            ],
            social:[
                { label:"YouTube", url:"#" },
                { label:"Instagram", url:"#" }
            ]
        },
        greenRob:{
            name:"Green Rob",
            subtitle:".Artist / Jazzito Records",
            bio:"Green Rob — kontrast, groove i własna paleta brzmień. Placeholder do podmiany na finalny opis.",
            music:[
                { label:"Releases", url:"#" },
                { label:"Videos", url:"#" }
            ],
            social:[
                { label:"YouTube", url:"#" },
                { label:"Instagram", url:"#" }
            ]
        },
        prettyRooster:{
            name:"Pretty Rooster",
            subtitle:".Artist / Jazzito Records",
            bio:"Pretty Rooster — ekspresyjna postać rosteru. Tutaj można dodać bio, opis stylu i linki do premier.",
            music:[
                { label:"Music", url:"#" },
                { label:"Clips", url:"#" }
            ],
            social:[
                { label:"YouTube", url:"#" },
                { label:"Instagram", url:"#" }
            ]
        },
        badHardie:{
            name:"Bad Hardie",
            subtitle:".Artist / Jazzito Records",
            bio:"Bad Hardie — mocny charakter, brudniejsza estetyka i miejsce na finalny opis artysty.",
            music:[
                { label:"Tracks", url:"#" },
                { label:"Projects", url:"#" }
            ],
            social:[
                { label:"YouTube", url:"#" },
                { label:"Instagram", url:"#" }
            ]
        }
    };

    let activeArtistIndex = 0;
    let detailMode = false;

    function playArtistVideo(videoSrc){
        if(!artistVideo || !videoSrc) return;

        if(!artistVideo.src.includes(videoSrc)){
            artistVideo.src = videoSrc;
            artistVideo.load();

            artistVideo.onloadedmetadata = ()=>{
                artistVideo.currentTime = 0;
                artistVideo.play().catch(()=>{
                    console.log("autoplay blocked");
                });
            };
        }else{
            artistVideo.currentTime = 0;
            artistVideo.play().catch(()=>{});
        }

        artistVideo.classList.add("active");
    }

    function setActiveArtist(index){
        if(!artistCards.length) return;

        if(index < 0) index = artistCards.length - 1;
        if(index >= artistCards.length) index = 0;

        activeArtistIndex = index;

        artistCards.forEach(card=>{
            card.classList.remove("active");
        });

        const activeCard = artistCards[activeArtistIndex];
        activeCard.classList.add("active");

        playArtistVideo(activeCard.dataset.video);

        activeCard.scrollIntoView({
            behavior:"smooth",
            inline:"center",
            block:"nearest"
        });
    }

    function renderList(container,items){
        if(!container) return;

        container.innerHTML = "";

        items.forEach(item=>{
            const li = document.createElement("li");
            const a = document.createElement("a");

            a.textContent = item.label;
            a.href = item.url;
            a.target = item.url === "#" ? "_self" : "_blank";
            a.rel = "noopener noreferrer";

            li.appendChild(a);
            container.appendChild(li);
        });
    }

    function setDetailTab(tabName){
        const panels = [artistBioPanel, artistMusicPanel, artistSocialPanel];
        const buttons = [showBio, showMusic, showSocial];

        panels.forEach(panel=>{
            if(panel) panel.classList.remove("active");
        });

        buttons.forEach(button=>{
            if(button) button.classList.remove("active");
        });

        if(tabName === "bio"){
            artistBioPanel?.classList.add("active");
            showBio?.classList.add("active");
        }

        if(tabName === "music"){
            artistMusicPanel?.classList.add("active");
            showMusic?.classList.add("active");
        }

        if(tabName === "social"){
            artistSocialPanel?.classList.add("active");
            showSocial?.classList.add("active");
        }
    }

    function openArtistDetail(index){
        setActiveArtist(index);

        const activeCard = artistCards[activeArtistIndex];
        const artistKey = activeCard.dataset.artist;
        const data = artistData[artistKey];

        if(!data || !artistFrame || !artistDetail) return;

        detailMode = true;
        artistFrame.classList.add("artist-detail-mode");

        if(artistSceneTitle) artistSceneTitle.textContent = data.name;
        if(artistSceneSubtitle) artistSceneSubtitle.textContent = data.subtitle;
        if(artistBioText) artistBioText.textContent = data.bio;

        renderList(artistMusicList, data.music);
        renderList(artistSocialList, data.social);
        setDetailTab("bio");

        artistCards.forEach((card,cardIndex)=>{
            card.classList.toggle("selected", cardIndex === activeArtistIndex);
            card.classList.toggle("hidden", cardIndex !== activeArtistIndex);
        });
    }

    function closeArtistDetail(){
        detailMode = false;

        if(artistFrame) artistFrame.classList.remove("artist-detail-mode");
        if(artistSceneTitle) artistSceneTitle.textContent = "Jazzito";
        if(artistSceneSubtitle) artistSceneSubtitle.textContent = ".Artists / Creators";

        artistCards.forEach(card=>{
            card.classList.remove("hidden", "selected");
        });

        if(artistGrid){
            artistGrid.scrollTo({
                left:0,
                behavior:"smooth"
            });
        }
    }

    artistCards.forEach((card,index)=>{
        card.addEventListener("mouseenter",()=>{
            if(window.innerWidth > 768 && !detailMode){
                setActiveArtist(index);
            }
        });

        card.addEventListener("click",()=>{
            openArtistDetail(index);
        });
    });

    if(prevArtist){
        prevArtist.addEventListener("click",()=>{
            if(detailMode) return;
            setActiveArtist(activeArtistIndex - 1);
        });
    }

    if(nextArtist){
        nextArtist.addEventListener("click",()=>{
            if(detailMode) return;
            setActiveArtist(activeArtistIndex + 1);
        });
    }

    if(showBio){
        showBio.addEventListener("click",()=>setDetailTab("bio"));
    }

    if(showMusic){
        showMusic.addEventListener("click",()=>setDetailTab("music"));
    }

    if(showSocial){
        showSocial.addEventListener("click",()=>setDetailTab("social"));
    }

    if(backArtist){
        backArtist.addEventListener("click",closeArtistDetail);
    }

    if(artistFrame){
        artistFrame.addEventListener("mouseleave",()=>{
            if(window.innerWidth > 768 && !detailMode){
                artistCards.forEach(card=>{
                    card.classList.remove("active");
                });
            }
        });
    }

    if(artistVideo){
        artistVideo.addEventListener("ended",()=>{
            artistVideo.pause();

            if(Number.isFinite(artistVideo.duration)){
                artistVideo.currentTime = Math.max(0, artistVideo.duration - 0.05);
            }
        });
    }

    return {
        setActiveArtist,
        openArtistDetail,
        closeArtistDetail
    };
}
