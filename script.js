let categories = []; 
let assignments = []; 

//  category creation
function addCategory() {
    let name = document.getElementById("catName").value;
    let points = parseFloat(document.getElementById("catPoints").value);
    let points = parseFloat(document.getElementById("catPoints").value);
	if (name !== "" && !isNaN(points)) {
		categories.push({ name: name, maxPoints: points });
        updateDropdown();
        document.getElementById("catName").value = "";
        document.getElementById("catPoints").value = "";
    }
}
function addAssignment() {
    // Selection: Getting values from the new IDs
    let cat = document.getElementById("catSelect").value;
    let name = document.getElementById("asName").value;
    let score = parseFloat(document.getElementById("asScore").value);

    // Logic: Check if category is selected and fields are filled
    if (cat !== "" && name !== "" && !isNaN(score)) {

        let newEntry = { 
            id: Date.now(),
            category: cat, 
            name: name, 
            score: score 
        };
        assignments.push(newEntry);

        // updates the UI lol
        updateUI();
        
        // Clear inputs for the next one
        document.getElementById("asName").value = "";
        document.getElementById("asScore").value = "";
    } else {
        alert("Please select a category and enter assignment details!");
    }
}

// calculated the final grade
function calculateFinal(catList, asList) {
    let totalEarned = 0;
    let totalPossible = 0;

    for (let i = 0; i < catList.length; i++) {
        let currentCat = catList[i].name;
        let catMax = catList[i].maxPoints;
        let catSum = 0;
        let count = 0;


        for (let j = 0; j < asList.length; j++) {
            if (asList[j].category === currentCat) {
                catSum += asList[j].score;
                count++;
            }
        }

        if (count > 0) {
			totalEarned += (catSum / count) * (catMax / 100);
			totalPossible += catMax;
		}
	}
	let finalPercentage = (totalEarned / (totalPossible / 100));
	return (totalPossible === 0 || isNaN(finalPercentage)) ? "0.00" : finalPercentage.toFixed(2);
}

function updateUI() {
    let finalResult = calculateFinal(categories, assignments);
    document.getElementById("displayGrade").innerText = finalResult;
    
    let logDiv = document.getElementById("log");
    logDiv.innerHTML = ""; 

    categories.forEach(cat => {
        let catAssignments = assignments.filter(a => a.category === cat.name);
        let catSum = catAssignments.reduce((sum, a) => sum + a.score, 0);
        let catAvg = catAssignments.length > 0 ? (catSum / catAssignments.length).toFixed(2) : 0;

        let section = document.createElement("div");
        let section = document.createElement("div");
        section.style.marginBottom = "20px";
        section.style.padding = "12px";
        section.style.border = "1px solid #ccc";
        section.style.borderRadius = "6px";
        section.style.backgroundColor = "#fff";
        section.innerHTML = `<div style="display: flex; justify-content: space-between; border-bottom: 1px solid #eee; padding-bottom: 8px; margin-bottom: 8px;"><strong>${cat.name}</strong> <span>${cat.maxPoints} pts | <strong>${catAvg}%</strong></span></div>`;
        
        catAssignments.forEach(a => {
            section.innerHTML += `
                <div style="margin-left: 10px; font-size: 0.85em;">
                    • ${a.name}: ${a.score}% 
                    <button onclick="editAssignment(${a.id})" style="width: auto; padding: 0px 5px; font-size: 0.7em; background-color: #ffc107;">Edit</button>
                </div>`;
        });
        logDiv.appendChild(section);
    });
}
function updateDropdown() {
    let select = document.getElementById("catSelect");
    select.innerHTML = '<option value="">--Select Category--</option>';
    categories.forEach(c => {
		select.innerHTML += `<option value="${c.name}">${c.name} (${c.maxPoints} pts)</option>`;
	});
}

function checkTotalWeight() {
    let total = 0;
    categories.forEach(c => total += c.weight);
    let status = document.getElementById("weightStatus");
    status.innerText = "Total Weight: " + total + "%";
    status.style.color = (total === 100) ? "green" : "red";
}
function editAssignment(id) {
    let assignment = assignments.find(a => a.id === id);
    
    if (assignment) {
        let newScore = prompt(`Enter new score for ${assignment.name}:`, assignment.score);
        
        if (newScore !== null && !isNaN(parseFloat(newScore))) {
            assignment.score = parseFloat(newScore);
            updateUI(); 
        }
    }
}