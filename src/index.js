const url = 'http://localhost:3000'
let currentUser

const navbar = document.querySelector("nav")
const mainContainer = document.querySelector('#main-container')

function renderSignUp() {
    mainContainer.innerHTML = ''

    const signUpDiv = document.createElement('div')

    signUpDiv.innerHTML = `
    <div class="card w-50 m-auto mt-5 p-3 text-center sign-up-form">
        <form id="sign-up-form">
            <div class="card-title">
                <h2>Sign Up</h2>
            </div>

            <hr>

            <div class="form-row">
                <div class="form-group col-md-6">
                    <input type="text" name="first_name" placeholder="First Name" class="form-control">
                </div>
                <div class="form-group col-md-6">
                    <input type="text" name="last_name" placeholder="Last Name" class="form-control">
                </div>
            </div>

            <div class="form-row">
                <div class="input-group col-md-12">
                    <input type="text" name="username" placeholder="Username" class="form-control">
                </div>
            </div>

            <br>

            <div class="d-grid gap-2 col-6 mx-auto">
                <input type="submit" name="submit" value="Create Account" class="btn btn-primary sign-up">
            </div>
        </form>
    </div>
    `

    mainContainer.append(signUpDiv)
}

function renderLogIn() {
    mainContainer.innerHTML = ''

    const loginDiv = document.createElement('div')

    loginDiv.innerHTML = `
    <div class="card w-50 m-auto mt-5 p-3 text-center sign-up-form">
        <form id="log-in-form">
            <div class="card-title">
                <h2>Log In</h2>
            </div>

            <hr>

            <div class="input-group">
                <input type="text" name="username" placeholder="Username" class="form-control">
            </div>

            <br>

            <div class="d-grid gap-2 col-6 mx-auto">
                <input type="submit" name="submit" value="Log In" class="btn btn-primary sign-up">
            </div>
        </form>
    </div>
    `

    mainContainer.append(loginDiv)
}

function loginUser(userObj) {
    currentUser = userObj
    console.log(currentUser)

    navbar.innerHTML = ''

    const navDiv = document.createElement('div')
    navDiv.className = 'navbar navbar-icon-top navbar-expand-lg navbar-dark bg-navbar'

    navDiv.innerHTML = `
    <a class="navbar-brand ms-5" href="#">
        <img class="navbar-brand" src='./assets/images/bankroll-tracker-logo-2.png' href="#" style="width: 60px;">
        <span class="ms-1 align-middle">Bankroll Tracker</span>
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item">
                <a class="nav-link nav-home">
                    <i class="fa fa-home nav-home"></i>
                    Home
                </a>
            </li>
        </ul>
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link nav-account">
                    <i class="fa fa-user nav-account">
                    </i>
                    Account
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link nav-sign-out">
                    <i class="fa fa-sign-out nav-sign-out"></i>
                    Sign Out
                </a>
            </li>
        </ul>
        <!-- <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form> -->
    </nav>
    `
    navbar.append(navDiv)

    renderHome()
}

function renderHome() {
    mainContainer.innerHTML = ''

    const homeDiv = document.createElement('div')
    homeDiv.className = 'container'
    homeDiv.setAttribute('id', 'home-div')

    homeDiv.innerHTML = `
    <div class="row">
        <div class="col-lg-4">
            <h1 class="welcome-header">Welcome back, ${currentUser.first_name}!</h1>
            <hr class="hr-home">
            <br>
            <p class="welcome-header-desc">
                <em><b>View your past session history to the right, or log a new session below.</b></em>
            </p>
            <button class="sign-up btn btn-primary" id="new-session-button">Add Session</button>
            
        
        </div>

        <canvas class="col-lg-8 id="graph-div">
        </canvas>
    </div>
    <br><br>
    <table class="table table-striped table-bordered table-dark">
        <thead id="sessions-table-head">
            <tr>
                <th scope="col">Session #</th>
                <th scope="col">Location</th>
                <th scope="col">Stakes</th>
                <th scope="col">Buy In</th>
                <th scope="col">Out For</th>
                <th scope="col">Profit</th>
                <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody id="sessions-table-body">
        </tbody>
    </table>
    `

    mainContainer.append(homeDiv)
    renderOverallGraph()
    renderTable()
}

