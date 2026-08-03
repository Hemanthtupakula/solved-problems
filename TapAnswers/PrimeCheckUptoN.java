package TapAnswers;

import java.util.Scanner;

public class PrimeCheckUptoN {
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
        for (int i = 2; i <= n; i++) {
            if (CheckPrime(i)) {
                System.out.print(i + " ");
            }
        }
    }
}
