import os
import csv

with open('Resources/budget_data.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    
    my_tot=0
    my_chg_tot=0
    Max_Inc=0
    Max_Inc_Month=''
    Max_Dec=0
    Max_Dec_Month=''
    last_val=0
    line_count = 0

    for row in csv_reader:
        if line_count == 0:
            print('This is Header Row')
            last_val=0
            
        elif line_count == 1: 
  
            last_val=float(row[1])
           
        else:
            my_tot=my_tot + float(row[1])
            my_chg=float(row[1])-last_val

            if my_chg > Max_Inc:
                Max_Inc=my_chg
                Max_Inc_Month=row[0]
            if my_chg < Max_Dec:
                Max_Dec = my_chg
                Max_Dec_Month=row[0]
            my_chg_tot=my_chg_tot+my_chg
            last_val=float(row[1])
        line_count += 1

line_count -=1   

myData = [''  for x in range(5)]
myData[0]=f'Total Months: {line_count}'
myData[1]=f'Total: ${my_tot:6.2f}'
myData[2]=f'Average  Change: ${my_chg_tot/(line_count-1):6.2f}'
myData[3]=f'Greatest Increase in Profits: {Max_Inc_Month} ${Max_Inc:6.2f}'
myData[4]=f'Greatest Decrease in Profits: {Max_Dec_Month} ${Max_Dec:6.2f}'

for p1 in myData:
    print(p1)

with open('Output.txt', 'w') as file_handler:
    for item in myData:
        file_handler.write("{}\n".format(item))

file_handler.close()
 