const packagesListContainer = document.getElementById("packagesListContainer");
const authorsListContainer = document.getElementById("authorsListContainer");
const versionsListContainer = document.getElementById("versionsListContainer");

const packageForm = document.getElementById("packageForm");
const authorForm = document.getElementById("authorForm");
const versionForm = document.getElementById("versionForm");

// Function to reset all forms except the currently active one start
function resetForms(exceptForm = null) {
    if (packageForm !== exceptForm) packageForm.classList.remove("active");
    if (authorForm !== exceptForm) authorForm.classList.remove("active");
    if (versionForm !== exceptForm) versionForm.classList.remove("active");
}
// Function to reset all forms except the currently active one end

// Form Showing handler start
showPackageFormBtn.addEventListener("click", () => {
    const isActive = packageForm.classList.contains("active");
    resetForms(isActive ? null : packageForm);
    packageForm.classList.toggle("active", !isActive);
});

showAuthorFormBtn.addEventListener("click", () => {
    const isActive = authorForm.classList.contains("active");
    resetForms(isActive ? null : authorForm);
    authorForm.classList.toggle("active", !isActive);
});

showVersionFormBtn.addEventListener("click", () => {
    const isActive = versionForm.classList.contains("active");
    resetForms(isActive ? null : versionForm);
    versionForm.classList.toggle("active", !isActive);
});
// Form Showing handler end 


// Function to fetch and display authors start
async function fetchAndDisplayAuthors() {
    try {
        const response = await fetch("assets/includes/addauthor.php");
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const authors = await response.json();

        const authorsListContainers = document.querySelectorAll(".authorsListContainer");
        authorsListContainers.forEach((container) => {
            container.innerHTML = "";

            if (!authors || authors.length === 0) {
                container.innerHTML = "<p>No authors found</p>";
                return;
            }

            authors.forEach((author) => {
                const authorElement = document.createElement("div");
                authorElement.classList.add("border-2", "border-green-800", "p-4", "rounded", "mb-4", "shadow-md");
                authorElement.innerHTML = `
                    <div class="flex justify-evenly">
                        <h4 class="text-lg mb-2">${author.author_id || "Unknown"}</h4>
                        <h4 class="text-lg mb-2">${author.name || "Unknown"}</h4>
                        <p class="text-green-200">${author.email || "No email"}</p>
                        <p class="text-green-200">${author.registration_date || "No date"}</p>
                    </div>
                `;
                container.appendChild(authorElement);
            });
        });
    } catch (error) {
        console.error("Failed to load authors:", error.message);

        const errorMessage = `
            <div class="bg-red-800 p-4 rounded-lg text-white">
                Failed to load authors. Error: ${error.message}
            </div>
        `;

        document.querySelectorAll(".authorsListContainer").forEach((container) => {
            container.innerHTML = errorMessage;
        });
    }
}
// Function to fetch and display authors end

// Function to add authors start
async function handleAuthorSubmission(event) {
    event.preventDefault();

    const name = document.getElementById("authorName").value.trim();
    const email = document.getElementById("authorEmail").value.trim();

    try {
        const response = await fetch("assets/includes/addauthor.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `authorName=${encodeURIComponent(name)}&authorEmail=${encodeURIComponent(email)}`,
        });

        if (!response.ok) {
            const result = await response.json();
            throw new Error(result.error || "Failed to add author");
        }

        fetchAndDisplayAuthors();
        event.target.reset();
        authorForm.classList.remove("active");
    } catch (error) {
        alert("Failed to add author. Please try again.");
    }
}
// Function to add authors end

//Function to populate the authors in package form start
async function fetchAndPopulateAuthors() {
    try {
        const response = await fetch("assets/includes/addauthor.php");
        const authors = await response.json();

        const authorSelect = document.getElementById("authorId");
        // Clear existing options except the first one
        authorSelect.length = 1;

        // Populate dropdown with authors
        authors.forEach((author) => {
        const option = document.createElement("option");
        option.value = author.author_id;
        option.textContent = author.name;
        authorSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error fetching authors:", error);
    }
}
//Function to populate the authors in package form end
