package TapAnswers;

import java.util.Scanner;

public class PrimeNumUptoN {
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
        int count = 0;
        for (int i = n; count < n; i++) {
            if (CheckPrime(i)) {
                System.out.println(i);
                count++;
            }
        }

    }
}
