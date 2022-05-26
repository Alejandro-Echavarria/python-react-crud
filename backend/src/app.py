from flask import Flask, jsonify, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson.objectid import ObjectId

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost/pythonreact_db'
mongo = PyMongo(app)
CORS(app)

db = mongo.db.users

@app.route('/users', methods = ['POST'])
def createUser():

    id = db.insert_one({
            'name': request.json['name'],
            'email': request.json['email'],
            'password': request.json['password'],
    })

    # return jsonify(str(ObjectId(id)))
    return jsonify(str(id.inserted_id))

@app.route('/users', methods = ['GET'])
def getUsers():
    users = []
    for doc in db.find():
        users.append({
            '_id': str(ObjectId(doc['_id'])),
            'name': doc['name'],
            'email': doc['email'],
            'password': doc['password']
        })

    return jsonify(users)

@app.route('/user/<id>', methods = ['GET'])
def getUser(id):

    user = db.find_one({
        '_id': ObjectId(id)
    })

    response = {
        '_id': str(ObjectId(user['_id'])),
        'name': user['name'],
        'email': user['email'],
        'password': user['password']
    }

    return jsonify(response)

@app.route('/users/<id>', methods = ['DELETE'])
def deleteUser(id):
    
    db.delete_one({'_id': ObjectId(id)})

    return jsonify({'msg': 'User deleted'})

@app.route('/users/<id>', methods = ['PUT'])
def updateUser(id):

    db.update_one({'_id': ObjectId(id)}, {'$set': {

            'name': request.json['name'],
            'email': request.json['email'],
            'password': request.json['password']
        }
    })

    return jsonify({'msg': 'User updated'})

if __name__ == "__main__":
    app.run(debug=True)