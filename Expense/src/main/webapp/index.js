document.addEventListener('DOMContentLoaded', () => {
    const totalAmountInput = document.getElementById('total-amount');
    const totalAmountButton = document.getElementById('total-amount-button');
    const resetBudgetButton = document.createElement('button');
    resetBudgetButton.textContent = "Reset Budget";
    resetBudgetButton.classList.add('submit');
    resetBudgetButton.id = 'reset-budget-button';
    document.body.appendChild(resetBudgetButton);
    
    const checkAmountButton = document.getElementById('check-amount');
    const amount = document.getElementById('amount');
    const expenditureValue = document.getElementById('expenditure-value');
    const balanceAmount = document.getElementById('balance-amount');
    const budgetError = document.getElementById('budget-error');
    const productTitleInput = document.getElementById('product-title');
    const userAmountInput = document.getElementById('user-amount');
    const productTitleError = document.getElementById('product-title-error');
    const listContainer = document.getElementById('list');
    const exceededListContainer = document.getElementById('exceeded-list');

    let totalAmount = 0;
    let expenditure = 0;

    totalAmountButton.addEventListener('click', () => {
        totalAmount = parseFloat(totalAmountInput.value);

        if (isNaN(totalAmount) || totalAmount <= 0) {
            budgetError.classList.remove('hide');
        } else {
            budgetError.classList.add('hide');
            amount.textContent = totalAmount;
            balanceAmount.textContent = totalAmount - expenditure;
            totalAmountButton.disabled = true;
        }
    });

    checkAmountButton.addEventListener('click', () => {
        const productTitle = productTitleInput.value.trim();
        const userAmount = parseFloat(userAmountInput.value);

        if (!productTitle || isNaN(userAmount) || userAmount <= 0) {
            productTitleError.classList.remove('hide');
        } else {
            productTitleError.classList.add('hide');
            const balance = totalAmount - (expenditure + userAmount);

            if (balance < 0) {
                alert('Budget exceeded! Please review your expenses.');
                const exceededItem = document.createElement('div');
                exceededItem.classList.add('expense-item');
                exceededItem.innerHTML = `
                    <p>${productTitle}</p>
                    <p>₹ ${userAmount.toFixed(2)}</p>
                `;
                exceededListContainer.appendChild(exceededItem);
            } else {
                expenditure += userAmount;
                expenditureValue.textContent = expenditure;
                balanceAmount.textContent = balance;
                
                const expenseItem = document.createElement('div');
                expenseItem.classList.add('expense-item');
                expenseItem.innerHTML = `
                    <p>${productTitle}</p>
                    <p>₹${userAmount.toFixed(2)}</p>
                `;
                listContainer.appendChild(expenseItem);
            }

            productTitleInput.value = '';
            userAmountInput.value = '';
        }
    });

    resetBudgetButton.addEventListener('click', () => {
        totalAmount = 0;
        expenditure = 0;
        amount.textContent = '0';
        expenditureValue.textContent = '0';
        balanceAmount.textContent = '0';
        totalAmountInput.value = '';
        productTitleInput.value = '';
        userAmountInput.value = '';
        listContainer.innerHTML = '';
        exceededListContainer.innerHTML = '';
        totalAmountButton.disabled = false;
    });
});
