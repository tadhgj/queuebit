console.log("queuebit on")


// logic:
// watch for queue page to be open
// queue page active, fully loaded:
//     check if queuebit control center exists
//         if exists, do nothing
//         if not exists, add queuebit control center
//     start update interval
//     update interval:
//         read songs in queue
//         read now playing
//         read next up
//         read queue
//         update queuebit control center
// queue page inactive:
//     stop update interval
//     watch for queuepage to open



// div.HcMOFLaukKJdK5LfdHh0 holds queue, favorite button div with classes Type__TypeElement-sc-goli3j-0 bDHxRN Btg2qHSuepFGBG6X0yEN

$(document).ready(function() {
    // watch for queue page to come
    console.log("queuebit ready")

    var queuePageObserver;
    function watchForQueuePage() {
        console.log("watchForQueuePage")
        queuePageObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                // console.log("queue page observer")
                // console.log(mutation)

                // ignore blanks
                if (mutation.addedNodes.length === 0) {
                    // check if closed...
                    if (!checkIfQueuePageOpen()) {
                        console.log("queue page closed")
                    }
                    return;
                }

                mutation.addedNodes.forEach(function(addedNode) {
                    // 
                    if (addedNode.nodeName === 'DIV' && addedNode.className === 'ReactModalPortal') {
                        // console.log("change in ReactModalPortal")
                        if (checkIfQueuePageOpen()) {
                            // check if section exists...
                            if (checkIfSectionExists()) {
                                // console.log("section already exists")
                                checkIfQueueOpen();
                            }
                            else {
                                // watch for section to be added
                                watchForQueuePageReady();
                            }
                        }
                    }
                });
            });
        });

        // start observer
        queuePageObserver.observe(document.body, { childList: true });
    }


    function checkIfSectionExists() {
        var queueSectionTarget = document.querySelector('section');
        if (queueSectionTarget != null) {
            return true;
        }
        return false;
    }

    watchForQueuePage()


    // var allObserveConfig = { attributes: true, childList: true, characterData: true };
    // var queuePageReadyObserver;
    function watchForQueuePageReady() {
        console.log("watchForQueuePageReady")

        if (checkIfQueuePageReady()) {
            console.log("ready instant")
            checkIfQueueOpen()
            return;
        }
        else {
            console.log("not ready instant")
        }
    }

    function checkIfQueuePageOpen() {
        // returns true/false
        // just check url...
        var url = window.location.href;
        if (url == "https://open.spotify.com/queue") {

            return true;
        }
        return false;
    }

    function checkIfQueuePageReady() {
        console.log("checkIfQueuePageReady")


        // return if no section
        var queueSectionTarget = document.querySelector('section');
        if (queueSectionTarget == null) {
            return false;
        }

        // here's an unready queue:
        // <section class="contentSpacing"><div class="gTvMl6pwfRD9PobMSB5x"><svg role="img" height="64" width="64" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" class="Svg-sc-ytk21e-0 haNxPq"><path d="M21 22H3v-2h18v2zm0-6H3v-2h18v2zM2.05 6.546a3.5 3.5 0 0 1 3.5-3.5h13a3.5 3.5 0 0 1 0 7h-13a3.5 3.5 0 0 1-3.5-3.5zm3.5-1.5a1.5 1.5 0 0 0 0 3h13a1.5 1.5 0 0 0 0-3h-13z"></path></svg><h1 class="Type__TypeElement-sc-goli3j-0 fAJsTt hNAQG0TAe2WFYyf_iZEB" data-encore-id="type">Add to your queue</h1><p>Tap "Add to queue" from a track's menu to see it here</p><a draggable="false" class="Zhzrb2k9nQRActS2lp4U" href="/search"><button data-encore-id="buttonPrimary" class="Button-sc-qlcn5g-0 KQWHP"><span class="ButtonInner-sc-14ud5tc-0 bABUvF encore-inverted-light-set">Find something to play</span></button></a></div></section>

                

        // list of all h2's inside section
        var queuePageHeader = document.querySelectorAll('section h2');
        // console.log(queuePageHeader)



        for (let i = 0; i < queuePageHeader.length; i++) {
            console.log(queuePageHeader[i].innerText)
            if (queuePageHeader[i].innerText == "Now playing") {
                console.log("queue page ready")
                return true;
            }
            // else if (queuePageHeader[i].innerText == "Next in queue") {
        }
        return false;
    }

    function checkIfQueuebitControlCenterExists() {
        // returns true/false
    }

    // Define the configuration for the observer
    var config = { childList: true };

    function checkIfQueueOpen() {

        // watchForSectionChange();

        // check if element present
        // main div: jEMA2gVoLgPQqAFrPhFw

        // excluding header: div.main-view-container__scroll-node-child

        // this is the queue list: div.rHpv7osDRvs3SUPMpQ_g
        // structure:
        // h1.Type__TypeElement-sc-goli3j-0 kqHgh DG9CsoFIptJhAneKoo_F                                   - "Queue"
        // h2.Type__TypeElement-sc-goli3j-0.bnebvq                                                       - "Now playing"
        // div.ShMHCGsT93epRGdxJp2w.Ss6hr6HYpN4wjHJ9GHmi                                                 - now playing song container
        // h2.Type__TypeElement-sc-goli3j-0 bnebvq jf2HafzDEI9jn7Yo05eM standalone-ellipsis-one-line     - "Next up"
        // div.ShMHCGsT93epRGdxJp2w.Ss6hr6HYpN4wjHJ9GHmi (aria-rowcount lists # of songs next up)        - next up song container

        // within any song container:
        // div.JUa6JJNj7R_Y3i4P8YUX
        //      (2nd div) div[role="presentation"]
        //          (list item) any div[role="row"]
        //              (containered) div[role="tracklist-row"].h4HgbO_Uu1JYg5UGANeQ.wTUruPetkKdWAR1dd6w4
        //                  (4th item, like, length, options container) div.HcMOFLaukKJdK5LfdHh0 (aria-colindex="4")
        //                      div.Type__TypeElement-sc-goli3j-0.bDHxRN.Btg2qHSuepFGBG6X0yEN[data-encore-type="type"]
        //                      which contains text like 3:57


        // if this h1 with classes Type__TypeElement-sc-goli3j-0 kqHgh DG9CsoFIptJhAneKoo_F
        // is set to Queue, that's a good sign

        //

        // now playing element:

        // "next up"
        
        // wait for queue to load

        // check for div#main

        //check if <main>'s aria-label = "Spotify - Play Queue"
        console.log($("main").attr("aria-label"))
        if ($("main").attr("aria-label") == "Spotify – Play Queue") {
            console.log("queue page open 242")
            // add control center
            startItUp()
        }
        else {
            console.log("not yet")
        }

    }

    function generateControlCenter() {

        let $ctrlCntr = $("<div>").attr("id","queuebitcontrolcenter").append(

            // header
            
            $('<h2 data-encore-id="type" class="Type__TypeElement-sc-goli3j-0 bnebvq" id="queuebitcontrolcenterheader">Queuebit</h2>'),
            // $("<h2>").attr("id","queuebitcontrolcenterheader").text("Queuebit Control Center"),

            // time elem
            $("<div>").attr("id","qbct").attr("class", "qbc").append(
                $("<p>").text("Current time:"),
                $("<div id='queuebitcurrenttime'>").text("")
            ),
            // number of items in queue
            // $("<div>").attr("id","qbqc").attr("class", "qbc").append(
            //     $("<p>").text("Queue Items:"),
            //     $("<div id='queuebitqueuecount'>").text(""),
            // ),
            // finishing time of queue elem
            $("<div>").attr("id","qbft").attr("class", "qbc").append(
                $("<p>").text("Time queue will finish:"),
                $("<div id='queuebitqueuefinishtime'>").text(""),
            ),
            // time left in current song
            $("<div>").attr("id","qbls").attr("class", "qbc").append(
                $("<p>").text("Time left in current song:"),
                $("<div id='queuebitlengthsong'>").text(""),
            ),
        )

        // console.log($ctrlCntr)
        // console.log($ctrlCntr[0].outerHTML)

        return ($ctrlCntr[0].outerHTML)
    }

    // add queuebit control center to queue
    function addControlCenter() {
        // add control center
        // check if already exists
        if ($("div#queuebitcontrolcenter").length) {
            // already exists
            // console.log("queuebit control center already exists")
        }
        else {
            // console.log("adding queuebit control center")
            let elem = generateControlCenter()
            $("div.rHpv7osDRvs3SUPMpQ_g").prepend(elem)
        }

        // add header
        // check if already exists
        if ($("h2#queuebitcontrolcenterheader").length) {
            // already exists
            // console.log("queuebit control center header already exists")
        }
        else {
            // console.log("adding queuebit control center header")
            // $("div.rHpv7osDRvs3SUPMpQ_g").prepend('<h2 data-encore-id="type" class="Type__TypeElement-sc-goli3j-0 bnebvq" id="queuebitcontrolcenterheader">Queuebit</h2>')
        }

    }

    var mainInterval;
    function startItUp() {
        addControlCenter()
        // start time display interval

        mainInterval = setInterval(function() {
            // ...

            // get current song obj

            // read current song length
            var currSongLength = readCurrentSong()

            // get progress in current song
            var currSongProgress = 0;
            // div.playback-bar div.Type__TypeElement-sc-goli3j-0.fcYQUS.playback-bar__progress-time-elapsed inner text...
            var currProgStr = $("div.playback-bar div.Type__TypeElement-sc-goli3j-0.fcYQUS.playback-bar__progress-time-elapsed").text()
            currSongProgress = convertStringToSeconds(currProgStr)

            // get queue length
            var queueLength = readSongsInQueue()

            // get items in queue
            // var queueCount = $("div.ShMHCGsT93epRGdxJp2w.Ss6hr6HYpN4wjHJ9GHmi").attr("aria-rowcount")

            console.log("currSongLength",currSongLength)
            console.log("currSongProgress",currSongProgress)
            console.log("queueLength",queueLength)

            // update with current time
            let secondsSince1970 = Math.floor(Date.now() / 1000)
            let songFinish = currSongLength - currSongProgress
            let newFinish = secondsSince1970 + currSongLength - currSongProgress + queueLength
            let newFinishDate = new Date(newFinish*1000)


            // display
            // displayThings()

            let currentTime = new Date()

            function printNiceTime(inputTime) {
                // if user has 24h setting
                let loc24h = false;

                function pad(int) {
                    if (int < 10) {
                        return "0"+int
                    }
                    return int
                }
                let hours = inputTime.getHours()
                let addOn = ""
                if (!loc24h) {
                    addOn = (hours >= 12) ? "pm" : "am"
                    hours = hours % 12
                }
                return pad(hours) + ":" + pad(inputTime.getMinutes()) + ":" + pad(inputTime.getSeconds()) + " " + addOn
            }

            function printNiceLength(inputSeconds) {
                function pad(int) {
                    if (int < 10) {
                        return "0"+int
                    }
                    return int
                } 

                return pad(Math.floor(inputSeconds/60)) + ":" + pad(inputSeconds%60)
            }


            // want h:m:s
            // let currentTimeString = currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds()
            let currentTimeString = printNiceTime(currentTime)

            let songFinishTimeString = printNiceLength(songFinish)

            // let queueFinishTimeString = newFinishDate.getHours() + ":" + newFinishDate.getMinutes() + ":" + newFinishDate.getSeconds()
            let queueFinishTimeString = printNiceTime(newFinishDate)

            $("#queuebitcurrenttime").text(currentTimeString)
            // $("#queuebitqueuecount").text(queueCount)
            $("#queuebitlengthsong").text(songFinishTimeString)
            $("#queuebitqueuefinishtime").text(queueFinishTimeString)

            // should end if queue page is closed
            // for later...
        }, 1000);

        // checkQueueState() // check if queue is actually loaded...

        // start listeners for change in song...
        // or just check every second
    }

    function readCurrentSong() {
        var len = 0;

        let childs = $("div.rHpv7osDRvs3SUPMpQ_g").children()
        let childsPastHeaderList = []
        let childsPastHeader = false
        for (let i = 0; i < childs.length; i++) {
            if (childs[i].nodeName == "H1") {
                childsPastHeader = true
            }
            if (childsPastHeader) {
                childsPastHeaderList.push(childs[i])
            }
        }

        let nowPlayingExists = false
        let npObjectIndex = -1
        // console.log("checking if any songs queued")
        for (let i = 0; i < childsPastHeaderList.length; i++) {
            // console.log(childsPastHeaderList[i])
            // get 
            if (childsPastHeaderList[i].nodeName == "H2" && childsPastHeaderList[i].className == "Type__TypeElement-sc-goli3j-0 bnebvq" && childsPastHeaderList[i].innerText == "Now playing") {
                nowPlayingExists = true
                npObjectIndex = i+1
                i = childsPastHeaderList.length
            }
        }

        if (nowPlayingExists) {

            let queueList = childsPastHeaderList[npObjectIndex]

            // console.log(queueList)

            // find div.JUa6JJNj7R_Y3i4P8YUX within
            let interim1 = $(queueList).find("div.JUa6JJNj7R_Y3i4P8YUX")
            // console.log(interim1)

            // find second div (not nested) in div.JUa6JJNj7R_Y3i4P8YUX
            // for all direct children of div.JUa6JJNj7R_Y3i4P8YUX, find the second one
            let dchildren = $(interim1).children()
            let interim2 = dchildren[1]
            // console.log(interim2)

            // find all div[role='row'] within - these are the songs
            let songList = $(interim2).find("div[role='row']")
            // console.log(songList)

            if (songList.length == 1) {
                len = findSongLength(songList[0])
            }
            else {
                console.log("invalid songlist")
            }

        }

        return len;
    }

    function checkQueueState() {
        // get list of direct children of section div.rHpv7osDRvs3SUPMpQ_g
        var listOfDirect = document.querySelector('section div.rHpv7osDRvs3SUPMpQ_g').children;

        var queuebitHeaderExists = false;
        var queuebitControlCenterExists = false;
        var nowPlayingExists = false;
        var nextInQueueExists = false;
        var nextUpExists = false;

        for (let i = 0; i < listOfDirect.length; i++) {
            // queuebitheader: #queuebitcontrolcenterheader
            if (listOfDirect[i].id == "queuebitcontrolcenterheader") {
                queuebitHeaderExists = true;
                return;
            }

            // queuebitcontrolcenter: #queuebitcontrolcenter
            if (listOfDirect[i].id == "queuebitcontrolcenter") {
                queuebitControlCenterExists = true;
                return;
            }

            // now playing: h2.Type__TypeElement-sc-goli3j-0.bnebvq with text content "Now playing"
            if (listOfDirect[i].nodeName == "H2" && listOfDirect[i].className == "Type__TypeElement-sc-goli3j-0 bnebvq" && listOfDirect[i].innerText == "Now playing") {
                nowPlayingExists = true;
                return;
            }

            // next in queue: div.HckHyQocDDePWQL2baOY.jf2HafzDEI9jn7Yo05eM with h2.Type__TypeElement-sc-goli3j-0.bnebvq with text content "Next in queue"
            if (listOfDirect[i].nodeName == "DIV" && listOfDirect[i].className == "HckHyQocDDePWQL2baOY jf2HafzDEI9jn7Yo05eM") {
                let interim1 = $(listOfDirect[i]).find("h2.Type__TypeElement-sc-goli3j-0.bnebvq")
                if (interim1.length > 0 && interim1[0].innerText == "Next in queue") {
                    nextInQueueExists = true;
                    return;
                }
            }

            // nextup: h2 that includes at least these classes: Type__TypeElement-sc-goli3j-0, bnebvq, jf2HafzDEI9jn7Yo05eM
            // and text content is NOT equal to "Next in queue" or "Now playing" or "Queuebit"
            if (listOfDirect[i].nodeName == "H2" && listOfDirect[i].className.includes("Type__TypeElement-sc-goli3j-0 bnebvq jf2HafzDEI9jn7Yo05eM") && listOfDirect[i].innerText != "Next in queue" && listOfDirect[i].innerText != "Now playing" && listOfDirect[i].innerText != "Queuebit") {
                nextUpExists = true;
                return;
            }

        }

        console.log("queuebitHeaderExists",queuebitHeaderExists)
        console.log("queuebitControlCenterExists",queuebitControlCenterExists)
        console.log("nowPlayingExists",nowPlayingExists)
        console.log("nextInQueueExists",nextInQueueExists)
        console.log("nextUpExists",nextUpExists)


    }

    function readSongsInQueue() {
        console.log("attempting to read songs in queue")

        // get children
        let childs = $("div.rHpv7osDRvs3SUPMpQ_g").children()

        // split by type = h1, take the second half
        // split when an element has a nodeNAME == "H1"
        let childsPastHeaderList = []
        let childsPastHeader = false
        for (let i = 0; i < childs.length; i++) {
            if (childs[i].nodeName == "H1") {
                childsPastHeader = true
            }
            if (childsPastHeader) {
                childsPastHeaderList.push(childs[i])
            }
        }
        // print elements now

        // console.log("childs",childs)
        // console.log("childs",childsPastHeaderList)

        // for all childsPastHeaderLength, check if content = Next in queue
        let queueExists = false
        let queueObjectIndex = -1
        // console.log("checking if any songs queued")
        for (let i = 0; i < childsPastHeaderList.length; i++) {
            // console.log(childsPastHeaderList[i])
            // get 
            if (childsPastHeaderList[i].nodeName == "DIV" && childsPastHeaderList[i].className == "HckHyQocDDePWQL2baOY jf2HafzDEI9jn7Yo05eM") {
                queueExists = true
                queueObjectIndex = i+1
                i = childsPastHeaderList.length
            }
        }

        if (queueExists) {
            // read all things in queue
            console.log("queue not empty")

            let queueList = childsPastHeaderList[queueObjectIndex]

            // console.log(queueList)

            // find div.JUa6JJNj7R_Y3i4P8YUX within
            let interim1 = $(queueList).find("div.JUa6JJNj7R_Y3i4P8YUX")
            // console.log(interim1)

            // find second div (not nested) in div.JUa6JJNj7R_Y3i4P8YUX
            // for all direct children of div.JUa6JJNj7R_Y3i4P8YUX, find the second one
            let dchildren = $(interim1).children()
            let interim2 = dchildren[1]
            // console.log(interim2)

            // find all div[role='row'] within - these are the songs
            let songList = $(interim2).find("div[role='row']")
            // console.log(songList)

            // for all in songlist run findSongLength on it and count up the seconds
            var totalSeconds = 0;
            for (var j = 0; j < songList.length; j++) {
                let songLength = findSongLength(songList[j])
                totalSeconds += songLength
                // console.log(songLength)
            }

            // console.log("total seconds",totalSeconds)
            return totalSeconds



        }
        else {
            console.log("queue empty")
            return 0;
        }
    }

    function findSongLength(songElement) {
        // console.log("finding song length")
        // console.log(songElement)
        // find div.HcMOFLaukKJdK5LfdHh0 within
        let interim1 = $(songElement).find("div.HcMOFLaukKJdK5LfdHh0")
        // console.log(interim1)

        // find div.Type__TypeElement-sc-goli3j-0.bDHxRN.Btg2qHSuepFGBG6X0yEN[data-encore-type="type"] within
        // let interim2 = $(interim1).find("div.Type__TypeElement-sc-goli3j-0.bDHxRN.Btg2qHSuepFGBG6X0yEN")
        let interim2 = $(interim1).find("div.Type__TypeElement-sc-goli3j-0");
        // Type__TypeElement-sc-goli3j-0 bDHxRN Btg2qHSuepFGBG6X0yEN
        // console.log(interim2)

        // find text within
        let songLength = $(interim2).text()
        // console.log(songLength)
        
        // convert minutes:seconds to seconds

        return convertStringToSeconds(songLength)
    }

    function convertStringToSeconds(string) {
        if (string.includes(":") == false) {
            // no colon, assume seconds
            return parseInt(string)
        }
        let splits = string.split(":")
        return parseInt(splits[0])*60 + parseInt(splits[1])
    }

});