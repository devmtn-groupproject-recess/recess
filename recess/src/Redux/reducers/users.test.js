// Test Register - Blake Lamb (Register Component)
let register = (registerInfo) => {
    for( let key in registerInfo){
        let input = registerInfo[key]
          if (!input){
              return false
          }
      }
    return true
}

let userRegInfo = {
    username: 'b',
    password: 'b',
    user_first_name: 'b',
    user_last_name: 'b',
    user_address: 'b',
    user_city: 'b',
    user_state: 'b',
    user_zip: 78778,
    user_phone: 'b',
    user_img: 'b'
}

test('test the register function ', () => {
    expect(register(userRegInfo)).toBeTruthy
})



//Test Login - Blake Lamb (Login Component)

let login = (username, password) => {
    if(username === 'test8' && password==='1234') {
        return true
    }
    else {
        return false
    }
}

test('test the checkUser Function', () => {
    expect(login('test8', '1234')).toBeTruthy()
})

// Test handleChange - Blake Lamb (login Component)

let event = {
    target: {
        name: 'username',
        value: 'blamb'
    }
}

let handleChange = (event) => {
    const {name, value} = event.target
    return `${name} ${value}`
}

test('test the handle change function', () => {
    expect(handleChange(event)).toBe('username blamb')
})

//Test checkUser - Blake Lamb (Login Component)

let user = {
    username: 'blamb',
    password: 'qwerty'
}

let checkUser = (user) => {
    if(user) {
        return user
    }
    return false
}

test('test the checkUser function', () => {
    expect(checkUser(user)).toBeTruthy()
})