with open('courses.txt') as f:
    text = f.read()

with open('curatedCourses.txt',"w") as f :
    text = text.split('\n')
    for i in range(len(text)):
        data = text[i].split()
        text[i] = '" ' + data[0] +  ' " : " ' +   ' '.join(data[1:len(data)-3]) + ' "\n'
    f.write("".join(text))