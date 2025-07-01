import pandas as pd

# Read entire CSV file into a DataFrame
df = pd.read_csv("D:\\02_NAUKA\\STRONA-CWICZENIA-FRANCUSKIE\\VERIFIED_2022-10-10_2\\pytanie-odpowiedz\\pytania-odpowiedzi.csv",
                 delimiter=';',
                 encoding='utf-8',
                 header=0)

'''
print(df.columns)
print(df.index)
print(df.values[0])
'''

questions = []
answers = []
hints = []

for array in df.values:
    questions.append(array[0])
    answers.append(array[1])
    hints.append(array[2])

print("questions:", questions)
print("answers:", answers)
print("hints:", hints)

# Access specific columns
#print(df['column_name'])

'''
# Additional options
df = pd.read_csv('your_file.csv', 
    delimiter=';',  # if not comma-separated
    encoding='utf-8',  # specify encoding
    header=0  # use first row as column names
)

'''
