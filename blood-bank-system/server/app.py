from flask import json, Flask, request, jsonify, session
import mysql.connector
import os 
import random
import string
from twilio.rest import Client
from dotenv import load_dotenv
from os.path import join, dirname
from datetime import date


app = Flask(__name__)
app.secret_key = "Vilas"

dotenv_path = join(dirname(__file__), ".env")
load_dotenv(dotenv_path)

ACC_SID = os.environ.get("ACC_SID")
AUTH_TOKEN = os.environ.get("AUTH_TOKEN")
TWILIO_NUMBER = os.environ.get("TWILIO_NUMBER")

DB_PASS = os.environ.get("DB_PASS")
DB_NAME = os.environ.get("DB_NAME")

#********************* MySQL Connection ***********************
conn = mysql.connector.connect( 
    host="localhost",
    user="root",
    password=DB_PASS,
    database=DB_NAME
)
cursor = conn.cursor()
 

#***************** Func to Create Random Password *************
def generatePassword():
    password = ''.join(random.choices(string.ascii_letters, k=7))
    return password


#***************** SEND PASSWORD ON MOBILE NO *****************
def sendPasswordToMobile(password, mobile):
    client = Client(ACC_SID, AUTH_TOKEN)
    msg = "Your Password is " + password
    # print(body)

    #sending message to Phone number
    message = client.messages.create( 
        from_=TWILIO_NUMBER,
        body='hellow i am OK',
        to=mobile
    )
    if message:
        return True
    return False


#********************* Doner Resister **************************
@app.route('/donerResister', methods=['POST'])
def donerResister():
    try:
        data = request.get_json()
        fname = data.get("fname")
        mname = data.get("mname")
        lname = data.get("lname")
        mobile = data.get("mobile")
        gender = data.get("gender")

        age = data.get("age")
        blood = data.get("blood")

        address = data.get("address")
        pincode = data.get("pincode")

        address = address+"-"+pincode
        name = fname+" " + mname
        name = name +" "+lname

        password = generatePassword()
        resDate = str(date.today())
        print(resDate)

        #======= Check if already Mobile no. exists or not
        query = "SELECT Name FROM Doner WHERE Contact_info= %s"
        cursor.execute(query, (mobile,))
        phone = cursor.fetchone()
        if phone:
            return jsonify({"message":"Already Resister Mobile No.", "code":403})

        print("pass")
        #======= If password failed to send to mobile number
        # if not sendPasswordToMobile(password, mobile):
        #     return jsonify({"message":"Internal Server Error", "code":500})

        #======= adding data in database
        query = "INSERT INTO Doner(Doner_id, Name, Age, Gender, Contact_info, Blood_group, Resi_Date, Address, count, password) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        values = (mobile, name, age, gender, mobile, blood, resDate, address, "0", password,)
        print("53")
        cursor.execute(query, values)
        print("12")
        conn.commit()

        return jsonify({"message":"Successful", "code":200})
    
    except Exception as e:
        return jsonify({"message":"Failed", "code":400})


#********************* Lab/Hospital Resister **************************
# @app.route('/labResister', methods=['POST'])
# def labResister():
#     try:
#         data = request.get_json()
#         username = ""
#         name = data.get("name")
#         id = data.get("id")
#         mobile = data.get("mobile")
#         address = data.get("address")
#         pincode = data.get("pincode")
#         address = address+"-"+pincode

#         #======== Finding if Already id is present or not
#         query = "SELECT Name FROM Hospital WHERE Hospital_id= %s"
#         cursor.execute(query, (id,))
#         Name = cursor.fetchone()

#         if Name:
#             return jsonify({"message":"Already id Exist.", "code":403})
        
#         password = generatePassword()

#         #======= If password failed to send to mobile number
#         if not sendPasswordToMobile(password, mobile):
#             return jsonify({"message":"Internal Server Error", "code":500})
            
#         #======= adding data in database.hospital 
#         query = "INSERT INTO Hospital VALUES (%s, %s, %s, %s)"
#         values = (id, name, address, mobile,)
#         cursor.execute(query, values)
#         conn.commit()

#         #======= adding data in database.admin
#         query2 = "INSERT INTO Admin(Hospital_id, username, password) VALUES(%s, %s, %s)"
#         values2 = (id, username, password,)
#         cursor.execute(query2, values2)
#         conn.commit()

#         return jsonify({"message":"Successful", "code":200})

#     except Exception as e:
#         return jsonify({"message":"Failed", "code":400})


# #*********************** Login Handling *********************************
# @app.route("/loginHandling", method=['POST'])
# def loginHandling():
#     try:
#         data = request.get_json()
#         username = data.get("username")
#         password = data.get("password")
#         Type = data.get("Type")

#         if Type == "doner":
#             query = "SELECT * from doner WHERE Doner_id=%s AND password=%d"
#             values = (username, password)
#             cursor.execute(query, values)
#         else:
#             query = "SELECT * from doner WHERE Doner_id=%s AND password=%d"
#             values = (username, password)
#             cursor.execute(query, values)

#         dt = cursor.fetchone()
#         if dt:
#             return jsonify({"message":"Successful", "code":200})

#         return jsonify({"message":"Wrong Credentials", "code":400})
#     except Exception as e:
#         return jsonify({"message":"Failed", "code":402})




@app.route("/")
def home():
   return "Server Runnig.........."



if __name__ == "__main__":
    app.run(debug=True)



