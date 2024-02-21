
//these functions are outside of the "player zones"
let start_btn = document.getElementById("start-btn");
let player_go = document.getElementById("player-go-text");
let modify_timer = document.getElementById("modify-time-btn");
let modify_wins = document.getElementById("modify-wins-btn");
let random_player;
let go_btn = document.getElementById("go-btn");
let money_for_grab_text = document.getElementById("money-for-grabs");
let confirm_changes = document.getElementById("confirm-changes");

//variables for the money multiplier $$ chingching
const money_amts = [10, 20, 50, 100];
let money = money_amts[Math.floor(Math.random() * money_amts.length)];
let money_text = document.getElementById("money-value");

//variables for the Modify Timer/ Modify Win count
let selectSeconds;
let selectMinutes;
let selectedIndex = -1;
let selectedIndexMins = -1;
let selectedIndexSecs = -1;
let selectVal = -1;
let user_wins = 5;


let no_questions_left = false;

//player 1 object
let player_1 = {
    id: 1,
    correct_count: 0,
    list: document.getElementById("p1-list"),
    button_a: document.getElementById("p1-button_a"),
    button_b: document.getElementById("p1-button_b"),
    button_c: document.getElementById("p1-button_c"),
    button_d: document.getElementById("p1-button_d"),
    timer: document.getElementById("timer-play-1"),
    start_btn: document.getElementById("p1-start-btn"),
    next_btn: document.getElementById("p1-next"),
    result: document.getElementById("p1-result"),
    points: document.getElementById("p1-points"),
    minutes: 1,
    seconds: 0,
    milliseconds: 0,
    leading_min: "",
    leading_sec: "",
    leading_mill: "",
    t: "",
    finished_state: false,
    win_state: false,
    player_div: document.getElementById("player-1"),
    player_title: document.getElementById("player-1-title")
};

//player_2 object
let player_2 = {
    id: 2,
    correct_count: 0,
    list: document.getElementById("p2-list"),
    button_a: document.getElementById("p2-button_a"),
    button_b: document.getElementById("p2-button_b"),
    button_c: document.getElementById("p2-button_c"),
    button_d: document.getElementById("p2-button_d"),
    timer: document.getElementById("timer-play-2"),
    start_btn: document.getElementById("p2-start-btn"),
    next_btn: document.getElementById("p2-next"),
    result: document.getElementById("p2-result"),
    points: document.getElementById("p2-points"),
    minutes: 1,
    seconds: 0,
    milliseconds: 0,
    leading_min: "",
    leading_sec: "",
    leading_mill: "",
    t: "",
    win_state: false,
    finished_state: false,
    player_div: document.getElementById("player-2"),
    player_title: document.getElementById("player-2-title")
}


//create a players list
const player_list = [player_1, player_2]
let data;
let correct_answer = -1;


//give event listeners to buttons
//set them all to disabled for now
for (let i = 0; i < player_list.length; i++) {
    player_list[i]["button_a"].addEventListener("click", () => calculateAnswer(player_list[i], 0));
    player_list[i]["button_b"].addEventListener("click", () => calculateAnswer(player_list[i], 1));
    player_list[i]["button_c"].addEventListener("click", () => calculateAnswer(player_list[i], 2));
    player_list[i]["button_d"].addEventListener("click", () => calculateAnswer(player_list[i], 3));
    player_list[i]["next_btn"].addEventListener("click", () => nextPlay(player_list[i]));

    //must be disabled because other functionality must quick off first
    player_list[i]["button_a"].disabled = true;
    player_list[i]["button_b"].disabled = true;
    player_list[i]["button_c"].disabled = true;
    player_list[i]["button_d"].disabled = true;
    player_list[i]["next_btn"].disabled = true;


}


//the start button initialises who goes first
//when clicked, the go button will become active
start_btn.addEventListener("click", randomPlayer);
go_btn.disabled = true;

//the go button effectively runs the game
go_btn.addEventListener("click", () => startTimer(random_player));

//these are by default active, when a game starts however, they are disabled.
modify_timer.addEventListener("click", modifyTimer);
modify_wins.addEventListener("click", modifyWins);


//by default this button is disabled unless user accesses "modify functions"
confirm_changes.disabled = true;

