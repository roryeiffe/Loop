filen = input("Filename => ")
questions = input ("Questions => ")
questions = questions == "yes"
if questions:
    filen += "_questions"
F = open(filen + ".txt", "r")
f = F.read()
L = f.split("\n")
output = "["
for item in L:
    output += '{\n\t"title" : "' + item + '"\n}'
    if item == L[-1]:
        output += "\n"
    else:
        output += ",\n"
output += "]"
F.close()
F = open(filen + ".json","w")
F.write(output)