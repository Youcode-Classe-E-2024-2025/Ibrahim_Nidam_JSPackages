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

