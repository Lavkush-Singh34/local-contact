const client = new Appwrite.Client()
    .setEndpoint(config.APPWRITE_ENDPOINT)
    .setProject(config.APPWRITE_PROJECT_ID);

const databases = new Appwrite.Databases(client);

document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    try {
        const response = await databases.createDocument(
            config.APPWRITE_DATABASE_ID,
            config.APPWRITE_COLLECTION_ID,
            Appwrite.ID.unique(),
            {
                name: name,
                email: email,
                message: message,
                timestamp: new Date().toISOString()
            }
        );
        
        alert('Message sent successfully!');
        document.getElementById('contactForm').reset();
        
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to send message. Please try again.');
    }
});