/* <br><br><br><br>
            <p class="welcome-header-desc">
                <em><b>Click the buttons below to filter the data by their corresponding attributes.</b></em>
            </p>
<div id="graph-filter" class="btn-group btn-group-lg btn-group-toggle" data-toggle="buttons">
                <label class="btn btn-secondary active" id="option1">
                    <input type="radio" name="options" checked> Overall
                </label>
                <label class="btn btn-secondary" id="option2">
                    <input type="radio" name="options"> Stakes
                </label>
                <label class="btn btn-secondary" id="option3">
                    <input type="radio" name="options"> Location
                </label>
            </div> */

function renderTable() {
    fetch(`${url}/overall_user_sessions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: currentUser.username
            })
        })
        .then(r => r.json())
        .then(sessionsArray => {
            const tableBody = document.querySelector("#sessions-table-body")

            let count = 0
            while (count < sessionsArray.length) {
                let data_arr = [
                    count + 1,
                    sessionsArray[count].location,
                    sessionsArray[count].stakes,
                    sessionsArray[count].buy_in,
                    sessionsArray[count].out_for,
                    sessionsArray[count].out_for - sessionsArray[count].buy_in
                ]

                let bodyContents = document.createElement('tr')
                bodyContents.dataset.id = sessionsArray[count].id
                i = 0
                len = data_arr.length
                while (i < len) {
                    tableData = document.createElement('td')
                    tableData.innerHTML = data_arr[i]
                    bodyContents.append(tableData)
                    i += 1
                }
                const editSessionButton = document.createElement('button')
                editSessionButton.classList = 'btn btn-link'
                editSessionButton.setAttribute('id', 'edit-session-button')
                editSessionButton.textContent = 'Edit'
                bodyContents.append(editSessionButton)

                tableBody.append(bodyContents)
                count += 1
            }
        })
}

function renderEditSession(session_id) {
    fetch(`${url}/sessions/${session_id}`)
        .then(r => r.json())
        .then(sessionObj => {
            mainContainer.innerHTML = ''

            const editSessionDiv = document.createElement('div')

            editSessionDiv.innerHTML = `
            <div class="card w-50 m-auto mt-5 p-3 sign-up-form">
                <form id="edit-session-form" data-id="${session_id}">
                    <div class="card-title text-center">
                        <h2>Edit Session</h2>
                    </div>

                    <hr>

                    <div class="form-row">
                        <div class="form-group col-md-8">
                            <label for="game-location">Location</label>
                            <select id="game-location" value="${sessionObj.location}" name="location" class="form-control">
                                <option>Bellagio</option>
                                <option>Venetian</option>
                                <option>Wynn</option>
                                <option>Mirage</option>
                                <option>Borgata</option>
                                <option>Commerce</option>
                                <option>Caesars Palace</option>
                                <option>ARIA</option>
                                <option>Home Game</option>
                                <option>Other Casino</option>
                            </select>
                        </div>

                        <div class="form-group col-md-4">
                            <label for="stakes">Stakes</label>
                            <select id="stakes" value="${sessionObj.stakes}" name="stakes" class="form-control">
                                <option>0.1/0.2</option>
                                <option>0.15/0.3</option>
                                <option>0.25/0.5</option>
                                <option>0.5/1</option>
                                <option>1/2</option>
                                <option>1/3</option>
                                <option>2/4</option>
                                <option>2/5</option>
                                <option>3/5</option>
                                <option>3/6</option>
                                <option>4/8</option>
                                <option>5/10</option>
                                <option>10/20</option>
                                <option>15/30</option>
                                <option>25/50</option>
                                <option>50/100</option>
                                <option>100/200</option>
                                <option>200/400</option>
                                <option>250/500</option>
                                <option>300/600</option>
                                <option>400/800</option>
                                <option>500/1000</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <input type="text" name="buy_in" value="${sessionObj.buy_in}" placeholder="Buy In" class="form-control">
                        </div>

                        <div class="form-group col-md-6">
                            <input type="text" name="out_for" value="${sessionObj.out_for}" placeholder="Out For" class="form-control">
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <input type="submit" name="submit" value="Update" class="btn btn-primary sign-up">
                        </div>

                        <div class="form-group col-md-6">
                            <button id="delete-session-button" data-id="${session_id}" class="btn btn-secondary sign-up">Delete</button>
                        </div>
                    </div>

                    <br>
                </form>
            </div>
            `

            mainContainer.append(editSessionDiv)
        })
}

function renderOverallGraph() {
    graphDiv = document.querySelector("#home-div > div > canvas")
    graphDiv.innerHTML = ''

    fetch(`${url}/overall_user_sessions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: currentUser.username
            })
        })
        .then(r => r.json())
        .then(sessionsArray => {
            function getProfit(sessionObj) {
                return (sessionObj.out_for - sessionObj.buy_in)
            }

            function getCumulativeProfit(arr) {
                const len = arr.length
                let count = 0
                let cumulativeProfit = 0
                let final = [0]
                while (count < len) {
                    cumulativeProfit += arr[count]
                    final.push(cumulativeProfit)
                    count += 1
                }
                return final
            }

            const dataArr = sessionsArray.map(getProfit)
            const finalDataArr = getCumulativeProfit(dataArr)

            const data = {
                labels: Array.from(Array(sessionsArray.length + 1).keys()),
                datasets: [{
                    label: 'Overall',
                    data: finalDataArr,
                    fill: false,
                    backgroundColor: 'white',
                    borderColor: 'white',
                    tension: 0.1
                }]
            }

            let chart = new Chart(graphDiv, {
                type: 'line',
                data: data,
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Session History',
                            color: 'white'
                        },
                        legend: {
                            labels: {
                                color: 'white'
                            }
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                color: 'white'
                            }
                        },
                        y: {
                            ticks: {
                                color: 'white'
                            }
                        }
                    }
                }
            })
        })
}

