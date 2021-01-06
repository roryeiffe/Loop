# to convert, run python convert.py <name_of_text_file>
# This will generate a json file with a list of json objects. 
# Each json object will have only one field "title" having a value
# of each line from the original text file:

import sys

filen = sys.argv[1]
F = open(filen, "r")
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
filen = filen.strip(".txt")
F = open(filen + ".json","w")
F.write(output)

print("Successfully converted to " + filen + ".json")