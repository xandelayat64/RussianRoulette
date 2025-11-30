rand = 0;

//Randomly generates a number between 0 and 5, and add 1 (1 to 6)
function getRandomNumber() {
    rand = Math.floor(Math.random() * 6) + 1;
    return rand;
}

//Check the result of the random number and compares it to 6
async function shootRussianRoulette() {
    const number = getRandomNumber();
    const resultDiv = document.getElementById('lucky');

    if (number === 6) {
        resultDiv.textContent = `BANG! You got ${number}... Deleting the targetted foler !`;
        resultDiv.className = 'boom';

        //try to call the server to delete the folder (folderPath in server.js)
        //if not, display an error message
        try {
            // send a HTTP req to the node.js server on this route: '/create-file'
            const response = await fetch('/create-file');
            // converting the response from json to js obj, to use it in the messages below
            const data = await response.json();

            //did the server succeed to delete the folder ??????
            if (data.success) {
                resultDiv.textContent = `BANG! You got ${number}... ${data.message}`;
            } else {
                resultDiv.textContent = `BANG! You got ${number}... Error: ${data.message} You're lucky, it didn't get deleted`;
            }
        } catch (error) {
            //Server error message
            resultDiv.textContent = `/!\\ SERVER ERROR, I REPEAT: SERVER ERROR /!\\`;
            console.error('Error:', error);
        }

    } else {
        //You didn't get 6, you're lucky
        resultDiv.textContent = `Uh... You got ${number}... You're lucky, another try ?`;
        resultDiv.className = 'safe';
    }
}

//Display the gotten random number in the console
// (I pretty much think this may be useful on some purpose)
console.log(getRandomNumber(maxVal));
