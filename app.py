# coding: utf-8
from flask import Flask, request, render_template
from curtain_rc import rc,data_read,data_write
import json
app = Flask(__name__)


help_prompt = '''
<html>
<head>
    <title>测试</title>
</head>
<body>
<pre>
    ab: 'A' or 'B'，区分两个遥控，遥控背面有写 A B
    number: 被控制的窗帘的编号，1 - 16 为单个，0 为全部
    op: 操作
        'close'，相当于遥控的‘上’
        'stop'，相当于遥控的‘停’
        'open'，相当于遥控的‘下’

    向 http://cl.xcf.io/clrc 发送 JSON Post

    例子：

    {
        "ab": "B",
        "number": "7",
        "op": "stop"
    }
</pre>
</body>
</html>
'''


@app.route('/')
def hello():
    return render_template("index.html")


@app.route('/api-help')
def api_help():
    return help_prompt


@app.route('/clrc', methods=['GET','POST'])
def clrc():
    user = {'name':'Dada'}
    data = request.get_json()
#    j_data =  json.loads(data)
    if data != None :
        data_write(data)
        post_read = data
    else:    
      post_read = data_read()
    print post_read
#    rc(data['ab'], data['number'], data['op'])
    return render_template("main.html",data = post_read,user = user)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
