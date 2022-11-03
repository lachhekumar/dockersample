import os 
import sys
class calculator():
    print("current dir: "+os.getcwd())
    os.chdir("C:\\Users\\Admin\\temp")
    print("changed dir: ",os.getcwd())
    fil = open("result.txt","a")
    def __init__(self,a,c):
        self.a=int(a)
        self.c=int(c)

    def add(self,fil):
        fil.write(f"Sum : {self.a+self.c}\n")
        #print("Sum :",self.a+self.c)

    def sub(self):
        print("Subtraction :",self.a-self.c)

    def mul(self):
        print("Multiplication :",(self.a)*(self.c))

    def div(self):
        print("Division :",(self.a)/(self.c))
    def factorial(self):
        fact = 1  
        if self.a < 0:
            print(" Factorial does not exist for negative numbers")    
        elif self.a == 0:    
            print("The factorial of 0 is 1")    
        else:    
            for i in range(1,self.a + 1):
                fact = fact*i
            print(fact)

def main():
    try:
        it1 = input()
        if len(it1) == 3:
            a,opern= [i for i in it1.split()]
            n2=calculator(a,0)
            if opern == "!":
                return n2.factorial()
            elif len(it1) < 3:
                raise Exception("you didn't give proper values !!!")
            elif opern == "+" or "-" or "/" or "*":
                raise Exception("you have not given second integer")
        elif len(it1) < 3:
                raise Exception("you didn't give proper values !!!")
            
        else:
            a,opern,c = [i for i in it1.split()]
            n1=calculator(a,c)
            if opern == "+":
                return n1.add()
            elif opern == "-":
                return n1.sub()
            elif opern == "*":
                return n1.mul()
            elif opern == "/":
                return n1.div()
            
    
    except ValueError:
        return "You have passed operator instead of integer"
    except ZeroDivisionError:
        return 0
main()    
    
