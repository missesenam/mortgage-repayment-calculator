// radio button background an border color

document.addEventListener("DOMContentLoaded", function () {
    const labels = document.querySelectorAll(".mortgage-type label");

    labels.forEach((label) => {
        const input = label.querySelector("input[type='radio']");
        
        input.addEventListener("click", function () {
            labels.forEach((lbl) => lbl.classList.remove("selected"));
            
            if (input.checked) {
                label.classList.add("selected");
            }
        });
    });
});

// calcule functions

function calculateRepayment() {
    // Get form input values
    const mortgageAmount = parseFloat(document.getElementById("mortgage-amount").value);
    const mortgageTerm = parseFloat(document.getElementById("mortgage-term").value);
    const interestRate = parseFloat(document.getElementById("interest-rate").value) / 100;
    const mortgageType = document.querySelector('input[name="mortgage-type"]:checked');
    const errorMessage = document.querySelectorAll('.error-message')

    // Validate inputs
    if (isNaN(mortgageAmount) || isNaN(mortgageTerm) || isNaN(interestRate) || !mortgageType) {
        // alert("Please fill out all fields correctly.");
        document.getElementById("mortgage-amount").parentNode.classList.add('error');
        document.getElementById("mortgage-term").parentNode.classList.add('error');
        document.getElementById("interest-rate").parentNode.classList.add('error');
        Array.from(errorMessage).forEach(message => {
            message.style.display = 'block';
        });
        return;
    }

    let monthlyRepayment = 0;
    let totalRepayment = 0;

    if (mortgageType.value === "repayment") {
        // Calculate monthly repayment for a repayment mortgage
        const monthlyRate = interestRate / 12;
        const numberOfPayments = mortgageTerm * 12;

        // Formula for calculating monthly repayment
        monthlyRepayment = mortgageAmount * monthlyRate / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
        totalRepayment = monthlyRepayment * numberOfPayments;

    } else if (mortgageType.value === "interest-only") {
        // Calculate monthly interest-only payment
        monthlyRepayment = mortgageAmount * (interestRate / 12);
        totalRepayment = monthlyRepayment * mortgageTerm * 12;
    }

    // Update the results in the HTML
    document.getElementById("monthly-repayment").textContent = `£${monthlyRepayment.toFixed(2)}`;
    document.getElementById("total-repayment").textContent = `£${totalRepayment.toFixed(2)}`;
}

// Clear all fields
document.querySelector(".clear-btn").addEventListener("click", function() {
    document.getElementById("mortgage-form").reset();
    document.getElementById("monthly-repayment").textContent = "£0.00";
    document.getElementById("total-repayment").textContent = "£0.00";
});