//modifies the number of mins and seconds on players' timers
function modifyTimer() {

    //these buttons are disabled to prevent erroneous functionality
    start_btn.disabled = true;
    go_btn.disabled = true;
    modify_timer.disabled = true;
    modify_wins.disabled = true;


    //activate the confirm changes button
    //give it the timer specific change functionality
    confirm_changes.disabled = false;
    confirm_changes.addEventListener("click", confirmChangesTimer);

    //create a selection box for the seconds
    selectSeconds = document.createElement("select");
    selectSeconds.name = "timer";
    selectSeconds.id = "timer";

    //create a selection box for the minutes
    selectMinutes = document.createElement("select");
    selectMinutes.name = "timer-min";
    selectMinutes.id = "timer-min"


    //create options in selection box 0 - 10
    for (let i = 0; i <= 10; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = i;
        option.id="mins-options";
        selectMinutes.appendChild(option);
    }

    //create options in selection box 1 - 59
    for (let i = 1; i <= 59; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = i;
        option.id = "secs-options";
        selectSeconds.appendChild(option);
    }

    //create label for minutes
    var label = document.createElement("label");
    label.innerHTML = "Choose number of Minutes: "
    label.htmlFor = "minute label";

    //add it to the money-value text area
    document.getElementById("money-value").appendChild(label).appendChild(selectMinutes);

    //create label for seconds
    var label = document.createElement("label");
    label.innerHTML = "Choose number of Seconds: "
    label.htmlFor = "minute label";

    //add it to the money-value text area
    document.getElementById("money-value").appendChild(label).appendChild(selectSeconds);

}

//this functionality changes the number of wins required to end the game
//by default wins are 5
function modifyWins() {
    
    //these buttons have to be disabled to stop erroneous functionality
    start_btn.disabled = true;
    go_btn.disabled = true;
    modify_timer.disabled = true;
    modify_wins.disabled = true;

    //activate the confirmation button specific functionality for "wins"
    confirm_changes.disabled = false;
    confirm_changes.addEventListener("click", confirmChanges);
    var values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    selectVal = document.createElement("select");
    selectVal.name = "wins";
    selectVal.id = "wins";

    //set wins select drpdwn from 1 - 10
    for (const val of values) {
        var option = document.createElement("option");
        option.value = val;
        option.text = val;
        selectVal.appendChild(option);

    }

    //add label for wins dropdown
    var label = document.createElement("label");
    label.innerHTML = "Choose number of wins: "
    label.htmlFor = "Choose number of wins";

    //this is a workaround
    document.getElementById("money-value").appendChild(label).appendChild(selectVal);

}


//this functionality confirm the changes to the timer
function confirmChangesTimer() {

    //activate these buttons again
    start_btn.disabled = false;
    go_btn.disabled = true;
    modify_timer.disabled = false;
    modify_wins.disabled = false;
    confirm_changes.disabed = true;

    //get our index of selected values
    selectedIndexSecs = selectSeconds.selectedIndex;
    console.log("Selected index is: " + selectedIndexSecs);
    selectedOption = selectSeconds.options[selectedIndexSecs];
    console.log("Selected option is: " + selectedOption.outerHTML);
    console.log("Selected value is: " + selectedOption.value);
    console.log("Selected text is: " + selectedOption.text);

    //update the seconds values in the JS objects
    player_1["seconds"] = selectedOption.value;
    player_2["seconds"] = selectedOption.value;


    //get indexes and options based on selection
    selectedIndexMins = selectMinutes.selectedIndex;
    console.log("Selected index is: " + selectedIndexSecs);
    selectedOption = selectMinutes.options[selectedIndexMins];
    console.log("Selected option is: " + selectedOption.outerHTML);
    console.log("Selected value is: " + selectedOption.value);
    console.log("Selected text is: " + selectedOption.text);

    //update the minutes values in the JS objects
    player_1["minutes"] = selectedOption.value;
    player_2["minutes"] = selectedOption.value;



    //add leading 0s if required
    for (let i = 0; i < player_list.length; i++) {
        if (player_list[i]["minutes"] < 10) {
            player_list[i]["leading_min"] = "0";
        }else{
            player_list[i]["leading_min"] ="";
        }

        if (player_list[i]["seconds"] < 10) {
            player_list[i]["leading_sec"] = "0";
        }

    }


    //remove the event listener.
    confirm_changes.removeEventListener("click", confirmChangesTimer);

    //change the timer text to updated values.
    player_1["timer"].innerHTML = `${player_1["leading_min"]}${player_1["minutes"]}: ${player_1["leading_sec"]}${player_1["seconds"]}: 00`;
    player_2["timer"].innerHTML = `${player_2["leading_min"]}${player_2["minutes"]}: ${player_1["leading_sec"]}${player_1["seconds"]}: 00`;
    
    //gut out the children from the money value text area
    while (document.getElementById("money-value").firstChild) {
        money_text.removeChild(money_text.firstChild);
    }

    //disable the confirm changes button
    confirm_changes.disabled = true;
}


