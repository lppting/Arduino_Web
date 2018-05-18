import datetime
import json

#global op,d1
'''
def curtain():
    f1 = open('data_1.txt','r')
    f2 = open('data_2.txt','r')
    t1 = f1.read()
    t2 = f2.read()
    t3 = eval(t1)
    t4 = eval(t2)
    n = t3['intensity_1'] - t4['intensity_2']
    op = 1
    if n >= 300 and op == 1:
        d1 = 0
        op = 0
#        print 'open'

    f1.close()
    f2.close()
'''   
global op,d1

def control_0():
    f1 = open('data_1.txt','r')
    f2 = open('data_2.txt','r')
    t1 = f1.read()
    t2 = f2.read()
    t3 = eval(t1)
    t4 = eval(t2)
#    print  t3['intensity_2']
    n = t3['intensity_1'] - t4['intensity_2']
#    m = t4['intensity_2'] - t3['intensity_1']
    t = datetime.datetime.now()
    t_0 = t.strftime('%H:%M')
    data_op = {}
#    if t_0 < '07:00':
#        d1 = 1
#        op = 0
#    elif t_0 > '12:30' and t_0 < '14:00':
#        d1 = 1
#        op =1
#    elif t_0 > '18:30':
#        d1 = 1
#        op = 2
#    elif t_0 > '07:00' and t_0 < '12:30':
#        d1 = 0
#        op = 3
#    else:      
    print n
#    if n > 100:
#        data_op = {'curtain':0}
#    elif n < 20:
#    elif  n < 3:
#        d1 = 1
#        op = 5
#        data_op = {'curtain':1}
#        print 'open'
#    elif n > 0 and n < 100:
#        data_op = {'curtain':2}
    f1.close()
    f2.close()

#    data_op = {'curtain':0}
#    print data_op
    return data_op
