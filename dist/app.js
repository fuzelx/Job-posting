import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAHO8xw9AWlymzqoB8YSdpWR2Pwh1MGmJ4",
    authDomain: "job-application-2018b.firebaseapp.com",
    databaseURL: "https://job-application-2018b-default-rtdb.firebaseio.com",
    projectId: "job-application-2018b",
    storageBucket: "job-application-2018b.appspot.com",
    messagingSenderId: "58460405113",
    appId: "1:58460405113:web:c157552ab2461e2eca03a8",
    measurementId: "G-K55D8ZGRYB"
  };

const app = initializeApp(firebaseConfig);

// Get a reference to the Realtime Database service
const database = getDatabase(app);

// Get a reference to the Firebase Storage service
const storage = getStorage(app);

// Handle form submission
const form = document.getElementById('jobApplicationForm');
form.addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form values
    const name = form.name.value;
    const education = form.education.value;
    const skills = form.skills.value;
    const percentage = form.percentage.value;
    const currentJobSalary = form.currentJobSalary.value;
    const expectedSalary = form.expectedSalary.value;
    const jobPosition = form.jobPosition.value;
    const city = form.city.value;
    const universityName = form.universityName.value;

    // Get the selected file
    const file = document.getElementById('resume').files[0];

    // Check if a file is selected
    if (!file) {
        alert('Please select a resume file.');
        return;
    }

    try {
        // Create a storage reference
        const fileRef = storageRef(storage, `resumes/${file.name}`);

        // Upload file to Firebase Storage
        await uploadBytes(fileRef, file);

        // Get the download URL for the uploaded file
        const downloadURL = await getDownloadURL(fileRef);

        // Save data to the Realtime Database
        await set(ref(database, `applications/${name}`), {
            name: name,
            education: education,
            skills: skills,
            percentage: percentage,
            currentJobSalary: currentJobSalary,
            expectedSalary: expectedSalary,
            jobPosition: jobPosition,
            city: city,
            universityName: universityName,
            resumeURL: downloadURL
        });

        console.log('Data saved successfully');
        alert('Application submitted successfully!');
        form.reset(); // Reset form after submission
    } catch (error) {
        console.error('Error submitting application: ', error);
        alert('Error submitting application. Please try again later.');
    }
});