function renderNewSession() {
    mainContainer.innerHTML = ''

    const newSessionDiv = document.createElement('div')

    newSessionDiv.innerHTML = `
    <div class="card w-50 m-auto mt-5 p-3 sign-up-form">
        <form id="new-session-form">
            <div class="card-title text-center">
                <h2>New Session</h2>
            </div>

            <hr>

            <div class="form-row">
                <div class="form-group col-md-8">
                    <label for="game-location">Location</label>
                    <select id="game-location" name="location" class="form-control">
                        <option>Bellagio</option>
                        <option>Venetian</option>
                        <option>Wynn</option>
                        <option>Mirage</option>
                        <option>Borgata</option>
                        <option>Commerce</option>
                        <option>Caesars Palace</option>
                        <option>ARIA</option>
                        <option>Home Game</option>
                        <option>Other Casino</option>
                    </select>
                </div>

                <div class="form-group col-md-4">
                    <label for="stakes">Stakes</label>
                    <select id="stakes" name="stakes" class="form-control">
                        <option>0.1/0.2</option>
                        <option>0.15/0.3</option>
                        <option>0.25/0.5</option>
                        <option>0.5/1</option>
                        <option>1/2</option>
                        <option>1/3</option>
                        <option>2/4</option>
                        <option>2/5</option>
                        <option>3/5</option>
                        <option>3/6</option>
                        <option>4/8</option>
                        <option>5/10</option>
                        <option>10/20</option>
                        <option>15/30</option>
                        <option>25/50</option>
                        <option>50/100</option>
                        <option>100/200</option>
                        <option>200/400</option>
                        <option>250/500</option>
                        <option>300/600</option>
                        <option>400/800</option>
                        <option>500/1000</option>
                    </select>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group col-md-6">
                    <input type="text" name="buy_in" placeholder="Buy In" class="form-control">
                </div>

                <div class="form-group col-md-6">
                    <input type="text" name="out_for" placeholder="Out For" class="form-control">
                </div>
            </div>

            <div class="d-grid gap-2 text-center mx-auto">
                <input type="submit" name="submit" value="Add Session" class="btn btn-primary sign-up">
            </div>

            <br>
        </form>
    </div>
    `

    mainContainer.append(newSessionDiv)
}

