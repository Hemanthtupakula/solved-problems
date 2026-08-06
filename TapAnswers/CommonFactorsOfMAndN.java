package TapAnswers;

import java.util.Scanner;

public class CommonFactorsOfMAndN {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt();
        int m = scanner.nextInt();
        printCommonFactors(n, m);
    }

    public static void printCommonFactors(int n, int m) {
        int min = Math.min(n, m);
        for (int i = 1; i <= min; i++) {
            if (n % i == 0 && m % i == 0) {
                System.out.print(i + " ");
            }
        }
    }
}
