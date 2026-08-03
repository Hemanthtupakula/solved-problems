package TapAnswers;

import java.util.Scanner;

public class PrimeCheck {
    static boolean checkPrime(int n) {
        if (n <= 1) {
            return false;
        }
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) {
                return false;
            }

        }
        return true;

    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt();

        boolean isPrime = checkPrime(n);
        if (isPrime) {
            System.out.println("Yes");
        } else {
            System.out.println("No");
        }
    }

}
