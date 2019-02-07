import os
import csv
import operator

with open('Resources/election_data.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    
    line_count=0

    my_tot_votes=0
    my_candidate_count=0
    my_candidates_dict={"name":"0"}

    

    for row in csv_reader:
        if line_count == 0:
            print('This is Header Row')
            last_candidate=row[2]
         
        else:
            if row[2] != last_candidate:
                if row[2] in my_candidates_dict:
                    prev_count= my_candidates_dict.get(row[2])
                else:
                    prev_count=0
                my_candidates_dict[row[2]]=prev_count+1

        line_count += 1
#        if line_count == 5000:
#          break 

line_count -=1   
my_tot_votes=line_count
my_candidates_dict.pop("name")

my_winner = max(my_candidates_dict.items(), key=operator.itemgetter(1))[0]

myData = ['']

myData[0]='Election Results'
myData.append('--------------------------------')
myData.append(f'Total Votes: {my_tot_votes}')
myData.append('--------------------------------')

for x1 in my_candidates_dict:
    myData.append(f'{x1} : {my_candidates_dict[x1]*100/my_tot_votes:2.3f}% ({my_candidates_dict[x1]})')

myData.append('--------------------------------')

myData.append('Winner : ' + my_winner)

myData.append('--------------------------------')

for p1 in myData:
    print(p1)

with open('Output.txt', 'w') as file_handler:
    for item in myData:
        file_handler.write("{}\n".format(item))

file_handler.close()
 