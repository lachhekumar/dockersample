import os
import sys

def calci(n1,n2):
  print("1)Addition \n 2)subtraction  \n 3)multiplication \n 4)division ")
  print("current dir: "+os.getcwd())
  os.chdir("C:\\Users\\Admin\\temp")
  print("changed dir: ",os.getcwd())
  n=int(input("enter choice: "))
  f = open("results.txt" ,"a")
  if n==1:
     f.write(f"Answer is: {n1+n2} \n ")
  elif n==2:
     f.write(f"Answer is: {n1-n2} \n")
  elif n==3:
     f.write(f"Answer is: {n1*n2}\n")
  elif n==4:
    try:
         f.write(f"Answer is: {n1/n2}\n")
    except ZeroDivisionError:
         print("divide by 0 error")
  else:
    print("invalid choice")

n1=int(sys.argv[1])
n2=int(sys.argv[2])
calci(n1,n2)