//this confirms the number of wins required to finish.
function confirmChanges() {

    //turn back on/off the buttons
    start_btn.disabled = false;
    go_btn.disabled = true;
    modify_timer.disabled = false;
    modify_wins.disabled = false;
    confirm_changes.disabed = false;

    //get our selected indexes and options
    selectedIndex = selectVal.selectedIndex;
    console.log("Selected index is: " + selectedIndex);
    selectedOption = selectVal.options[selectedIndex];
    console.log("Selected option is: " + selectedOption.outerHTML);
    console.log("Selected value is: " + selectedOption.value);
    console.log("Selected text is: " + selectedOption.text);
    user_wins = selectedOption.value;


    //change the text based on wins selected
    player_1["points"].innerHTML = `P${player_1["id"]} Points: ${player_1["correct_count"]} / ${user_wins}`;
    player_2["points"].innerHTML = `P${player_2["id"]} Points: ${player_2["correct_count"]} / ${user_wins}`;


    //then gut out the money value text area children.
    while (document.getElementById("money-value").firstChild) {
        money_text.removeChild(money_text.firstChild);
    }

    //remove the event listener for it
    confirm_changes.removeEventListener("click", confirmChanges);
}

//when user clicks the start button, we select a random player to begin
//unnecessary but makes it more fun.
//originally done so I wouldn't have to undo some of the colours selected for the player areas.
function randomPlayer() {

    modify_timer.disabled = true;
    modify_wins.disabled = true;
    confirm_changes.disabled = true;
    start_btn.disabled = true;
    //pick a random player from the list
    random_player = player_list[Math.floor(Math.random() * player_list.length)];
    player_go.innerHTML = `Player ${random_player["id"]} goes first.. `
    money_for_grab_text.innerHTML = `Money up for grabs: $${money}`;
    //enable the starting of the game
    go_btn.disabled = false;

    //change the colour of who's going to play.
    if (random_player["id"] === 2) {
        changeColor(player_1);
    } else {
        changeColor(player_2);
    }


}


//when the user clicks the "pass" button
//we need to swap to the other player.
function nextPlay(player_dict) {


    player_dict["next_btn"].disabled = true;

    money_text.innerHTML = "";



    //if the other player has not finished the game, we swap
    if (player_dict["id"] === 1) {
        if (player_list[1]["finished_state"] === false) {
            player_dict = player_list[1];
        }
    } else {
        if (player_list[0]["finished_state"] === false) {
            player_dict = player_list[0];
        }
    }


    //swap all the colours
    if (player_dict["id"] === 2) {
        changeColor(player_1);
        revertColor(player_2);
    } else {
        changeColor(player_2);
        revertColor(player_1);
    }

    //if user has somehow ran out of data...
    if(data.length === 0){
        noQuestions(player_dict);
    }
    else{

    startTimer(player_dict);

    }
    //printQuestion(data);
}

//get an array from the json file.
async function getArray() {

    //check here for response error ??
    const response = await fetch("./questions.json")

    data = await response.json();
    console.log(data);

    //printQuestion(data);


}

//create the array from the data at very start.
getArray();


//when no questions exist, this will be called.
function noQuestions(player_dict){
    no_questions_left = true;
    
    //all this functionality effectively shuts down the game.
    for(let i = 0; i < player_list.length; i++){
        player_list[i]["button_a"].disabled = true;
        player_list[i]["button_b"].disabled = true;
        player_list[i]["button_c"].disabled = true;
        player_list[i]["button_d"].disabled = true;
        player_list[i]["next_btn"].disabled = true;
        player_list[i]["finished_state"] = true
        clearInterval(player_list[i]["t"]);
        revertColor(player_list[i]);

    }

    //it doesn't matter who is passed.
    checkEndState(player_list[0]);


    

   
}

