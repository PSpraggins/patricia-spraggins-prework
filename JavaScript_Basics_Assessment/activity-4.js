const studentNames = ["Lisa", "Billy", "Mary"];

for(let i = 0; i < 3; i++) {
    studentNames.push(prompt('What is the next student name?'));
}

for(let i = 0; i < studentNames.length; i++){
    console.log(studentNames[i]);
}