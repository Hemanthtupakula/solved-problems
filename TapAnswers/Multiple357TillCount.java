package TapAnswers;

import java.util.Scanner;

public class Multiple357TillCount {
   public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    int n = scanner.nextInt();
    int count=0;
    int i=1;
    while(count<n){
        if(i%3==0 ||i%5==0||i%7==0){
            System.out.print(i+" ");
            count++;
        }
         i++;
    } 
}