function renderAccount() {
    mainContainer.innerHTML = ''

    const accountPageDiv = document.createElement('div')

    accountPageDiv.innerHTML = `
    <div class="row">
        <div class="col-lg-4">
            <h1 class="welcome-header">Profile</h1>
            <hr class="hr-home">
            <p class="welcome-header-desc">
                <em><b>Below you will find your profile information. You can also edit your profile if you choose.</b></em>
            </p>

            <ul class="list-group">
                <li class="list-group-item list-group-item-dark">First Name: ${currentUser.first_name}</li>
                <li class="list-group-item list-group-item-secondary account-info">Last Name: ${currentUser.last_name}</li>
                <li class="list-group-item list-group-item-dark">Username: ${currentUser.username}</li>
            </ul>

            <br>

            <button class="sign-up btn btn-primary" id="update-user-button">Update Profile</button>
        </div>
        <div class="col-lg-4">
            <h1 class="welcome-header">Statisitcs</h1>
            <hr class="hr-home">
            <p class="welcome-header-desc">Here are some statistics summarizing your activity.</p>
            
            <ul class="list-group">
                <li class="list-group-item list-group-item-dark" id="sessions-played"></li>
                <li class="list-group-item list-group-item-secondary account-info" id="total-profit-loss"></li>
                <li class="list-group-item list-group-item-dark" id="percent-profitability"></li>
            </ul>

        </div>
        <div class="col-lg-4">
            <h1 class="welcome-header">Delete Account</h1>
            <hr class="hr-home">
            <p class="welcome-header-desc">
                <em><b>Click the button below to delete your account.</b></em>
            </p>
            <button class="sign-up btn btn-danger" id="delete-user-button">Delete Account</button>
        </div>

        <canvas class="col-lg-8 id="graph-div">
        </canvas>
    </div>
    `

    mainContainer.append(accountPageDiv)
    renderStatistics()
}

function renderStatistics() {
    fetch(`${url}/statistics/${currentUser.id}`)
        .then(r => r.json())
        .then(stats => {
            const sessionsPlayed = document.getElementById('sessions-played')
            const totalProfitLoss = document.getElementById('total-profit-loss')
            const percentProfitability = document.getElementById('percent-profitability')

            sessionsPlayed.innerHTML = `Number of Sessions Played: ${stats.sessionsPlayed}`
            totalProfitLoss.innerHTML = `Total Profit/Loss: $${stats.totalProfitLoss}`
            percentProfitability.innerHTML = `% of Profitable Sessions: ${stats.percentProfitability}%`
        })
}

function renderUpdateProfile() {
    mainContainer.innerHTML = ''

    const updateProfileDiv = document.createElement('div')

    updateProfileDiv.innerHTML = `
    <div class="card w-50 m-auto mt-5 p-3 text-center sign-up-form">
        <form id="update-profile-form">
            <div class="card-title">
                <h2>Update Profile</h2>
            </div>

            <hr>

            <div class="form-row">
                <div class="form-group col-md-6">
                    <input type="text" name="first_name" placeholder="First Name" value="${currentUser.first_name}" class="form-control">
                </div>
                <div class="form-group col-md-6">
                    <input type="text" name="last_name" placeholder="Last Name" value="${currentUser.last_name}" class="form-control">
                </div>
            </div>

            <div class="form-row">
                <div class="input-group col-md-12">
                    <input type="text" name="username" placeholder="Username" value="${currentUser.username}" class="form-control">
                </div>
            </div>

            <br>

            <div class="d-grid gap-2 col-6 mx-auto">
                <input type="submit" name="submit" class="btn btn-primary sign-up">
            </div>
        </form>
    </div>
    `

    mainContainer.append(updateProfileDiv)
}

