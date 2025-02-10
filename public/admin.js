const client = new Appwrite.Client()
    .setEndpoint(config.APPWRITE_ENDPOINT)
    .setProject(config.APPWRITE_PROJECT_ID);

const databases = new Appwrite.Databases(client);

// Function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString();
}

// Function to delete a submission
async function deleteSubmission(documentId) {
    try {
        await databases.deleteDocument(
            config.APPWRITE_DATABASE_ID,
            config.APPWRITE_COLLECTION_ID,
            documentId
        );
        // Refresh the table after deletion
        fetchSubmissions();
    } catch (error) {
        console.error('Error deleting submission:', error);
        alert('Failed to delete submission');
    }
}

// Function to create table rows from submissions
function createTableRows(submissions) {
    const tableBody = document.getElementById('submissionsTable');
    tableBody.innerHTML = '';

    submissions.forEach(submission => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">${submission.name}</td>
            <td class="px-6 py-4 whitespace-nowrap">${submission.email}</td>
            <td class="px-6 py-4">${submission.message}</td>
            <td class="px-6 py-4 whitespace-nowrap">${formatDate(submission.timestamp)}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <button 
                    onclick="deleteSubmission('${submission.$id}')"
                    class="text-red-600 hover:text-red-900"
                >
                    Delete
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to fetch all submissions
async function fetchSubmissions() {
    try {
        const response = await databases.listDocuments(
            config.APPWRITE_DATABASE_ID,
            config.APPWRITE_COLLECTION_ID
        );
        
        createTableRows(response.documents);
    } catch (error) {
        console.error('Error fetching submissions:', error);
        alert('Failed to fetch submissions');
    }
}

// Initial fetch when page loads
fetchSubmissions();