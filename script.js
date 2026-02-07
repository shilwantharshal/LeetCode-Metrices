document.addEventListener("DOMContentLoaded", function(){
    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgresscCircle = document.querySelector(".easy-progress circle");
    const mediumProgresscCircle = document.querySelector(".medium-progress circle");
    const hardProgresscCircle = document.querySelector(".hard-progress circle");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-btn");
    const hardLabel = document.getElementById("hard-btn");
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

    function fetchUserDetails(username){

    }

    searchButton.addEventListener("click", function() {
        const username = usernameInput.value;
        console.log('Logging username',username)
        if(validateUsernme(username)){
            fetchUserDetails(username)
        }
    })
})
