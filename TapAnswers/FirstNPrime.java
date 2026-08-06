package TapAnswers;

import java.util.Scanner;

public class FirstNPrime {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int num = 2;
        int count = 0;
        while (count < n) {
            if (printFirstNPrimes(num)) {
                System.out.print(num + " ");
                count++;
            }
            num++;
        }
    }

    public static boolean printFirstNPrimes(int n) {
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) {
                return false;

            }
        }
        return true;
        // Your code to print the first 'n' prime numbers goes here
    }
}