navbar.addEventListener('click', event => {
    if (event.target.matches('.nav-sign-up')) {
        renderSignUp()
    } else if (event.target.matches('.nav-log-in')) {
        renderLogIn()
    } else if (event.target.matches('.nav-sign-out')) {
        location.reload()
    } else if (event.target.matches('.nav-home')) {
        renderHome()
    } else if (event.target.matches('.nav-account')) {
        renderAccount()
    }
})

mainContainer.addEventListener('click', event => {
    if (event.target.matches('#get-started-button')) {
        renderSignUp()
    } else if (event.target.matches('#new-session-button')) {
        renderNewSession()
    } else if (event.target.matches('#delete-user-button')) {
        fetch(`${url}/users/${currentUser.id}`, {
                method: 'DELETE'
            })
            .then(r => r.json())
            .then((thingIGetBack) => {
                location.reload()
                alert(thingIGetBack.message)
            })
    } else if (event.target.matches('#update-user-button')) {
        renderUpdateProfile()
    } else if (event.target.matches('#edit-session-button')) {
        let session_id = event.target.closest('tr').dataset.id
        renderEditSession(session_id)
    } else if (event.target.matches('#delete-session-button')) {
        fetch(`${url}/sessions/${event.target.dataset.id}`, {
                method: 'DELETE'
            })
            .then(r => r.json())
            .then((thingIGetBack) => {
                renderHome()
                alert(thingIGetBack.message)
            })
    }
    /* else if (event.target.matches('#option1')) {
           renderOverallGraph()
       } else if (event.target.matches('#option2')) {
           renderStakesGraph()
       } else if (event.target.matches('#option3')) {
           renderLocationGraph()
       } */
})


mainContainer.addEventListener('submit', event => {
    if (event.target.matches('#sign-up-form')) {
        event.preventDefault()
        const form = event.target
        const first_name = form.first_name.value
        const last_name = form.last_name.value
        const username = form.username.value

        fetch(`${url}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    first_name,
                    last_name,
                    username
                })
            })
            .then(r => r.json())
            .then(userObj => {
                if (userObj.id) {
                    loginUser(userObj)
                } else {
                    alert(userObj.error)
                    event.target.reset()
                }
            })
    } else if (event.target.matches('#log-in-form')) {
        event.preventDefault()

        const username = event.target.username.value

        fetch(`${url}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username
                })
            })
            .then(r => r.json())
            .then(userObj => {
                if (userObj.id) {
                    loginUser(userObj)
                } else {
                    alert(userObj.error)
                    event.target.reset()
                }
            })
    } else if (event.target.matches('#new-session-form')) {
        event.preventDefault()

        const location = event.target.location.value
        const stakes = event.target.stakes.value
        const buy_in = event.target.buy_in.value
        const out_for = event.target.out_for.value

        fetch(`${url}/sessions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    location,
                    stakes,
                    buy_in,
                    out_for,
                    username: currentUser.username,
                    user_id: currentUser.id
                })
            })
            .then(r => r.json())
            .then(sessionObj => {
                if (sessionObj.id) {
                    renderHome()
                } else {
                    alert(sessionObj.error)
                    event.target.reset()
                }
            })
    } else if (event.target.matches('#update-profile-form')) {
        event.preventDefault()

        const form = event.target
        const first_name = form.first_name.value
        const last_name = form.last_name.value
        const username = form.username.value

        fetch(`${url}/users/${currentUser.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    first_name,
                    last_name,
                    username
                })
            })
            .then(r => r.json())
            .then(data => {
                currentUser = data
                renderAccount()
            })
    } else if (event.target.matches('#edit-session-form')) {
        event.preventDefault()

        const form = event.target
        const location = form.location.value
        const stakes = form.stakes.value
        const buy_in = form.buy_in.value
        const out_for = form.out_for.value

        fetch(`${url}/sessions/${form.dataset.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    location,
                    stakes,
                    buy_in,
                    out_for
                })
            })
            .then(r => r.json())
            .then(data => {
                console.log(data)
                renderHome()
            })
    }
})