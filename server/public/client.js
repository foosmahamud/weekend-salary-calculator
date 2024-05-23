console.log('js is sourced!');
let totalMonthly = 0;

function setDefaultTotalMonthly() {
  let span = document.getElementById("total-monthly");
  span.innerHTML = "$0.00";
}

document.addEventListener("DOMContentLoaded", setDefaultTotalMonthly);

function handleSubmit(event) {
  event.preventDefault();
  let firstName = document.getElementById('firstName').value;
  let lastName = document.getElementById('lastName').value;
  let employeeID = document.getElementById('employeeID').value;
  let jobTitle = document.getElementById('jobTitle').value;
  let annualSalary = document.getElementById('annualSalary').value;

  if (!firstName || !lastName || !employeeID || !jobTitle || !annualSalary) {
    alert("Please complete all fields");
    return;
  }

  if (isNaN(annualSalary) || Number(annualSalary) <= 0) {
    alert("Annual Salary must be a positive number");
    return;
  }

  console.log('First name entered:', firstName);
  console.log('Last name entered:', lastName);
  console.log('Employee ID # entered:', employeeID);
  console.log('Job title entered:', jobTitle);
  console.log('Annual salary entered:', annualSalary);

  tableBody.innerHTML += `<tr>
    <td>${firstName}</td>
    <td>${lastName}</td>
    <td>${employeeID}</td>
    <td>${jobTitle}</td>
    <td>$${Number(annualSalary).toLocaleString()}</td>
    <td><button onclick='deleteEmployee(event,${annualSalary})'>Delete</button></td>
    <td></td>
  </tr>`;
//  setup total monthly annual salary!
  totalMonthly += annualSalary / 12;
  console.log("Total monthly:", totalMonthly);

  let span = document.getElementById("total-monthly");
  let footer = document.getElementById("footer");

  span.innerHTML = `$${totalMonthly.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

  document.getElementById("firstName").value = '';
  document.getElementById("lastName").value = '';
  document.getElementById("employeeID").value = '';
  document.getElementById("jobTitle").value = '';
  document.getElementById("annualSalary").value = '';

  if (totalMonthly > 20000) {
    footer.classList.add('over-budget');
  }
}

function deleteEmployee(event, annualSalary) {
  console.log("Employee deleted.");
  event.target.parentElement.parentElement.remove();
  totalMonthly -= annualSalary / 12;
  let span = document.getElementById("total-monthly");
  span.innerHTML = `$${totalMonthly.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
  let footer = document.getElementById("footer");
  if (totalMonthly > 20000) {
    footer.classList.add('over-budget');
  } else {
    footer.classList.remove('over-budget');
  }
}
