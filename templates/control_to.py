import datetime
import json

def curtain(d1):
    f1 = open('data_1','r')
    f2 = open('data_2','r')
    t1 = f1.read()
    t2 = f2.read()
    t3 = eval(t1)
    t4 = eval(t2)
    n = t3['inensity'] - t4['intensity']
    print n

    f1.close()
    f2.close()

curtain(a)
