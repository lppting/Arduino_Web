# coding: utf-8
from flask import Flask, request, render_template
from curtain_rc import rc,data_1_read,data_1_write,data_2_read,data_2_write
from control_to import control_0,status_write,status_read
from LZ5_read import main,title,reader
import json
app = Flask(__name__)

@app.route('/js_show',methods=["GET","POST"])
def hello():
    data_1 = data_1_read()
    if data_1 != None :
<<<<<<< HEAD
        post_1_read = data_1
=======
        post_1_read = data_1_read()
>>>>>>> lpp
    data_2 = data_2_read()
    if data_2 != None :
        post_2_read = data_2_read()
    data_3 = {}
    data_3.update(post_1_read)
    data_3.update(post_2_read)
    return json.dumps(data_3)

@app.route('/')
def web():
    data_1 = data_1_read()
#    j_data =  json.loads(data)
    if data_1 != None :
        post_1_read = data_1_read()
    data_2 = data_2_read()
    if data_2 != None :
        post_2_read = data_2_read()
#    rc(data['ab'], data['number'], data['op'])
#    return "hello"
    return render_template("mains.html",data_A = post_1_read,data_B = post_2_read)

@app.route('/read')
def lz_read():
    content = main()
    titles = title()
    de = reader()
    return render_template("read.html",read_content = content,T = titles,Da = de)

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
<<<<<<< HEAD
    default = {'window':0}
    status_1 = default
    data_1 = request.get_json()
=======
    data_1 = request.get_json()
    if data_1 != None :
        data_1_write(data_1)
#        d = data_2
    default = {'window':0}
    status_1 = default
    data_1 = request.get_json()
>>>>>>> lpp
#    j_data =  json.loads(data_1)
    print data_1
    data_2 = status_read()
    data_3 = eval(data_2)
    if data_3['window'] != 0:
        status_1 = data_3
        status_write(default)
#    print 'window',j_data
#    if data_1 != None :
#        data_1_write(data_1)
#        post_1_read = data_1
#    else:    
#      post_1_read = data_1_read()
#    data_2 = data_2_read()
#    if data_2 != None :
#        post_2_read = data_2_read()
#    print post_1_read
#    print post_2_read
#    rc(data['ab'], data['number'], data['op'])
#    d_to = control_0()
#    if j_data['window'] == KeyError:
#        print j_data
#    else:
     
#        d = data_1
<<<<<<< HEAD
    print 'ok' 
#    print d['window']
    print status_1
=======
#    print 'ok' 
#    print d['window']
#    print status_1
>>>>>>> lpp
    return json.dumps(status_1)

@app.route('/js_get',methods=['GET','POST'])
def js_get():
    st1 = request.get_data()
<<<<<<< HEAD
    print st1
=======
#    print st1
>>>>>>> lpp
    st2 =  status_read()
#    if st1 == None:
    data_1 =  eval(st1)
    data_2 = eval(st2)
    if data_1['window'] != data_2['window']:
        status_write(st1)    
    return json.dumps(st1)

if __name__ == '__main__':
<<<<<<< HEAD
    app.run(host='0.0.0.0', port=8070, debug=True)
=======
    app.run(host='0.0.0.0', port=8060, debug=True)
>>>>>>> lpp
