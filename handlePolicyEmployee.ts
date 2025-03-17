interface EmailPolicy {
    EmployeeID: number
    allowSendEmail: boolean
}
// true = checked, false = uncheck
const employees: EmailPolicy[] = [
    { EmployeeID: 1, allowSendEmail: true },
    { EmployeeID: 2, allowSendEmail: true },
    { EmployeeID: 3, allowSendEmail: false },
    { EmployeeID: 4, allowSendEmail: false },
]

let unCheckToCheck: EmailPolicy[] = []
let checkToUncheck: EmailPolicy[] = []

const handlePolicyCheckBox = (isChecked: boolean, employees: EmailPolicy) => {
    // case 1 unchecked to check
    if (isChecked && employees.allowSendEmail) {
        unCheckToCheck.push(employees)
        return
    }
    // case 2 checked to uncheck (when you change back)
    if (isChecked && !employees.allowSendEmail) {
        unCheckToCheck = unCheckToCheck.filter(
            employee => employee.EmployeeID !== employees.EmployeeID
        )
    }

    // case 3 check to uncheck
    if (!isChecked && employees.allowSendEmail) {
        checkToUncheck.push(employees)
        return
    }
    // case 4 uncheck to check (when you change back)
    if (!isChecked && !employees.allowSendEmail) {
        checkToUncheck = checkToUncheck.filter(
            employee => employee.EmployeeID !== employees.EmployeeID
        )
        return
    }
}

const sendToService = (
    unCheckToCheck: EmailPolicy,
    checkToUncheck: EmailPolicy
) => {}
