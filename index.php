<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="an application dedicated to manage and organize the javascript packages" />
        <meta name="keywords" content="javascript, organizer, packages" />
        <meta name="author" content="Ibrahim Nidam" />

        <title>Javacript Package Manager</title>

        <!-- <link rel="stylesheet" href="assets/css/tailwind/output.css" /> -->
        <link rel="stylesheet" href="assets/css/styles.css">
        <link rel="icon" href="assets/images/Favicon/javascript-js-seeklogo.svg" type="image/x-icon" />
        <script src="https://cdn.tailwindcss.com" defer></script>
    </head>
    <body class="text-white min-h-screen">
        <div class="container mx-auto py-8 px-4">
            <h1 class="text-4xl font-bold mb-8 text-center text-indigo-400 drop-shadow-lg"> <span class="text-yellow-400"><abbr title="Javacript">JS</abbr></span>Package Manager</h1>
                <div class="bg-gradient-to-b from-gray-900 to-gray-500 rounded shadow-md p-8">
                    <div class="flex space-x-4 mb-6 justify-between">
                        <h2 class="text-2xl font-bold mb-6 text-white underline">Dashboard</h2>
                        <div>
                            <button id="showPackageFormBtn" class="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded transition-colors">
                                Add Package
                            </button>
                            <button id="showAuthorFormBtn" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors">
                                Add Author
                            </button>
                            <button id="showVersionFormBtn" class="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded transition-colors">
                                Add Version
                            </button>
                        </div>
                    </div>
                    <!-- Packages Form -->
                    <div id="packageForm" class="form-container bg-gray-700 rounded mb-6">
                        <h3 class="text-lg font-bold mb-4 text-white">Add Package</h3>
                        <form action="assets/includes/addpackage.php" method="post">
                            <div class="mb-4">
                                <label for="packageName" class="block mb-2">Package Name</label>
                                <input type="text" id="packageName" name="packageName" class="bg-gray-600 rounded px-4 py-2 w-full focus:ring-2 focus:ring-indigo-500" required>
                            </div>
                            <div class="mb-4">
                                <label for="packageDescription" class="block mb-2">Package Description</label>
                                <textarea id="packageDescription" name="packageDescription" class="bg-gray-600 rounded px-4 py-2 w-full focus:ring-2 focus:ring-indigo-500" required></textarea>
                            </div>
                            <select id="authorId" name="authorId" class="bg-gray-600 rounded px-4 py-2 w-full mb-8 focus:ring-2 focus:ring-indigo-500" required>
                                <option value="">Select an author</option>
                            </select>
                            <div class="flex justify-end">
                                <button type="submit" class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors">
                                    Add Package
                                </button>
                            </div>
                        </form>
                    </div>

                    <!-- Authors Form -->
                    <div id="authorForm" class="form-container bg-gray-700 rounded mb-6">
                        <h3 class="text-lg font-bold mb-4 text-white">Add Author</h3>
                        <form action="assets/includes/addauthor.php" method="post">
                            <div class="mb-4">
                                <label for="authorName" class="block mb-2">Author Name</label>
                                <input type="text" id="authorName" name="authorName" class="bg-gray-600 rounded px-4 py-2 w-full focus:ring-2 focus:ring-indigo-500" required>
                            </div>
                            <div class="mb-4">
                                <label for="authorEmail" class="block mb-2">Author Email</label>
                                <input type="email" id="authorEmail" name="authorEmail" class="bg-gray-600 rounded px-4 py-2 w-full focus:ring-2 focus:ring-indigo-500" required>
                            </div>
                            <div class="flex justify-end">
                                <button type="submit" class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors">
                                    Add Author
                                </button>
                            </div>
                        </form>
                    </div>
                    <!-- Versions Form -->
                    <div id="versionForm" class="form-container bg-gray-700 rounded mb-6">
                        <h3 class="text-lg font-bold mb-4 text-white">Add Version</h3>
                        <form action="assets/includes/addversion.php" method="post">
                            <div class="mb-4">
                                <label for="packageId" class="block mb-2">Package</label>
                                <select id="packageId" name="packageId" class="bg-gray-600 rounded px-4 py-2 w-full focus:ring-2 focus:ring-indigo-500" required>
                                    <option value="">Select a package</option>
                                </select>
                            </div>
                            <div class="mb-4">
                                <label for="versionNumber" class="block mb-2">Version Number</label>
                                <input type="text" id="versionNumber" name="versionNumber" class="bg-gray-600 rounded px-4 py-2 w-full focus:ring-2 focus:ring-indigo-500" required>
                            </div>
                            <div class="mb-4">
                                <label for="versionChangelog" class="block mb-2">Changelog</label>
                                <textarea id="versionChangelog" name="versionChangelog" class="bg-gray-600 rounded px-4 py-2 w-full focus:ring-2 focus:ring-indigo-500" required></textarea>
                            </div>
                            <div class="flex justify-end">
                                <button type="submit" class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors">
                                    Add Version
                                </button>
                            </div>
                        </form>
                    </div>
                    <!-- Packages, Authors, and Versions List -->
                    <div>
                        <h3 class="text-lg font-bold mb-4 text-white">All Packages</h3>
                        <div id="packagesListContainer"></div>
                        <h3 class="text-lg font-bold mt-8 mb-4 text-white">All Authors</h3>
                        <div class="authorsListContainer"></div>
                        <h3 class="text-lg font-bold mt-8 mb-4 text-white">All Versions</h3>
                        <div id="versionsListContainer"></div>
                    </div>
                </div>
            
        </div>
        <script src="assets/js/global.js"></script>
    </body>
</html>