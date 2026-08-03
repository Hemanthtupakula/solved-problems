package TapAnswers;

import java.util.Scanner;

public class CountOfFactors {
    static void countFactors(int n) {
        int count = 0;
        for (int i = 1; i <= n; i++) {
            if (n % i == 0) {
                count++;

            }

        }
        System.out.print(count + " ");
        // Write your code here

    }

    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        int n = scan.nextInt();
        countFactors(n);
    }
}
