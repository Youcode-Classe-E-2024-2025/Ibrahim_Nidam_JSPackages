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
        const responseText = await response.text();
    
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}, message: ${responseText}`);
            }
        
            let authors;
            try {
            authors = JSON.parse(responseText);
            } catch (parseError) {
            throw new Error("Failed to parse authors JSON: " + responseText);
            }
        
            const authorsListContainers = document.querySelectorAll(".authorsListContainer");
            authorsListContainers.forEach((container) => {
            container.innerHTML = "";
        
            if (!authors || authors.length === 0) {
                container.innerHTML = "<p>No authors found</p>";
                return;
            }
        
            authors.forEach((author) => {
                const authorElement = document.createElement("div");
                authorElement.classList.add("border-2","border-green-800","p-4","rounded","mb-4","shadow-md");
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
            console.error("Complete error details:", error);
        
            const authorsListContainers = document.querySelectorAll(".authorsListContainer");
            const errorMessage = `
                <div class="bg-red-800 p-4 rounded-lg text-white">
                    Failed to load authors. Error: ${error.message}
                </div>
            `;
        
            authorsListContainers.forEach((container) => {
            container.innerHTML = errorMessage;
            });
        }
}
// Function to fetch and display authors end

// Function to add authors start
async function handleAuthorSubmission(event) {
    event.preventDefault();
    const name = document.getElementById("authorName").value;
    const email = document.getElementById("authorEmail").value;

    console.log("Submitting author:", { name, email });

    try {
        const response = await fetch("assets/includes/addauthor.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `authorName=${encodeURIComponent(name)}&authorEmail=${encodeURIComponent(email)}`,
        });

        const result = await response.json();

        if (response.ok) {
        fetchAndDisplayAuthors();
        event.target.reset();
        authorForm.classList.remove("active")
        } else {
        throw new Error(result.error || "Failed to add author");
        }
    } catch (error) {
        console.error("Error adding author:", error);
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
        authorSelect.length = 1;
    
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

// Function to fetch and display packages start
async function fetchAndDisplayPackages() {
    try {
        const versionsResponse = await fetch("assets/includes/getversions.php");
        const versions = await versionsResponse.json();
    
        const latestVersions = {};
        versions.forEach(version => {
            const packageId = version.package_id;
            
            if (!latestVersions[packageId]) {
                latestVersions[packageId] = version;
            } else {
                const currentLatest = latestVersions[packageId].version_number;
                const newVersion = version.version_number;
        
                if (compareVersions(currentLatest, newVersion) < 0) {
                latestVersions[packageId] = version;
                }
            }
        });
    
        const response = await fetch("assets/includes/getpackages.php");
        const packages = await response.json();
    
        const packagesContainer = document.getElementById("packagesListContainer");
        packagesContainer.classList.add("flex","gap-10","flex-wrap")
        packagesContainer.innerHTML = ""; 
    
        packages.forEach((pkg) => {
            const latestVersion = latestVersions[pkg.package_id];
            
            const packageElement = document.createElement("div");
            packageElement.classList.add("package-item", "bg-gray-700", "rounded", "p-4", "mb-4");
            packageElement.innerHTML = `
                <h4 class="font-bold text-white">${pkg.name}</h4>
                <p class="text-gray-300">${pkg.description}</p>
                <p class="text-sm text-gray-400">Author: ${pkg.author_name}</p>
                <p class="text-sm text-gray-400">Version: ${latestVersion ? latestVersion.version_number : '1.0.0'}</p>
                <p class="text-xs text-gray-500">Created: ${pkg.creation_date}</p>
            `;
            packagesContainer.appendChild(packageElement);
            });
        } catch (error) {
            console.error("Error fetching packages:", error);
        }
}
// Function to fetch and display packages end

// Function to handle package submission start
async function handlePackageSubmission(event) {
    event.preventDefault();

    const packageName = document.getElementById("packageName").value;
    const packageDescription = document.getElementById("packageDescription").value;
    const authorId = document.getElementById("authorId").value;

    try {
        const response = await fetch("assets/includes/addpackage.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `packageName=${encodeURIComponent(packageName)}&packageDescription=${encodeURIComponent(
            packageDescription
        )}&authorId=${encodeURIComponent(authorId)}`,
        });

        const result = await response.json();

        if (response.ok) {
        fetchAndDisplayPackages();
        event.target.reset();
        packageForm.classList.remove("active")
        } else {
        throw new Error(result.error || "Failed to add package");
        }
    } catch (error) {
        console.error("Error adding package:", error);
        alert("Failed to add package. Please try again.");
    }
}
// Function to handle package submission end

//Function to populate the packages in version form start
async function fetchAndPopulatePackages() {
    try {
        const response = await fetch("assets/includes/getpackages.php");
        const packages = await response.json();
    
        const packageSelect = document.getElementById("packageId");
        // Clear existing options except the first one
        packageSelect.length = 1;
    
        // Populate dropdown with packages
        packages.forEach((pkg) => {
            const option = document.createElement("option");
            option.value = pkg.package_id;
            option.textContent = pkg.name;
            packageSelect.appendChild(option);
            });
    } catch (error) {
        console.error("Error fetching packages:", error);
    }
}
//Function to populate the packages in version form end

// Function to handle version submission start
async function handleVersionSubmission(event) {
    event.preventDefault();

    const packageId = document.getElementById("packageId").value;
    const versionNumber = document.getElementById("versionNumber").value;
    const versionChangelog = document.getElementById("versionChangelog").value;

    try {
        const response = await fetch("assets/includes/addversion.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `packageId=${encodeURIComponent(packageId)}&versionNumber=${encodeURIComponent(
            versionNumber
        )}&versionChangelog=${encodeURIComponent(versionChangelog)}`,
        });

        const result = await response.json();

        if (response.ok) {
        fetchAndDisplayVersions();
        fetchAndDisplayPackages();
        event.target.reset();
        versionForm.classList.remove("active");
        } else {
        throw new Error(result.error || "Failed to add version");
        }
    } catch (error) {
        console.error("Error adding version:", error);
        alert("Failed to add version. Please try again.");
    }
}
// Function to handle version submission end

// Function to fetch and display versions start
async function fetchAndDisplayVersions() {
    try {
        const response = await fetch("assets/includes/getversions.php");
        const versions = await response.json();
    
        const versionsListContainer = document.getElementById("versionsListContainer");
        versionsListContainer.classList.add("flex", "gap-10", "flex-wrap");
        versionsListContainer.innerHTML = ""; 
    
        const versionsByPackage = {};
        versions.forEach(version => {
            if (!versionsByPackage[version.package_id]) {
                versionsByPackage[version.package_id] = [];
            }
            versionsByPackage[version.package_id].push(version);
            });
        
            const packageElements = document.querySelectorAll(".package-item");
            packageElements.forEach(pkgElement => {
            const packageNameElement = pkgElement.querySelector("h4");
            const versionElement = pkgElement.querySelector("p:nth-child(4)");
            
            if (packageNameElement && versionElement) {
                const packageName = packageNameElement.textContent;
                const packageId = Object.keys(versionsByPackage).find(key => 
                versions.find(v => v.package_name === packageName && v.package_id == key)
                );
        
                if (packageId && versionsByPackage[packageId].length > 0) {
                const latestVersion = versionsByPackage[packageId][0];
                versionElement.textContent = `Version: ${latestVersion.version_number}`;
                }
            }
        });
        
        versions.forEach((version) => {
        const versionElement = document.createElement("div");
        versionElement.classList.add("border-2","border-blue-800","p-4","rounded","mb-4","shadow-md");
        versionElement.innerHTML = `
            <div class="flex flex-col">
            <h4 class="text-lg mb-2 font-bold">${version.package_name}</h4>
            <div class="flex justify-between gap-4">
                <p class="text-blue-200">Version: ${version.version_number}</p>
                <p class="text-blue-200">Released: ${version.release_date}</p>
            </div>
            <p class="mt-2 text-gray-300">Changelog: ${version.changelog}</p>
            </div>
        `;
        versionsListContainer.appendChild(versionElement);
        });
    } catch (error) {
        console.error("Error fetching versions:", error);
        const versionsListContainer = document.getElementById("versionsListContainer");
        versionsListContainer.innerHTML = `
        <div class="bg-red-800 p-4 rounded-lg text-white">
            Failed to load versions. Error: ${error.message}
        </div>
        `;
    }
}
// Function to fetch and display versions end

// Function to compare versions start
function compareVersions(a, b) {
    const parseVersion = (version) => {
        return version.split('.').map(Number);
    };

    const versionA = parseVersion(a);
    const versionB = parseVersion(b);

    for (let i = 0; i < Math.max(versionA.length, versionB.length); i++) {
        const numA = versionA[i] || 0;
        const numB = versionB[i] || 0;

        if (numA > numB) return 1;
        if (numA < numB) return -1;
    }

    return 0;
}
// Function to compare versions end

// Add event listeners to form submissions start
document.querySelector("#packageForm form").addEventListener("submit", handlePackageSubmission);
document.querySelector("#versionForm form").addEventListener("submit", handleVersionSubmission);
document.querySelector("#authorForm form").addEventListener("submit", handleAuthorSubmission);
// Add event listeners to form submissions end

// Functions to start on load start
document.addEventListener("DOMContentLoaded", () => {
    fetchAndDisplayPackages();
    fetchAndPopulatePackages();
    fetchAndDisplayVersions();
    fetchAndPopulateAuthors();
    fetchAndDisplayAuthors();
});
// Functions to start on load end