package TapAnswers;

import java.util.Scanner;

public class PrimeNumbersUptoRange {
    public static boolean CheckPrime(int n) {
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) {
                return false;
            }

        }
        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int m = sc.nextInt();
        for (int i = n; i <= m; i++) {
            if (CheckPrime(i)) {
                System.out.println(i);
            }
        }

    }
}
