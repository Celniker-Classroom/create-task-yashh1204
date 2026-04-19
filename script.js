let categories = []; 
let assignments = []; 

// New function to handle category creation
function addCategory() {
    let name = document.getElementById("catName").value;
    let weight = parseFloat(document.getElementById("catWeight").value);
    if (name !== "" && !isNaN(weight)) {
        categories.push({ name: name, weight: weight });
        updateDropdown();
        checkTotalWeight();
        document.getElementById("catName").value = "";
        document.getElementById("catWeight").value = "";
    }
}
function addAssignment() {
    // Selection: Getting values from the new IDs
    let cat = document.getElementById("catSelect").value;
    let name = document.getElementById("asName").value;
    let score = parseFloat(document.getElementById("asScore").value);

    // Logic: Check if category is selected and fields are filled
    if (cat !== "" && name !== "" && !isNaN(score)) {
        // ROW 2: Adding an object to the assignments list
        let newEntry = { 
            category: cat, 
            name: name, 
            score: score 
        };
        assignments.push(newEntry);

        // Update the screen and math
        updateUI();
        
        // Clear inputs for the next one
        document.getElementById("asName").value = "";
        document.getElementById("asScore").value = "";
    } else {
        alert("Please select a category and enter assignment details!");
    }
}

// ROW 4: PROCEDURAL ABSTRACTION (Function with parameter)
function calculateFinal(catList, asList) {
    let finalScore = 0;

    // OUTER ITERATION: Loops through categories
    for (let i = 0; i < catList.length; i++) {
        let currentCat = catList[i].name;
        let catWeight = catList[i].weight / 100;
        let catSum = 0;
        let count = 0;

        // INNER ITERATION: Loops through assignments to find matches
        for (let j = 0; j < asList.length; j++) {
            if (asList[j].category === currentCat) {
                catSum += asList[j].score;
                count++;
            }
        }

        if (count > 0) {
            let catAverage = catSum / count;
            finalScore += (catAverage * catWeight);
        }
    }
    return finalScore.toFixed(2);
}

function updateUI() {
 // Calling the procedure with TWO parameters now
    let finalResult = calculateFinal(categories, assignments);
    document.getElementById("displayGrade").innerText = finalResult;
    
    let logDiv = document.getElementById("log");
    logDiv.innerHTML = "<strong>Assignments added:</strong><br>";
    for(let k = 0; k < assignments.length; k++) {
        logDiv.innerHTML += `[${assignments[k].category}] ${assignments[k].name}: ${assignments[k].score}%<br>`;
    }
}
function updateDropdown() {
    let select = document.getElementById("catSelect");
    select.innerHTML = '<option value="">--Select Category--</option>';
    categories.forEach(c => {
        select.innerHTML += `<option value="${c.name}">${c.name} (${c.weight}%)</option>`;
    });
}

function checkTotalWeight() {
    let total = 0;
    categories.forEach(c => total += c.weight);
    let status = document.getElementById("weightStatus");
    status.innerText = "Total Weight: " + total + "%";
    status.style.color = (total === 100) ? "green" : "red";
}