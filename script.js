// --- Local Storage Login System ---

function login() {
    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();

    // Get saved users from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[user] && users[user] === pass) {
        document.getElementById("login-msg").innerText = "✅ Login successful!";
        localStorage.setItem("currentUser", user); // Save current logged-in user
        document.getElementById("login-page").classList.add("hidden");
        document.getElementById("budget-page").classList.remove("hidden");
    } else {
        document.getElementById("login-msg").innerText = "❌ Invalid username or password!";
    }
}

function createAccount() {
    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();

    if (!user || !pass) {
        document.getElementById("login-msg").innerText = "⚠️ Enter username and password!";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[user]) {
        document.getElementById("login-msg").innerText = "⚠️ Username already exists!";
        return;
    }

    users[user] = pass; // Save new user
    localStorage.setItem("users", JSON.stringify(users));

    document.getElementById("login-msg").innerText = "✅ Account created! Please log in.";
}

// --- Add New Expense Category ---
function addExpense() {
    const container = document.getElementById("expenses-list");
    const div = document.createElement("div");
    div.classList.add("expense-item");
    div.innerHTML = `
        <input type="text" placeholder="Category">
        <input type="number" placeholder="Amount">
    `;
    container.appendChild(div);
}

// --- Budget Calculation ---
function calculateBudget() {
    const income = parseFloat(document.getElementById("income").value) || 0;
    const goal = parseFloat(document.getElementById("goal").value) || 0;

    let totalExpenses = 0;
    const expenses = document.querySelectorAll("#expenses-list .expense-item input[type='number']");
    expenses.forEach(exp => {
        totalExpenses += parseFloat(exp.value) || 0;
    });

    const balance = income - totalExpenses;
    let msg = `💵 Income: $${income.toFixed(2)}\n💸 Expenses: $${totalExpenses.toFixed(2)}\n💰 Balance: $${balance.toFixed(2)}`;

    if (goal > 0) {
        if (balance >= goal) {
            msg += `\n🎉 You reached your goal of $${goal}!`;
        } else {
            msg += `\n📉 You still need $${(goal - balance).toFixed(2)} to reach your goal.`;
        }
    }

    document.getElementById("result").innerText = msg;
}

// --- Auto Login if user already logged in ---
window.onload = function () {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
        document.getElementById("login-page").classList.add("hidden");
        document.getElementById("budget-page").classList.remove("hidden");
    }
};function logout() {
    localStorage.removeItem("currentUser");
    document.getElementById("budget-page").classList.add("hidden");
    document.getElementById("login-page").classList.remove("hidden");
}
