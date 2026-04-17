// ROW 2: DATA ABSTRACTION
// This list stores the assignment objects.
let assignmentList = []; 

function addEntry() {
    let n = document.getElementById("name").value;
    let s = parseFloat(document.getElementById("score").value);
    let w = parseFloat(document.getElementById("weight").value);

    if (n !== "" && !isNaN(s) && !isNaN(w)) {
        // Storing data in the list
        let newObject = { name: n, score: s, weight: w };
        assignmentList.push(newObject);
        
        // ROW 4: Calling the procedure with a parameter
        let total = calculateGrade(assignmentList);
        
        // Update the UI
        document.getElementById("finalGrade").innerText = total;
        document.getElementById("listDisplay").innerText = assignmentList.length + " items added";
    }
}

// ROW 4 & 5: PROCEDURAL ABSTRACTION & ALGORITHM IMPLEMENTATION
// This function uses sequencing, selection, and iteration.
function calculateGrade(dataList) {
    let weightedSum = 0;
    let totalWeight = 0;

    // ITERATION: Traverses the list
    for (let i = 0; i < dataList.length; i++) {
        let currentScore = dataList[i].score;
        let currentWeight = dataList[i].weight;

        // SELECTION: Ensures math only runs on valid weights
        if (currentWeight > 0) {
            // SEQUENCING: The math happens in order
            weightedSum += (currentScore * (currentWeight / 100));
            totalWeight += currentWeight;
        }
    }

    // Final selection to avoid division by zero
    if (totalWeight === 0) {
        return 0;
    } else {
        return (weightedSum / (totalWeight / 100)).toFixed(2);
    }
}