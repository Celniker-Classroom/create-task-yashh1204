let categories = []; 
let assignments = []; 

// ADD CATEGORY (WITH WEIGHT)
function addCategory() {
    let name = document.getElementById("catName").value;
    let weight = parseFloat(document.getElementById("catPoints").value);

    if (name !== "" && !isNaN(weight)) {
        categories.push({ name: name, weight: weight });
        updateDropdown();

        document.getElementById("catName").value = "";
        document.getElementById("catPoints").value = "";
    }
}

// ADD ASSIGNMENT (POINTS BASED)
function addAssignment() {
    let cat = document.getElementById("catSelect").value;
    let name = document.getElementById("asName").value;
    let earned = parseFloat(document.getElementById("asEarned").value);
    let possible = parseFloat(document.getElementById("asPossible").value);

    if (cat !== "" && name !== "" && !isNaN(earned) && !isNaN(possible) && possible > 0) {
        assignments.push({
            id: Date.now(),
            category: cat,
            name: name,
            earned: earned,
            possible: possible
        });

        updateUI();

        document.getElementById("asName").value = "";
        document.getElementById("asEarned").value = "";
        document.getElementById("asPossible").value = "";
    } else {
        alert("Fill everything correctly!");
    }
}

// 🔥 CORE GRADE CALCULATION
function calculateFinal() {
    let total = 0;

    categories.forEach(cat => {
        let catAssignments = assignments.filter(a => a.category === cat.name);

        if (catAssignments.length > 0) {
            let earnedSum = catAssignments.reduce((s, a) => s + a.earned, 0);
            let possibleSum = catAssignments.reduce((s, a) => s + a.possible, 0);

            let catPercent = (earnedSum / possibleSum) * 100;

            total += (catPercent * cat.weight) / 100;
        }
    });

    return total.toFixed(2);
}

// UI UPDATE
function updateUI() {
    document.getElementById("displayGrade").innerText = calculateFinal();

    let logDiv = document.getElementById("log");
    logDiv.innerHTML = "";

    categories.forEach(cat => {
        let catAssignments = assignments.filter(a => a.category === cat.name);

        let earnedSum = catAssignments.reduce((s, a) => s + a.earned, 0);
        let possibleSum = catAssignments.reduce((s, a) => s + a.possible, 0);

        let catPercent = (possibleSum > 0)
            ? ((earnedSum / possibleSum) * 100).toFixed(2)
            : "0.00";

        let section = document.createElement("div");
        section.style.marginBottom = "20px";
        section.style.padding = "12px";
        section.style.border = "1px solid #ccc";
        section.style.borderRadius = "6px";
        section.style.backgroundColor = "#fff";

        section.innerHTML = `
            <div style="display:flex; justify-content:space-between; border-bottom:1px solid #eee; padding-bottom:8px; margin-bottom:8px;">
                <strong>${cat.name}</strong> 
                <span>${cat.weight}% | <strong>${catPercent}%</strong></span>
            </div>
        `;

        catAssignments.forEach(a => {
            section.innerHTML += `
                <div style="margin-left:10px; font-size:0.85em;">
                    • ${a.name}: ${a.earned}/${a.possible}
                    <button onclick="editAssignment(${a.id})" style="width:auto; padding:2px 6px; font-size:0.7em; background:#ffc107;">
                        Edit
                    </button>
                </div>
            `;
        });

        logDiv.appendChild(section);
    });
}

// DROPDOWN
function updateDropdown() {
    let select = document.getElementById("catSelect");
    select.innerHTML = '<option value="">--Select Category--</option>';

    categories.forEach(c => {
        select.innerHTML += `<option value="${c.name}">
            ${c.name} (${c.weight}%)
        </option>`;
    });
}

// EDIT ASSIGNMENT
function editAssignment(id) {
    let assignment = assignments.find(a => a.id === id);

    if (assignment) {
        let newEarned = prompt(`New earned points:`, assignment.earned);
        let newPossible = prompt(`New possible points:`, assignment.possible);

        if (!isNaN(parseFloat(newEarned)) && !isNaN(parseFloat(newPossible))) {
            assignment.earned = parseFloat(newEarned);
            assignment.possible = parseFloat(newPossible);
            updateUI();
        }
    }
}
function checkWeights() {
    let total = categories.reduce((sum, c) => sum + c.weight, 0);
    if (total !== 100) {
        alert("Total category weights must equal 100%");
    }
}