//this prints our question and the four options to the user
function printQuestion(data, player_dict) {

    //create a li question
    const question = document.createElement("li");
    //if a question already exists in html, remove all of it
    while (player_dict["list"].firstChild) {
        player_dict["list"].removeChild(player_dict["list"].firstChild);
    }


    //if for some reason there's a length of 0... end the game here
    if(data.length === 0){
        noQuestions(player_dict);
    }

    else{
    //otherwise fetch the random question
    let random_question = randomChoice(data);


    if(random_question === -1){
        noQuestions(player_dict);    
    }else{
    console.log(`Size of array is now ${data.length}`)
    
    
    //tell the players they're running out of questions
    if(data.length === 30){
        money_text.innerHTML = "You have 30 questions remaining..."
    }else if(data.length === 20){
        money_text.innerHTML = "You have 20 questions remaining..."
    }else if(data.length === 10){
        money_text.innerHTML = "You have 10 questions remaining..."
    }

    //create a list element
    let ans_list = document.createElement("ol");

    //append the question
    question.appendChild(document.createElement("h1")).textContent = random_question["question"];
    

    player_dict["list"].appendChild(question);

    //create a list of answers
    random_question["answers"].forEach((item) => {
        let li = document.createElement("li");
        li.innerText = item;
        ans_list.appendChild(li);
    });


    //append the answers to the questions and display.
    player_dict["list"].appendChild(ans_list);

    console.log(random_question["correct"]);
    //get the correct answer required
    correct_answer = random_question["correct"];
    
    }
}

}


//this picks a random question from the data list
function randomChoice(data) {
   
    //by default
    let random_choice = -1;
    //if the length is less than 0, return a -1
    if(data.length === 0){
        return -1;
    }
    else{

    //get the random value
    let random_val = Math.floor(Math.random() * data.length);
    //get our random question
    random_choice = data[random_val];
    console.log(random_choice);
    //remove this value from the data
    console.log(data.splice(random_val, 1));
    console.log(data.length);


    //returns the random piece of data
    return random_choice;
    }
}

//this verifies the player's answers
function calculateAnswer(player_dict, answer) {

    //if the user has a correct answer... add it to the count
    if (answer === correct_answer) {
        player_dict["correct_count"]++;

        //get a confirmation that their result is correct
        player_dict["result"].innerHTML = `Result : Correct`;
        //update the innerhtml with the count
        player_dict["points"].innerHTML = `P${player_dict["id"]} Points: ${player_dict["correct_count"]} / ${user_wins}`
    } else {
        //otherwise... the result is incorrect
        player_dict["result"].innerHTML = `Result: Incorrect`;
    }
    

    //we'll disable our 4 play buttons
    disableButtons(player_dict);


    //stop our timer
    clearInterval(player_dict["t"]);

    //if user has reached our win count
    if (player_dict["correct_count"] == user_wins) {

 
        //then we can enable the next button as they have to pass it back
        player_dict["next_btn"].disabled = false;
        player_dict["finished_state"] = true;
        //they have a "win state"
        player_dict["win_state"] = true;


        //if both players have a win... check
        if (player_1["finished_state"] && player_2["finished_state"]) {
            player_dict["next_btn"].disabled = true;
            checkWinState();
        }

        //abcd buttons have to be disabled
        player_dict["button_a"].disabled = true;
        player_dict["button_b"].disabled = true;
        player_dict["button_c"].disabled = true;
        player_dict["button_d"].disabled = true;

    } else {
        //otherwise, we're just making sure this button is enabled.
        player_dict["next_btn"].disabled = false;
    }

}


//this is started by the "go button", which effectively starts the actual run of the game
function startTimer(player_dict) {

    //clear out who's turn it is.
    player_go.innerHTML = "";

    //disabled the go button
    go_btn.disabled = true;

    confirm_changes.disabled = true;
    //we set the players buttons to false whilst its their turn.
    player_dict["button_a"].disabled = false;
    player_dict["button_b"].disabled = false;
    player_dict["button_c"].disabled = false;
    player_dict["button_d"].disabled = false;

    //if by some chance there's no data... end the game.
    if(data.length == 0){
        noQuestions(player_dict);

    }else{

    //otherwise, lets print the question from the data array
    printQuestion(data, player_dict);
    }
    //start the timer for this player
    player_dict["t"] = setInterval(() => remove(player_dict), 10);
}

