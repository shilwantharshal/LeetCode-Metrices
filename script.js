document.addEventListener("DOMContentLoaded", function(){
    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress.circle");
    const mediumProgressCircle = document.querySelector(".medium-progress.circle");
    const hardProgressCircle = document.querySelector(".hard-progress.circle");
    
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    const cardStatsContainer = document.querySelector(".stats-cards")

    function validateUsernme(username) {
        if(username.trim() === ''){
            alert("Usename Should not be empty");
            return false
        }
        const regex = /^(?!.*__)[A-Za-z][A-Za-z0-9_]{2,19}$/;
        const isMatching = regex.test(username);
        if(!isMatching){
            alert("Invalid Username")
        }
        return isMatching;
    }

    async function fetchUserDetails(username) {
        try{
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;

            proxyUrl = "http://localhost:8080/";
            targetUrl = "https://leetcode.com/graphql/";

            const myHeaders = new Headers();
            myHeaders.append('content-type', 'application/json');
            const graphql = JSON.stringify({
                query: "\n    query userSessionProgress($username: String!) {\n  allQuestionsCount {\n    difficulty\n    count\n  }\n  matchedUser(username: $username) {\n    submitStats {\n      acSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n      totalSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n    }\n  }\n}\n    ",
                variables: { "username": `${username}` }
            })
            const request = {
                method: 'POST',
                headers: myHeaders,
                body: graphql,
            };
            const response = await fetch(proxyUrl+targetUrl, request);
            if(!response.ok){
                throw new Error("Unable to fetch the User details");
            }
            const parseData = await response.json();
            console.log("Logging Data: ", parseData);

            displayUserData(parseData)
        }
        catch(error) {
            statsContainer.innerHTML = `<p>${error.message}</p>`
        }
        finally {
            searchButton.textContent = "Search";
            searchButton.disabled = false;

        }
    }

    function updateProgress(solved, total, label, circle){
        const progressDegree = (solved/total)*100;
        circle.style.setProperty("--progress-degree", `${progressDegree}%`);
        label.textContent = `${solved}/${total}`;
    }

    function displayUserData(parseData){
        const totalQue = parseData.data.allQuestionsCount[0].count;
        const totalEasyQue = parseData.data.allQuestionsCount[1].count;
        const totalMedQue = parseData.data.allQuestionsCount[2].count;
        const totalHardQue = parseData.data.allQuestionsCount[3].count;

        const solvedTotalQues = parseData.data.matchedUser.submitStats.acSubmissionNum[0].count
        const solvedTotalEasyQues = parseData.data.matchedUser.submitStats.acSubmissionNum[1].count
        const solvedTotalMedQues = parseData.data.matchedUser.submitStats.acSubmissionNum[2].count
        const solvedTotalHardQues = parseData.data.matchedUser.submitStats.acSubmissionNum[3].count

        updateProgress(solvedTotalEasyQues, totalEasyQue, easyLabel, easyProgressCircle );
        updateProgress(solvedTotalMedQues, totalMedQue, mediumLabel, mediumProgressCircle );
        updateProgress(solvedTotalHardQues, totalHardQue, hardLabel, hardProgressCircle);

        const cardsData = [
            {label: "Overall Submissions", value: parseData.data.matchedUser.submitStats.totalSubmissionNum[0].submissions},
            {label: "Overall Easy Submissions", value: parseData.data.matchedUser.submitStats.totalSubmissionNum[1].submissions},
            {label: "Overall Medium Submissions", value: parseData.data.matchedUser.submitStats.totalSubmissionNum[2].submissions},
            {label: "Overall Hard Submissions", value: parseData.data.matchedUser.submitStats.totalSubmissionNum[3].submissions}
        ]

        console.log('carddataaaaaaaa',cardsData);

        cardStatsContainer.innerHTML = cardsData.map(
            data => {
                return `
                    <div class="card"
                    <h3>${data.label}</h3>
                    <p>${data.value}</p>
                    </div>
                `
            }
        )
    }

    searchButton.addEventListener("click", function() {
        const username = usernameInput.value;
        console.log('Logging username',username)
        if(validateUsernme(username)){
            fetchUserDetails(username)
        }
    })
})
