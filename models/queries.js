const request = require('./dbcon');

// All Queries

// Queries the input parameters too see if an employee exists and 
// returns either (an object with the id that was found) or (an empty object if no employee was found)
exports.employeeExists = async (employeeDetails) => {
  try {
    // employeeDetails = excelObject.yourDetails;
    query = 'SELECT id FROM your_details WHERE (name = \'' + employeeDetails.name +
      '\' AND surname = \'' + employeeDetails.surname +
      '\' AND job_title = \'' + employeeDetails.jobtitle +
      '\' AND team = \'' + employeeDetails.team +
      '\' AND line_manager = \'' + employeeDetails.linemanager + '\');';
    let res = await request.query(query);
    return (res);
  } catch (e) {
    console.log('Error: ' + e);
    return ('Query Failed');
  }
}

// Inserts new Employee's details
exports.insertEmployee = async (employeeDetails) => {
  query = 'INSERT INTO dbo.your_details (name, surname, job_title, team, line_manager)' +
    ' VALUES (\'' + employeeDetails.name + '\', \'' +
    employeeDetails.surname + '\', \'' +
    employeeDetails.jobtitle + '\', \'' +
    employeeDetails.team + '\', \'' +
    employeeDetails.linemanager + '\');';

  console.log(query);

  await request.query(query, function (err, data) {
    if (err)
      console.log(err);
    console.log("inserted");
  });
}

exports.insertEmployeeSkills = async (employeeSkills, tablename, id) => {

  for (i = 0; employeeSkills.stack[i] !== undefined; i++) {
    if (!employeeSkills.rating[i])
      employeeSkills.rating[i] = 0;
    if (!employeeSkills.skill[i])
      employeeSkills.skill[i] = "None";
    query = 'INSERT INTO dbo.' + tablename + ' (stack, skill, rating, employeeId)' +
      ' VALUES (\'' + employeeSkills.stack[i] + '\', \'' +
      employeeSkills.skill[i] + '\', \'' +
      employeeSkills.rating[i] + '\', ' + id.recordset[0].id + ');';

    console.log(query);

    await request.query(query);
    // , (err) => {
    //   if (err)
    //     console.log(err);
    // }
  }
}