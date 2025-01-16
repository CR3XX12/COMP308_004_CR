// Student object
const student = {
    studentNumber: "301189137",
    firstName: "Chris",
    lastName: "Rojas",
    programName: "GAME"
};

// Pure function to change program name
const changeProgramName = (student, newProgramName, isImmutable) => {
    if (isImmutable) {
        // Create a new object (immutable)
        return { ...student, programName: newProgramName };
    } else {
        // Modify the original object directly (mutable)
        student.programName = newProgramName;
        return student;
    }
};

// Test the function
const updatedStudentImmutable = changeProgramName(student, "AI", true);
const updatedStudentMutable = changeProgramName(student, "GAME", false);

// Log the results
console.log("Original student object:", student); // Will show updated if mutable
console.log("Immutable update result:", updatedStudentImmutable);
console.log("Mutable update result:", updatedStudentMutable);


const programNames = ["GAME", "G-P", "AI", "SOFT"];

// Transform the program names
const updatedProgramNames = programNames.map((program) => `${program} Program`);

// Output the results
console.log(updatedProgramNames.join("\n")); 
console.log(programNames.join("\n")); 

