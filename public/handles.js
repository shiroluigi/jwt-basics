document.getElementById('sub').addEventListener('click', async () => {
    const res = await fetch('/api/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: document.getElementById('uname').value,
            password: document.getElementById('pass').value
        })
    })
    document.getElementById('uname').value = ''
    document.getElementById('pass').value = ''
    const body = await res.json()
    // console.log(body)
    document.cookie = "token=" + body.token + ";SameSite=None;Secure"
    document.cookie = "dummy=dummy;SameSite=None;Secure"
    if (res.status != 200) {
        console.log("error server side")
    }
})


document.getElementById('getData').addEventListener('click', async () => {
    let val = ''
    let cookies = document.cookie.split(';')
    // console.log(cookies)
    for (let i = 0; i < cookies.length; i++) {
        let [tag, value] = cookies[i].split('=')
        tag = tag.trim()
        // console.log(tag)
        if (tag === 'token') {
            val = value
            break
        }
    }
    // console.log(val)
    if (val != '') {
        try {
            const res = await fetch('/api/dashboard', {
                method: "GET",
                headers: {
                    "authorization": 'Bearer' + ' ' + val
                }
            })
            // console.log(res)
            if (res.status == 200) {
                const r = await res.json()
                document.getElementById('tokenDisplay').textContent = "Token Present"
                document.getElementById('output').textContent = r.msg
                // console.log(r)
            }
        } catch (error) {
            console.log(error)
        }
    }
})