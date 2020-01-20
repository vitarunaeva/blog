(()=> {
    const btn = document.querySelector('.create-user__btn');
    const form = document.querySelector('.create-user');
    const status = document.querySelector('.create-user__status');

    if (!btn && !form && !status) {
        return;
    }

    form.addEventListener('submit', (evt) => {
        evt.preventDefault();

        const login = form.querySelector('#login').value;
        const password = form.querySelector('#password').value;
        const url = '/create-user';

        const postData = {
            login,
            password
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        })
            .then(res => res.json())
            .then((res) => {
                if (res._id) {
                    window.location.href = "/login"
                } else {
                    status.textContent = res
                }
            })
            .catch((err)=>{
                status.textContent = err;
            });
    })

})();