//this functionality concerns the timers for each of the players
//only counts down as the player is currently in play
function remove(player_dict) {
    player_dict["milliseconds"]--;

    //when the timer hits exactly 0 for this player
    //player's game ends
    //using === causes an error here... I don't know why.
    if (player_dict["minutes"] == 0 && player_dict["seconds"] == 0 && player_dict["milliseconds"] == 0) {
        clearInterval(player_dict["t"]);
        player_dict["button_a"].disabled = true;
        player_dict["button_b"].disabled = true;
        player_dict["button_c"].disabled = true;
        player_dict["button_d"].disabled = true;
        player_dict["next_btn"].disabled = true;
        player_dict["finished_state"] = true;
        checkEndState(player_dict);

    }
    if (player_dict["milliseconds"] < 0) {
        player_dict["milliseconds"] = 99;
        player_dict["seconds"]--;
    }
    if (player_dict["seconds"] < 0) {
        player_dict["seconds"] = 59;
        player_dict["minutes"]--;
    }
    if (player_dict["minutes"] < 10) {
        player_dict["leading_min"] = "0";
    } else {
        player_dict["leading_min"] = "";
    }
    if (player_dict["seconds"] < 10) {
        player_dict["leading_sec"] = "0";
    } else {
        player_dict["leading_sec"] = "";
    }
    if (player_dict["milliseconds"] < 10) {
        player_dict["leading_mill"] = "0";
    } else {
        player_dict["leading_mill"] = "";
    }

    player_dict["timer"].innerHTML = `${player_dict["leading_min"]}${player_dict["minutes"]}: ${player_dict["leading_sec"]}${player_dict["seconds"]}: ${player_dict["leading_mill"]}${player_dict["milliseconds"]}`;
}

//function disables a,b,c,d buttons
function disableButtons(player_dict) {
    player_dict["button_a"].disabled = true;
    player_dict["button_b"].disabled = true;
    player_dict["button_c"].disabled = true;
    player_dict["button_d"].disabled = true;
}

//this checks to see what the story is when user has reached an end state
function checkEndState(player_dict) {

    //if the player's id is 1
    if (player_dict["id"] === 1) {
        //if the *other* player is also finished
        if (player_list[1]["finished_state"] === true) {
            checkWinState();
        } else {
            //otherwise... lets keep going with the other user
            changeColor(player_list[0]);
            revertColor(player_list[1]);
            startTimer(player_list[1]);
        }
    //if the players object id is 2
    } else if (player_dict["id"] === 2) {
        if (player_list[0]["finished_state"] === true) {
            checkWinState();
        } else {
            //otherwise... keep going with 1st player
            changeColor(player_list[1]);
            revertColor(player_list[0]);
            startTimer(player_list[0]);
        }
    }
}

//this function is called if both players have finished the game
function checkWinState() {

    clearInterval(player_1["t"]);
    clearInterval(player_2["t"]);

    //if neither player wins
    if (player_1["win_state"] === false && player_2["win_state"] === false) {
        money_text.innerHTML = "Nobody wins....";
        if(no_questions_left){
            money_text.innerHTML +=" ran out of questions."
        }
        //switch back colours to original
        revertColor(player_1);
        revertColor(player_2);
    //if player 1 wins....
    } else if (player_1["win_state"] && player_2["win_state"] === false) {
        console.log("Player 1 wins");

        revertColor(player_1);
        revertColor(player_2);
        calculateWinnings(player_1);
    //if player 2 wins....
    } else if (player_2["win_state"] === true && player_1["win_state"] === false) {
        console.log("Player 2 wins.")
        revertColor(player_1);
        revertColor(player_2);
        calculateWinnings(player_2);
    //both players have "won"
    } else {
        console.log("Both players are successful...")
        revertColor(player_1);
        revertColor(player_2);
        //now we check to see who has won based on seconds and millseconds left
        if (player_1["seconds"] === player_2["seconds"]) {
            if (player_1["milliseconds"] > player_2["milliseconds"]) {

                //we pass through the winner's object
                calculateWinnings(player_1);
            }
            else if (player_2["milliseconds"] > player_1["milliseconds"]) {
                calculateWinnings(player_2);
            }
        }

        else if (player_1["seconds"] > player_2["seconds"]) {
            calculateWinnings(player_1);
        } else {

            calculateWinnings(player_2);
        }

    }
}

//this function checks how much winnings the player wins
function calculateWinnings(player) {
    console.log(player["seconds"]);
    let min_to_sec = player["minutes"] * 60;

    let total_won = (min_to_sec + player["seconds"]) * money;

    money_text.innerHTML = `Player ${player["id"]} has won $${total_won}! `
    if(no_questions_left){
        money_text.innerHTML +=" ran out of questions."
    }


}

//this function effectively makes the player less noticeable
//this player is not in play
function changeColor(player_dict) {
    player_dict["player_div"].style.color = "white";
    player_dict["player_title"].style.background = "#1f1f1f";
    player_dict["player_title"].style.color = "#1f1f1f";
    player_dict["player_div"].style.background = "white";


}

//this function reverts the colour
//this player is now in play (or game has ended)
function revertColor(player_dict) {
    player_dict["player_div"].style.color = "white";
    player_dict["player_title"].style.background = "white";
    player_dict["player_title"].style.color = "#1f1f1f";
    player_dict["player_div"].style.background = "#1f1f1f";
}