#-*- coding:utf-8 -*-
import requests
import re

url = 'http://dushu.qq.com/read/933335/6'
pattern_2 = '<p>'
pattern = '<div class="bookreadercontent">(.*)<p style="margin-top:35px; text-indent:2em">'
pattern_3 = '>(.*)</a>'

def main():
    r = requests.post(url)
    list = r.json()
    text = list['Content']
    pattern_2 = '<p>'
    t2 = re.findall('<h1.*>(.*)</h1>',text,re.M|re.I)
#    t3 = re.findall('<p>.*<p></p>',text)
#    t3 =  t2.group()
    t4 =  re.sub(r'<div.*(<h1)','<h1',text)
    t5 =  re.findall(pattern,text)
    t6 = ''
    for i in t5:
        t6 += i
    t1 = t6.replace('</p>','').split(pattern_2)
    data = ''
    for p in  t1:
        data += p
#        print p+'\n'
    return t1

def title():
    r = requests.post(url)
    list = r.json()
    text = list['Content']
#    print text
    t2 = re.findall('<h1.*>(.*)</h1>',text,re.M|re.I)
    d = ''
    for i in t2:
        d = i
    return i
def reader():
    r = requests.post(url)
    list = r.json()
    text = list['Content']
#    t3 = re.findall('</a><span>(.*)</span><a.*></span>.*</p><div class="text">',text,re.S|re.I)
#    t3 = re.findall('</a><span>(.*)</span>(.*)<span>(.*)<div class="text">',text,re.S|re.I)
#    for i in t3:
#        for j in i:    
#           print j
    t4 = re.findall(pattern_3,text,re.M|re.I)
    t_1 = ''
    t_2 = ''
    n = 0
    
    for i in t4:
        if n == 0:
            t_1 = i
        if n ==  1:
            t_2 = i
        n += 1
    n = 0
    d = {'title':t_1,'author':t_2}
    return d

if __name__ == "__main__":
    print reader()
#    title()
#    main()
#    print title()
