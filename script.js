// ROW 2: DATA ABSTRACTION 
let gradeList = [];

function addAssignment() {
    let name = document.getElementById("assignName").value;
    let score = parseFloat(document.getElementById("assignScore").value);
    let weight = parseFloat(document.getElementById("assignWeight").value);

    if (name !== "" && !isNaN(score) && !isNaN(weight)) {
        // Storing data as an object in the list
        let newEntry = { "title": name, "pts": score, "pct": weight };
        gradeList.push(newEntry);

        updateUI();
        
        // Clear inputs
        document.getElementById("assignName").value = "";
        document.getElementById("assignScore").value = "";
        document.getElementById("assignWeight").value = "";
    } else {
        alert("Please enter a name, score, and weight!");
    }
}

// ROW 4: PROCEDURAL ABSTRACTION (Function with parameter)
function calculateFinal(list) {
    let weightedTotal = 0;
    let weightSum = 0;

    // ROW 5: ALGORITHM IMPLEMENTATION (Iteration + Selection + Sequencing)
    for (let i = 0; i < list.length; i++) {
        let s = list[i].pts;
        let w = list[i].pct;

        if (w > 0) {
            weightedTotal += (s * (w / 100));
            weightSum += w;
        }
    }

    if (weightSum === 0) return 0;
    return (weightedTotal / (weightSum / 100)).toFixed(2);
}

function updateUI() {
    // Calling the procedure
    let finalResult = calculateFinal(gradeList);
    document.getElementById("displayGrade").innerText = finalResult;
    
    // Updated display to show the weighting as requested
    let logDiv = document.getElementById("log");
    logDiv.innerHTML = "<strong>List Contents:</strong><br>";
    
    for(let j = 0; j < gradeList.length; j++) {
        // This line now shows the title, the score, AND the weight
        logDiv.innerHTML += gradeList[j].title + ": " + gradeList[j].pts + "% (Weight: " + gradeList[j].pct + "%)<br>";
    }
}