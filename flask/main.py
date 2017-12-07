from flask import Flask, url_for
from flask import request
from flask import json
from flask import Response
from flask import jsonify
from flaskext.mysql import MySQL
from datetime import datetime

mysql = MySQL()
app = Flask(__name__)
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = '55385823'
app.config['MYSQL_DATABASE_DB'] = 'DisasterDB'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)

app = Flask(__name__)

@app.errorhandler(404)
def not_found(error=None):
    message = {
            'status': 404,
            'message': 'Not Found: ' + request.url,
    }
    resp = jsonify(message)
    resp.status_code = 404

    return resp


@app.route('/')
def api_root():
    return 'Welcome'


@app.route('/api/login', methods = ['POST'])
def api_login():
    if request.headers['Content-Type'] == 'application/json':
        json_to_python = json.loads(json.dumps(request.json))
        print type(json_to_python)
        username = json_to_python['username']
        password = json_to_python['password']

        cursor = mysql.connect().cursor()
        cursor.execute("SELECT * from users where username='" + username + "' and password='" + password + "'")
        data = cursor.fetchone()
        print data
        if data is None:
            t = {
                'status' : False
            }
            return jsonify(t)
        else:
            t = {
                'status' : True,
                'id' : data[0],
                'username': data[1]
            }
            return jsonify(t)
    else:
        return "Data type is wrong"

@app.route('/api/register', methods = ['POST'])
def api_register():
    if request.headers['Content-Type'] == 'application/json':
        json_to_python = json.loads(json.dumps(request.json))
        print json_to_python
        username = json_to_python['username']
        password = json_to_python['password']

        db = mysql.connect()
        cursor1 = db.cursor()
        cursor1.execute("INSERT INTO users (username, password) VALUES ('"+str(username)+"', '"+str(password)+"')")
        db.commit()
        cursor2 = db.cursor()
        cursor2.execute("SELECT * from users where username='" + str(username) + "' and password='" + str(password) + "'")
        data = cursor2.fetchone()
        print data

        t = {
            'status' : True,
            'username': username,
            'id': data[0]
        }
        return jsonify(t)

@app.route('/api/add/human', methods = ['POST'])
def api_add_human():
    if request.headers['Content-Type'] == 'application/json':
        json_to_python = json.loads(json.dumps(request.json))
        print json_to_python
        userid = json_to_python['userid']
        firstname = json_to_python['firstname']
        lastname = json_to_python['lastname']
        gender = json_to_python['gender']
        birthdate = json_to_python['birthdate']
        birthdate2 = datetime.strptime(birthdate[:-14], "%Y-%m-%d")
        phone = json_to_python['phone']
        health = json_to_python['health']

        db = mysql.connect()
        cursor1 = db.cursor()
        cursor1.execute("INSERT INTO humans (userid, firstname, lastname, gender, birthdate, phone, health ) VALUES ('"+str(userid)+"', '"+str(firstname)+"', '"+str(lastname)+"', '"+str(gender)+"', '"+str(birthdate2)+"', '"+str(phone)+"', '"+str(health)+"')")
        db.commit()

        t = {
            'status' : True
        }
        return jsonify(t)

@app.route('/api/get/human', methods = ['GET'])
def api_human():
    cursor = mysql.connect().cursor()
    cursor.execute("SELECT * from humans")
    data = cursor.fetchall()
    return jsonify(data)

@app.route('/api/get/travel', methods = ['GET'])
def api_travel():
    cursor = mysql.connect().cursor()
    cursor.execute("SELECT * from traveltips")
    data = cursor.fetchall()
    return jsonify(data)

@app.route('/api/get/travel/<userid>', methods = ['GET'])
def api_user_travel(userid):
    cursor = mysql.connect().cursor()
    cursor.execute("SELECT * from user_traveltips WHERE userid = '"+str(userid)+"'")
    data = cursor.fetchall()
    return jsonify(data)

@app.route('/api/get/food', methods = ['GET'])
def api_food():
    cursor = mysql.connect().cursor()
    cursor.execute("SELECT * from food")
    data = cursor.fetchall()
    return jsonify(data)

@app.route('/api/get/food/<userid>', methods = ['GET'])
def api_user_food(userid):
    cursor = mysql.connect().cursor()
    cursor.execute("SELECT * from user_food WHERE userid = '"+str(userid)+"'")
    data = cursor.fetchall()
    return jsonify(data)

@app.route("/authenticate")
def authenticate():
    username = request.args.get('UserName')
    password = request.args.get('Password')
    cursor = mysql.connect().cursor()
    cursor.execute("SELECT * from User where Username='" + username + "' and Password='" + password + "'")
    data = cursor.fetchone()
    if data is None:
     return "Username or Password is wrong"
    else:
     return "Logged in successfully"

@app.route('/articles')
def api_articles():
    return 'List of ' + url_for('api_articles')

@app.route('/articles/<int:articleid>')
def api_article(articleid):
    return 'You are reading ' + articleid

@app.route('/api/hello', methods = ['GET'])
def api_hello():
    data = {
        'hello'  : 'world',
        'number' : 3
    }
    js = json.dumps(data)

    resp = Response(js, status=200, mimetype='application/json')
    #resp.headers['Link'] = 'http://luisrei.com'

    return resp


@app.route('/messages', methods = ['POST'])
def api_message():

    if request.headers['Content-Type'] == 'text/plain':
        return "Text Message: " + request.data

    elif request.headers['Content-Type'] == 'application/json':
        return "JSON Message: " + json.dumps(request.json)

    elif request.headers['Content-Type'] == 'application/octet-stream':
        f = open('./binary', 'wb')
        f.write(request.data)
        f.close()
        return "Binary message written!"

    else:
        return "415 Unsupported Media Type ;)"

@app.route('/users/<userid>', methods = ['GET'])
def api_users(userid):
    users = {'1':'john', '2':'steve', '3':'bill'}

    if userid in users:
        return jsonify({userid:users[userid]})
    else:
        return not_found()


if __name__ == '__main__':
    app.run()
