# node_with_mongo_sample_project
A sample application of NodeJs with MongoDB.

## Setup
1. Enter into the project directory after clonning
2. Install dependencies: 
> ``` npm install ```

_Note_: All the dependencies in package.json will be installed, which inturn creates node_modules folder 

3. Run the Server
``` npm start ```
- Application will be listening at localhost:4000

## API Documentation
_Note_: Call from any REST CLIENT application to see the results, i use [POSTMAN](https://www.getpostman.com/downloads/)
1. Create user
> url: http://localhost:4000/user/create </br> method_type: POST </br> content_type: application/json </br>req_body:```{
    "firstName": "Varun",
    "lastName":"kumar",
    "email":"example@gmail.com",
    "mobile":"9849321321",
    "password":"123123"
} ``` </br> </br>
expected_res: ``` {
    "success": true,
    "msg": "User registered",
    "data": {
        "auditFields": {
            "isDeleted": false,
            "createdAt": "2019-09-22T09:08:12.109Z",
            "updatedAt": "2019-09-22T09:08:12.109Z"
        },
        "_id": "5d8739fcd8fba65bfaa05f99",
        "firstName": "Varun",
        "lastName": "kumar",
        "email": "example@gmail.com",
        "mobile": "9849321321"
    }
} ```
2. Get one User
> url: http://localhost:4000/user/getone </br> method_type: POST </br> content_type: application/json </br>req_body:```{
    "email":"sharathvaddireddy@gmail.com"
} ``` </br> </br>
expected_res: ``` {
    "success": true,
    "data": {
        "auditFields": {
            "isDeleted": false,
            "createdAt": "2019-09-22T07:22:42.668Z",
            "updatedAt": "2019-09-22T07:22:42.669Z"
        },
        "_id": "5d872142a7bdd441e29c2e05",
        "firstName": "Sharath",
        "lastName": "Vaddireddy",
        "email": "sharathvaddireddy@gmail.com",
        "mobile": "9849123123"
    }
} ```
3. Get all users
> url: http://localhost:4000/user/getall </br> method_type: GET </br> content_type: application/json </br> </br>
expected_res: ``` {
    "success": true,
    "data": {
    "success": true,
    "data": [
        {
            "auditFields": {
                "isDeleted": false,
                "createdAt": "2019-09-22T07:22:42.668Z",
                "updatedAt": "2019-09-22T07:22:42.669Z"
            },
            "_id": "5d872142a7bdd441e29c2e05",
            "firstName": "Sharath",
            "lastName": "Vaddireddy",
            "email": "sharathvaddireddy@gmail.com",
            "mobile": "9849123123"
        }
    ]
} ```
4. Update a user
> url: http://localhost:4000/user/create </br> method_type: POST </br> content_type: application/json </br>req_body:```{
    "conditions": {
        "email": "example@gmail.com"
    },
    "updateFields": {
    	"firstName":"Varun",
        "lastName":"Kumar",
        "mobile": "0876543325"
    }
}``` </br> </br>
expected_res: ``` {
    "success": true,
    "data": {
        "n": 1,
        "nModified": 1,
        "ok": 1
    }
} ```
5. Delete a user
> url: http://localhost:4000/user/create </br> method_type: GET </br> content_type: application/json </br> </br>
expected_res: ``` {
    "success": true,
    "msg": "No user foud with this email"
} ```

### Happy Coding
