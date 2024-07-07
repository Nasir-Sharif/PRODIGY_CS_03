document.getElementById('password-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const password = document.getElementById('password').value;
    
    fetch('/check_password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: password }),
    })
    .then(response => response.json())
    .then(data => {
        const feedback = document.getElementById('feedback');
        feedback.innerHTML = `
            <p>Length: ${data.strength.length ? '✔️' : '❌'}</p>
            <p>Uppercase: ${data.strength.uppercase ? '✔️' : '❌'}</p>
            <p>Lowercase: ${data.strength.lowercase ? '✔️' : '❌'}</p>
            <p>Numbers: ${data.strength.numbers ? '✔️' : '❌'}</p>
            <p>Special Characters: ${data.strength.special ? '✔️' : '❌'}</p>
            <p>Strength Level: ${data.strength_level} / 5</p>
        `;
    })
    .catch(error => console.error('Error:', error));
});
