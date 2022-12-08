function classifier(input) {
  const output = {}
  const newArr = [...input]; //copy the array
  //Check if array is empty
  if (newArr.length == 0) {
  output.noOfGroups = 0
  return output;
  }
  //Check if input is an array
  if (!Array.isArray(input)) {
  throw Error
  }
  //Convert student timestamp to age
  const newArr2 = newArr.map((student) => {
  let currentYear = 2019;
  let studentBirthYear = new Date(student.dob).getFullYear();
  student.age = currentYear - studentBirthYear;
  return student
  })
  //Sort array by age in ascending order
  newArr2.sort((a, b)=> {
  let keyA = a.age
  let keyB = b.age
  if(keyA < keyB) return -1;
  if (keyA > keyB) return 1;
  })
  // push each student into the member array starting with the smallest age
  const mainArr = [];
  let members = [];
  members.push(newArr2[0])
  //Set condition for grouping
  for (let i = 1; i < newArr2.length; i++) {
  if (newArr2[i].age - members[0].age <= 5 && members.length < 3) {
  members.push(newArr2[i])
  } else {
  mainArr.push(members);
  members = [];
  members.push(newArr2[i]);
  }
  }
  if (members.length) {
  mainArr.push(members)
  }
  output.noOfGroups = mainArr.length
  for (let i = 0; i < mainArr.length; i++) {
  let groupName = `group${i + 1}`
  //Group the array based on specifications given.
  output[groupName] = {
  members: mainArr[i],
  oldest: mainArr[i][mainArr[i].length - 1].age,
  sum: mainArr[i].reduce((acc, curr) => acc += curr.age, 0),
  regNos: mainArr[i].map(student => {
  return parseInt(student.regNo);
  }).sort((a, b) => a - b),
  }
  }
  return output
  }
  export default classifier;
