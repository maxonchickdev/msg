# GET
curl -X GET http://localhost:3000/users -H 'Content-Type: application/json'

# POST
curl -X POST http://localhost:3000/users -H 'Content-Type: application/json' -d '{"username": "user1", "password": "111"}'

# PUT
curl -X PUT http://localhost:3000/users/1 -H 'Content-Type: application/json' -d '{"username": "new_username1"}'

# PUT
curl -X PUT http://localhost:3000/users/1 -H 'Content-Type: application/json' -d '{"username": "new_username1", "password": "111"}'

# DELETE
curl -X DELETE http://localhost:3000/users/1 -H 'Content-Type: application/json'

# Login
curl -X POST http://localhost:3000/auth/login -d '{"username": "user1", "password": "111"}' -H 'Content-Type: application/json'

# Profile
curl -X GET http://localhost:8080/profile -H 'Content-Type: application/json' -H 'Authorization: Bearer <token>'