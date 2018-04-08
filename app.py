# coding: utf-8
from flask import Flask, request, render_template
from curtain_rc import rc,data_1_read,data_1_write,data_2_read,data_2_write
from control_to import control_0
import json
app = Flask(__name__)

@app.route('/')
def hello():
    data_1 = data_1_read()
#    j_data =  json.loads(data)
    if data_1 != None :
        post_1_read = data_1
    data_2 = data_2_read()
    if data_2 != None :
        post_2_read = data_2_read()
    print post_1_read
    print post_2_read  
#    rc(data['ab'], data['number'], data['op'])
#    return "hello"
    return render_template("mains.html",data_A = post_1_read,data_B = post_2_read)



@app.route('/post_1',methods=['POST'])
def post_1():
    data_2 = request.get_json()
    if data_2 != None :
        data_2_write(data_2)
        d = data_2
    print data_2
    return json.dumps(d)


@app.route('/clrc', methods=['GET','POST'])
def clrc():
    user = {'name':'Dada'}
    data_1 = request.get_json()
#    j_data =  json.loads(data)
    if data_1 != None :
        data_1_write(data_1)
        post_1_read = data_1
    else:    
      post_1_read = data_1_read()
    data_2 = data_2_read()
    if data_2 != None :
        post_2_read = data_2_read()
    print post_1_read
#    print post_2_read
#    rc(data['ab'], data['number'], data['op'])
    d_to = control_0()
    print d_to
    return json.dumps(d_to)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
