import time
import sys
import json
from collections import OrderedDict

rf = 4

def rc(ab,number,op):
    print "ok"
def data_1_read():
    f1 = open("data_1.txt","r")
    postdata = f1.read()
    d = eval(postdata)
#    print type(d)
    f1.close()
    return d

def data_1_write(gets):
    f2 = open("data_1.txt","w")
    data =  gets
#    en_json = json.dumps(json)
#    data = json.loads(posts)
#    for i in data.keys():
    f2.write(str(data))
    f2.close()
def data_2_read():
    f1 = open("data_2.txt","r")
    postdata = f1.read()
    d = eval(postdata)
#    print type(d)
    f1.close()
    return d

def data_2_write(gets):
    f2 = open("data_2.txt","w")
    data =  gets
#    en_json = json.dumps(json)
#    data = json.loads(posts)
#    for i in data.keys():
    f2.write(str(data))
    f2.close()

def main():
    if len(sys.argv) != 4:
        print "hello"
    else:
        rc(sys.argv[1],sys.argv[2],op)

if __name__ == '__main__':
    main()
